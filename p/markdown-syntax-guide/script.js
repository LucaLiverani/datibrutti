// URL to the TopoJSON data for US states
const usDataUrl = 'https://d3js.org/us-10m.v1.json';

// Custom color scheme
const stateFillColor = '#69b3a2'; // Default color for states
const stateHighlightColor = 'orange'; // Color when a state is hovered
const stateClickColor = 'red'; // Color when a state is clicked
const stateBorderColor = 'white'; // Border color between states

// Tooltip element
const tooltip = d3.select('#tooltip');

// Function to create the chart
function createChart(us) {
  const width = 975;
  const height = 610;

  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on('zoom', zoomed);

  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto;')
    .on('click', reset);

  const path = d3.geoPath();

  const g = svg.append('g');

  const states = g
    .append('g')
    .attr('fill', stateFillColor)
    .attr('cursor', 'pointer')
    .selectAll('path')
    .data(topojson.feature(us, us.objects.states).features)
    .join('path')
    .on('click', clicked)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout)
    .attr('d', path);

  states.append('title').text((d) => d.properties.name);

  g.append('path')
    .attr('fill', 'none')
    .attr('stroke', stateBorderColor)
    .attr('stroke-linejoin', 'round')
    .attr(
      'd',
      path(
        topojson.mesh(
          us,
          us.objects.states,
          (a, b) => a !== b,
        ),
      ),
    );

  svg.call(zoom);

  function reset() {
    states.transition().style('fill', stateFillColor);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(svg.node())
          .invert([width / 2, height / 2]),
      );
    tooltip.style('display', 'none');
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style('fill', stateFillColor);
    d3.select(this)
      .transition()
      .style('fill', stateClickColor);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(
              8,
              0.9 /
                Math.max(
                  (x1 - x0) / width,
                  (y1 - y0) / height,
                ),
            ),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node()),
      );
  }

  function zoomed(event) {
    const { transform } = event;
    g.attr('transform', transform);
    g.attr('stroke-width', 1 / transform.k);
  }

  function mouseover(event, d) {
    d3.select(this)
      .transition()
      .style('fill', stateHighlightColor);
    tooltip
      .style('display', 'block')
      .html(`<strong>${d.properties.name}</strong>`);
  }

  function mousemove(event) {
    tooltip
      .style('left', event.pageX + 10 + 'px')
    .style('top', event.pageY - 20 + 'px');
  }

  function mouseout(event, d) {
    d3.select(this)
      .transition()
      .style('fill', stateFillColor);
    tooltip.style('display', 'none');
  }

  return svg.node();
}

// Load the TopoJSON data and create the chart
d3.json(usDataUrl)
  .then((us) => {
    const chart = createChart(us);
    document
      .getElementById('chart-container')
      .appendChild(chart);
  })
  .catch((error) => {
    console.error('Error loading or parsing data:', error);
  });

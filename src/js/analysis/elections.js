d3.json("../../data/elections.json").then(data => {

    // Set dimensions and margins for the graph
    const margin = { top: 40, right: 30, bottom: 40, left: 60 },
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scaleBand()
        .domain(data.map(d => `${d.country} ${d.year}`))
        .range([0, width])
        .padding(0.1);

    // Y scale
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.votes)])
        .range([height, 0]);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(`${d.country} ${d.year}`))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.votes))
        .attr("height", d => height - y(d.votes));

    // Add titles
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Votes per Country over the Years");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Country Year");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Votes (%)");
});

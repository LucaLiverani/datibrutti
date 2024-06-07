import { scaleLinear, scaleBand, axisLeft, max } from 'd3';
import { axes } from '@curran/responsive-axes';

export const viz = (
  svg,
  {
    data,
    xValue,
    xAxisLabelText,
    xAxisLabelOffset,
    yValue,
    yAxisLabelText,
    yAxisLabelOffset,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    width,
    height,
    innerRectFill,
    padding,
  },
) => {
  const xScale = scaleBand(data.map(xValue), [
    marginLeft,
    width - marginRight,
  ]).padding(padding);
  const yScale = scaleLinear(
    [0, max(data, yValue)],
    [height - marginBottom, marginTop],
  );

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  svg
    .selectAll('rect.inner-rectangle')
    .data([null])
    .join('rect')
    .attr('class', 'inner-rectangle')
    .attr('x', marginLeft)
    .attr('y', marginTop)
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('fill', innerRectFill);

  axes(svg, {
    width,
    height,
    xScale,
    xAxisLabelText,
    xAxisLabelOffset,
    yScale,
    yAxisLabelText,
    yAxisLabelOffset,
    marginLeft,
    marginBottom,
  });

  // Bars
  svg
    .selectAll('rect.mark')
    .data(data)
    .join('rect')
    .attr('class', 'mark')
    .attr('x', (d) => xScale(xValue(d)))
    .attr('y', (d) => yScale(yValue(d)))
    .attr('width', xScale.bandwidth())
    .attr('height', (d) => yScale(0) - yScale(yValue(d)));
};

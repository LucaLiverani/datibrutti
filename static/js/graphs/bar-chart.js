// static/js/graphs/bar-chart.js
function createBarChart(elementId, data) {
    var width = 500;
    var height = 300;

    var svg = d3.select("#" + elementId).append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function (d, i) {
            return i * (width / data.length);
        })
        .attr("y", function (d) {
            return height - d * 5;
        })
        .attr("width", width / data.length - 1)
        .attr("height", function (d) {
            return d * 5;
        })
        .attr("fill", "teal");
}
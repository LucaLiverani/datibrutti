// public/assets/js/analysis2.js
function renderAnalysis2(container) {
    d3.json('assets/data/processed_data2.json').then(data => {
        const svg = d3.select(container).append("svg")
            .attr("width", 500)
            .attr("height", 500);

        // D3 chart code for Analysis 2
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("width", d => d.width)
            .attr("height", d => d.height);
    });
}

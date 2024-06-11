// public/assets/js/analysis1.js
function renderAnalysis1(container) {
    d3.json('assets/data/processed_data1.json').then(data => {
        const svg = d3.select(container).append("svg")
            .attr("width", 500)
            .attr("height", 500);

        // D3 chart code for Analysis 1
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r);
    });
}

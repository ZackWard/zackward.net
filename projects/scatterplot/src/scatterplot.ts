declare var d3: any;
declare var noUiSlider: any;

let margin = {
    left: 60,
    right: 60,
    top: 50,
    bottom: 50
};

let chartWidth: number = 1500 - margin.left - margin.right;
let chartHeight: number = 700 - margin.top - margin.bottom;

d3.select('.chart')
    .attr('width', (chartWidth + margin.left + margin.right) + "px")
    .attr('height', (chartHeight + margin.top + margin.bottom) + "px");


d3.json('https://dl.dropboxusercontent.com/u/13022985/timeuse2.json', function (error: any, data: any) {
    if (error !== null) {
        console.log("Error: " + error);
    }

    // First let's build our scales and axes
    let x = d3.scaleTime()
        .domain(d3.extent(data.data, (d: any) => new Date(d.year, 0)))
        .range([0, chartWidth]);
    let xAxis = d3.axisBottom(x);
    d3.select('.chart')
        .append('g')
        .call(xAxis)
        .classed('axis', true)
        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + chartHeight) + ')');

    let minMinutes = d3.min(data.data, (d: any) => d.averageMinutes);
    let maxMinutes = d3.max(data.data, (d: any) => d.averageMinutes);
    let y = d3.scaleLinear()
        .domain([maxMinutes, minMinutes])
        .range([0, chartHeight]);
    let yAxis = d3.axisLeft(y);
    d3.select('.chart')
        .append('g')
        .call(yAxis)
        .classed('axis', true)
        .attr('transform', 'translate(' + (margin.left) + ', ' + margin.top + ')');
    d3.select('.chart')
        .append('g')
        .classed('axis', true)
        .append('text')
        .text('Minutes spent playing games')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(' + (margin.left / 4) + ', ' + (margin.top + (chartHeight / 2)) + ') rotate(-90)');

    let r = d3.scaleLinear()
        .domain(d3.extent(data.data, (d: any) => d.individuals))
        .range([5, 25]);

    // Now add our data
    let update = d3.select('.chart')
        .selectAll('.data-point')
        .data(data.data);

    update.enter()
        .append('g')
        .attr('class', 'data-point')
        .append('circle')
        .attr('cx', (d: any) => margin.left + x(new Date(d.year, 0)))
        .attr('cy', (d: any) => margin.top + y(d.averageMinutes))
        .attr('r', (d: any) => r(d.individuals))
        .attr('class', (d: any) => d.sex == 'M' ? 'male' : 'female')
        .on('mouseenter', function (d: any) {
            d3.select('.scatterplot-tooltip')
                .html("<p>" + d.age + " year old " + (d.sex == "M" ? "males" : "females") + " in " + d.year + "</p><p>Average minutes: " + d.averageMinutes + "</p><p>Individuals: " + d.individuals + "</p>")
                .style('display', 'block')
                .style('left', (d3.event.pageX - 75) + "px")
                .style('top', (d3.event.pageY + 20) + "px");
        })
        .on('mouseout', function (d: any) {
            d3.select('.scatterplot-tooltip')
                .style('display', 'none');
        }); 
});
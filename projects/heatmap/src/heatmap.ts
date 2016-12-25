declare var d3: any;

// Set up chart sizes here
let margin = {
    top: 20,
    bottom: 75,
    left: 75, 
    right: 75
};

let width: number = 1600 - margin.left - margin.right;
let height: number = 800 - margin.top - margin.bottom;
let tooltipWidth: number = 150;
let tooltipHeight: number = 75;

// Set up anything that we can without data here
d3.select('.chart')
    .attr('width', margin.left + width + margin.right)
    .attr('height', margin.top + height + margin.bottom);

d3.select('.heatmap-tooltip')
    .style('width', tooltipWidth + 'px')
    .style('height', tooltipHeight + 'px');

d3.json('https://assets.zackward.net/global-temperature.json', (error: any, data: any) => {

    // Create X Axis
    let minYear: number = d3.min(data.monthlyVariance, (d: any) => d.year);
    let maxYear: number = d3.max(data.monthlyVariance, (d: any) => d.year);
    let years: number = (maxYear - minYear) + 1;
    let cellWidth: number = width / years;

    let x = d3.scaleLinear()
        .domain([minYear, maxYear])
        .range([0, width]);
    let xAxis = d3.axisBottom(x).tickFormat(d3.format('d'));
    d3.select('.chart')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
        .call(xAxis);

    // Create Y Axis
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let y = d3.scaleBand()
        .domain(months)
        .range([0, height]);
    let yAxis = d3.axisLeft(y);
    d3.select('.chart')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .call(yAxis);

    // Create color scale
    let maxVariance: number = d3.max(data.monthlyVariance, (d: any) => d.variance);
    let minVariance: number = d3.min(data.monthlyVariance, (d: any) => d.variance);
    let colorScale: any = d3.scaleSequential(d3.interpolateSpectral)
        .domain([maxVariance, minVariance]);

    // Join data
    let update: any = d3.select('.chart').selectAll('.data-point').data(data.monthlyVariance);

    // Handle new data elements
    update.enter()
        .append('g')
        .classed('data-point', true)
        .append('rect')
        .attr('x', (d: any) => margin.left + x(d.year))
        .attr('y', (d: any) => margin.top + y(months[d.month - 1]))
        .attr('width', cellWidth)
        .attr('height', y.bandwidth())
        .attr('fill', (d: any) => colorScale(d.variance))
        .on('mouseenter', function (d: any) {
            d3.select('.heatmap-tooltip')
                .style('left', (d3.event.pageX - (tooltipWidth / 2)) + "px")
                .style('top', (d3.event.pageY - (tooltipHeight * 1.25)) + "px")
                .html("<p>" + months[d.month - 1] + " " + d.year + "<br />Temperature: " + (8.66 + d.variance).toFixed(3) + "℃<br />Variance: " + d.variance.toFixed(3) + "℃");
            d3.select('.heatmap-tooltip')
                .transition()
                .style('display', 'block');
        })
        .on('mouseout', function (d: any) {
            d3.select('.heatmap-tooltip')
                .transition()
                .style('display', 'none');
        })
        .append('text')
        .text((d: any) => "Data: " + d.year + "-" + d.month + ": " + d.variance);


});
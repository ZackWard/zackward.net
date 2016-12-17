declare var d3: any;
declare var noUiSlider: any;

let margin = {
    left: 75,
    right: 75,
    top: 75,
    bottom: 75
};

let chartWidth: number = 1500 - margin.left - margin.right;
let chartHeight: number = 700 - margin.top - margin.bottom;

d3.select('.chart')
    .attr('width', (chartWidth + margin.left + margin.right) + "px")
    .attr('height', (chartHeight + margin.top + margin.bottom) + "px");

// We also need a legend 
let legendWidth = 200,
    legendHeight = 100;

let legend = d3.select('.chart')
    .append('g')
    .classed('legend', true)
    .attr('transform', 'translate(' + (margin.left + (chartWidth - legendWidth)) + ', ' + (margin.top) + ')');

legend.append('rect')
    .attr('width', legendWidth)
    .attr('height', legendHeight);
legend.append('circle')
    .attr('r', 5)
    .attr('fill', 'purple')
    .attr('transform', 'translate(' + (legendWidth / 5) + ', ' + (legendHeight / 3) + ')');
legend.append('text')
    .text('Female Respondents')
    .attr('transform', 'translate(' + ((legendWidth / 5) + 10) + ', ' + ((legendHeight / 3) + 5) + ')');
legend.append('circle')
    .attr('r', 5)
    .attr('fill', 'blue')
    .attr('transform', 'translate(' + (legendWidth / 5) + ', ' + ((legendHeight / 3) * 2) + ')');
legend.append('text')
    .text('Male Respondents')
    .attr('transform', 'translate(' + ((legendWidth / 5) + 10) + ', ' + (((legendHeight / 3) * 2) + 5) + ')');
        


d3.json('https://dl.dropboxusercontent.com/u/13022985/timeuse4.json', function (error: any, data: any) {
    if (error !== null) {
        console.log("Error: " + error);
    }

    // First let's build our scales and axes
    let minYear = d3.min(data.data, (d: any) => d.year);
    let maxYear = d3.max(data.data, (d: any) => d.year);
    let x = d3.scaleTime()
        .domain([new Date(minYear, 0), new Date(maxYear, 0)])
        .range([0, chartWidth]);
    let xAxis = d3.axisBottom(x);
    d3.select('.chart')
        .append('g')
        .call(xAxis)
        .classed('axis', true)
        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + chartHeight) + ')');
    d3.select('.chart')
        .append('g')
        .classed('axis', true)
        .append('text')
        .text('Year')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(' + (margin.left + (chartWidth / 2)) + ', ' + (margin.top + chartHeight + margin.bottom - 20) + ')');


    let minEarning = d3.min(data.data, (d: any) => d.avgWeeklyEarnings);
    let maxEarning = d3.max(data.data, (d: any) => d.avgWeeklyEarnings);
    let y = d3.scaleLinear()
        .domain([maxEarning, minEarning])
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
        .text('Average Weekly Earnings in USD')
        .attr('fill', '#000')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(' + (margin.left / 5) + ', ' + (margin.top + (chartHeight / 2)) + ') rotate(-90)');

    let r = d3.scaleLinear()
        .domain(d3.extent(data.data, (d: any) => d.age))
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
        .attr('cy', (d: any) => margin.top + y(d.avgWeeklyEarnings))
        .attr('r', (d: any) => r(d.age))
        .attr('class', (d: any) => d.sex == 'M' ? 'male' : 'female')
        .on('mouseenter', function (d: any) {
            d3.select(this)
                .attr('stroke', 'black')
                .attr('stroke-width', '2')
            
            d3.select('.scatterplot-tooltip')
                .html("<p>In " + d.year + ", " + d.age + " year old " + (d.sex == "M" ? "males" : "females") +  " earned an average of $" + d.avgWeeklyEarnings + " per week.</p>")
                .style('display', 'block')
                .style('left', (d3.event.pageX - 75) + "px")
                .style('top', (d3.event.pageY + 20) + "px");
        })
        .on('mouseout', function (d: any) {
            d3.select(this)
                .attr('stroke', null)
                .attr('stroke-width', null)
            d3.select('.scatterplot-tooltip')
                .style('display', 'none');
        }); 
});
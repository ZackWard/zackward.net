declare var d3: any;

let leftMargin: number = 60,
    rightMargin: number = 60,
    topMargin: number = 30,
    bottomMargin: number = 30;

let width: number = 1500 - leftMargin - rightMargin;
let height: number = 800 - topMargin - bottomMargin;

const scrubData = (data: any) => {
    let labeledData: any = data.data.map((dataPoint: any) => {
        return {
            qtr: new Date(dataPoint[0]), 
            gdp: dataPoint[1] 
        }
    });

    let scrubbedData = {
        first_qtr: new Date(data.from_date),
        last_qtr: new Date(data.to_date),
        data: labeledData 
    };
    return scrubbedData;
};

const getQuarter = (qtr: Date) => {
    let quarter: string = "";
    quarter += qtr.getMonth() == 2 ? "Q1" : "";
    quarter += qtr.getMonth() == 5 ? "Q2" : "";
    quarter += qtr.getMonth() == 8 ? "Q3" : "";
    quarter += qtr.getMonth() == 11 ? "Q4" : "";
    quarter += " " + qtr.getFullYear();

    return quarter;
};

const getGDP = (gdp: number) => {
    let gdpString: string = gdp.toFixed(2);
    let [integral, decimal] = gdpString.split('.');
    if (integral.length > 3) {
        integral = integral.split('').reverse().map((item: any, index: number) => (index + 1) % 3 === 0 ? "," + item : item).reverse().join('');
    } 
    return "$" + integral + "." + decimal + " Billion";
};

const buildChart = (data: any) => {
    let barWidth: number = width / data.data.length;

    // First, build our time scale and axis
    let x = d3.scaleTime()
        .domain([data.first_qtr, data.last_qtr])
        .range([0, width])
        .nice(d3.timeMonth, 3);
    let xAxis = d3.axisBottom(x);

    // Let's build our y axis (GDP value in billions of dollars) here
    let y = d3.scaleLinear()
        .domain([d3.max(data.data, (d: any) => d.gdp), d3.min(data.data, (d: any) => d.gdp)])
        .range([0, height])
        .nice();
    let yAxis = d3.axisLeft(y);

    // Add elements to chart
    d3.select('.chart')
        .append('g').call(xAxis)
        .attr('transform', 'translate(' + leftMargin + ', ' + (topMargin + height) + ')')
        .attr('class', 'x axis');

    d3.select('.chart')
        .append('g').call(yAxis)
        .attr('transform', 'translate(' + leftMargin + ', ' + topMargin + ')')
        .attr('class', 'y axis')
        .append('g')
        .append('text')
        .text('Gross Domestic Product in Billions of USD')
        .attr('transform', 'translate(20) rotate(-90)');

    // Handle our data join here, and add bars to the graph
    let update: any = d3.select('.chart')
        .selectAll('g.bar')
        .data(data.data);

    update.enter()
        .append('g')
        .attr('class', 'bar')
        .append('rect')
        .attr('width', barWidth)
        .attr('height', (d: any) => height - y(d.gdp))
        .attr('x', (d: any) => leftMargin + x(d.qtr))
        .attr('y', (d: any) => topMargin + y(d.gdp))
        .on('mouseenter', function (d: any) {
            d3.select(this).attr('fill', 'orange'); 
            d3.select('#tooltip')
                .style('left', (d3.event.pageX - 75) + 'px')
                .style('top', (d3.event.pageY - 100) + 'px')
                .style('display', 'block');
            d3.select('#tooltip-qtr')
                .text(getQuarter(d.qtr));
            d3.select('#tooltip-gdp')
                .text(getGDP(d.gdp));
        })
        .on('mouseout', function (d: any) {
            d3.select(this).attr('fill', null);
            d3.select('#tooltip').style('display', 'none');
        });
    };

// Do initial pre-data chart setup here
d3.select('.chart')
    .attr('width', leftMargin + width + rightMargin)
    .attr('height', topMargin + height + bottomMargin);
let tooltip: any = d3.select('body')
    .append('div')
    .attr('id', 'tooltip');
tooltip.append('p').attr('id', 'tooltip-qtr');
tooltip.append('p').attr('id', 'tooltip-gdp');

    


d3.json('https://assets.zackward.net/barchart-data.json', (err: any, data: any) => {
    if (err !== null) {
        console.log("Error");
    }
    let myData = scrubData(data);
    buildChart(myData);
});
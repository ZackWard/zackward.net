/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var leftMargin = 60, rightMargin = 60, topMargin = 30, bottomMargin = 30;
	var width = 1500 - leftMargin - rightMargin;
	var height = 800 - topMargin - bottomMargin;
	var scrubData = function (data) {
	    var labeledData = data.data.map(function (dataPoint) {
	        return {
	            qtr: new Date(dataPoint[0]),
	            gdp: dataPoint[1]
	        };
	    });
	    var scrubbedData = {
	        first_qtr: new Date(data.from_date),
	        last_qtr: new Date(data.to_date),
	        data: labeledData
	    };
	    return scrubbedData;
	};
	var getQuarter = function (qtr) {
	    var quarter = "";
	    quarter += qtr.getMonth() == 2 ? "Q1" : "";
	    quarter += qtr.getMonth() == 5 ? "Q2" : "";
	    quarter += qtr.getMonth() == 8 ? "Q3" : "";
	    quarter += qtr.getMonth() == 11 ? "Q4" : "";
	    quarter += " " + qtr.getFullYear();
	    return quarter;
	};
	var getGDP = function (gdp) {
	    var gdpString = gdp.toFixed(2);
	    var _a = gdpString.split('.'), integral = _a[0], decimal = _a[1];
	    if (integral.length > 3) {
	        integral = integral.split('').reverse().map(function (item, index) { return (index + 1) % 3 === 0 ? "," + item : item; }).reverse().join('');
	    }
	    return "$" + integral + "." + decimal + " Billion";
	};
	var buildChart = function (data) {
	    var barWidth = width / data.data.length;
	    // First, build our time scale and axis
	    var x = d3.scaleTime()
	        .domain([data.first_qtr, data.last_qtr])
	        .range([0, width])
	        .nice(d3.timeMonth, 3);
	    var xAxis = d3.axisBottom(x);
	    // Let's build our y axis (GDP value in billions of dollars) here
	    var y = d3.scaleLinear()
	        .domain([d3.max(data.data, function (d) { return d.gdp; }), d3.min(data.data, function (d) { return d.gdp; })])
	        .range([0, height])
	        .nice();
	    var yAxis = d3.axisLeft(y);
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
	    var update = d3.select('.chart')
	        .selectAll('g.bar')
	        .data(data.data);
	    update.enter()
	        .append('g')
	        .attr('class', 'bar')
	        .append('rect')
	        .attr('width', barWidth)
	        .attr('height', function (d) { return height - y(d.gdp); })
	        .attr('x', function (d) { return leftMargin + x(d.qtr); })
	        .attr('y', function (d) { return topMargin + y(d.gdp); })
	        .on('mouseenter', function (d) {
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
	        .on('mouseout', function (d) {
	        d3.select(this).attr('fill', null);
	        d3.select('#tooltip').style('display', 'none');
	    });
	};
	// Do initial pre-data chart setup here
	d3.select('.chart')
	    .attr('width', leftMargin + width + rightMargin)
	    .attr('height', topMargin + height + bottomMargin);
	var tooltip = d3.select('body')
	    .append('div')
	    .attr('id', 'tooltip');
	tooltip.append('p').attr('id', 'tooltip-qtr');
	tooltip.append('p').attr('id', 'tooltip-gdp');
	d3.json('https://dl.dropboxusercontent.com/u/13022985/barchart-data.json', function (err, data) {
	    if (err !== null) {
	        console.log("Error");
	    }
	    var myData = scrubData(data);
	    buildChart(myData);
	});


/***/ }
/******/ ]);
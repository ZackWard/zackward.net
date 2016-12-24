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

	var margin = {
	    left: 75,
	    right: 75,
	    top: 75,
	    bottom: 75
	};
	var chartWidth = 1500 - margin.left - margin.right;
	var chartHeight = 700 - margin.top - margin.bottom;
	d3.select('.chart')
	    .attr('width', (chartWidth + margin.left + margin.right) + "px")
	    .attr('height', (chartHeight + margin.top + margin.bottom) + "px");
	// We also need a legend 
	var legendWidth = 200, legendHeight = 100;
	var legend = d3.select('.chart')
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
	d3.json('https://assets.zackward.net/timeuse4.json', function (error, data) {
	    if (error !== null) {
	        console.log("Error: " + error);
	    }
	    // First let's build our scales and axes
	    var x = d3.scaleLinear()
	        .domain(d3.extent(data.data, function (d) { return d.age; }))
	        .range([0, chartWidth]);
	    var xAxis = d3.axisBottom(x);
	    d3.select('.chart')
	        .append('g')
	        .call(xAxis)
	        .classed('axis', true)
	        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + chartHeight) + ')');
	    d3.select('.chart')
	        .append('g')
	        .classed('axis', true)
	        .append('text')
	        .text('Age')
	        .attr('fill', '#000')
	        .attr('text-anchor', 'middle')
	        .attr('transform', 'translate(' + (margin.left + (chartWidth / 2)) + ', ' + (margin.top + chartHeight + margin.bottom - 20) + ')');
	    var minEarning = d3.min(data.data, function (d) { return d.avgWeeklyEarnings; });
	    var maxEarning = d3.max(data.data, function (d) { return d.avgWeeklyEarnings; });
	    var y = d3.scaleLinear()
	        .domain([maxEarning, minEarning])
	        .range([0, chartHeight]);
	    var yAxis = d3.axisLeft(y);
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
	    var r = d3.scaleLinear()
	        .domain(d3.extent(data.data, function (d) { return d.minutes; }))
	        .range([5, 25]);
	    // Now add our data
	    var update = d3.select('.chart')
	        .selectAll('.data-point')
	        .data(data.data);
	    update.enter()
	        .append('g')
	        .attr('class', 'data-point')
	        .append('circle')
	        .attr('cx', function (d) { return margin.left + x(d.age); })
	        .attr('cy', function (d) { return margin.top + y(d.avgWeeklyEarnings); })
	        .attr('r', '5')
	        .attr('class', function (d) { return d.sex == 'M' ? 'male' : 'female'; })
	        .on('mouseenter', function (d) {
	        d3.select(this)
	            .attr('stroke', 'black')
	            .attr('stroke-width', '2');
	        d3.select('.scatterplot-tooltip')
	            .html("<p>In " + d.year + ", " + d.age + " year old " + (d.sex == "M" ? "males" : "females") + " earned an average of $" + d.avgWeeklyEarnings + " per week.</p>")
	            .style('display', 'block')
	            .style('left', (d3.event.pageX - 75) + "px")
	            .style('top', (d3.event.pageY + 20) + "px");
	    })
	        .on('mouseout', function (d) {
	        d3.select(this)
	            .attr('stroke', null)
	            .attr('stroke-width', null);
	        d3.select('.scatterplot-tooltip')
	            .style('display', 'none');
	    });
	});


/***/ }
/******/ ]);
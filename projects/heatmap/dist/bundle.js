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

	// Set up chart sizes here
	var margin = {
	    top: 20,
	    bottom: 75,
	    left: 75,
	    right: 75
	};
	var width = 1600 - margin.left - margin.right;
	var height = 800 - margin.top - margin.bottom;
	var tooltipWidth = 150;
	var tooltipHeight = 75;
	// Set up anything that we can without data here
	d3.select('.chart')
	    .attr('width', margin.left + width + margin.right)
	    .attr('height', margin.top + height + margin.bottom);
	d3.select('.heatmap-tooltip')
	    .style('width', tooltipWidth + 'px')
	    .style('height', tooltipHeight + 'px');
	d3.json('https://assets.zackward.net/global-temperature.json', function (error, data) {
	    // Create X Axis
	    var minYear = d3.min(data.monthlyVariance, function (d) { return d.year; });
	    var maxYear = d3.max(data.monthlyVariance, function (d) { return d.year; });
	    var years = (maxYear - minYear) + 1;
	    var cellWidth = width / years;
	    var x = d3.scaleLinear()
	        .domain([minYear, maxYear])
	        .range([0, width]);
	    var xAxis = d3.axisBottom(x).tickFormat(d3.format('d'));
	    d3.select('.chart')
	        .append('g')
	        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + height) + ')')
	        .call(xAxis);
	    // Create Y Axis
	    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	    var y = d3.scaleBand()
	        .domain(months)
	        .range([0, height]);
	    var yAxis = d3.axisLeft(y);
	    d3.select('.chart')
	        .append('g')
	        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
	        .call(yAxis);
	    // Create color scale
	    var maxVariance = d3.max(data.monthlyVariance, function (d) { return d.variance; });
	    var minVariance = d3.min(data.monthlyVariance, function (d) { return d.variance; });
	    var colorScale = d3.scaleSequential(d3.interpolateSpectral)
	        .domain([maxVariance, minVariance]);
	    // Join data
	    var update = d3.select('.chart').selectAll('.data-point').data(data.monthlyVariance);
	    // Handle new data elements
	    update.enter()
	        .append('g')
	        .classed('data-point', true)
	        .append('rect')
	        .attr('x', function (d) { return margin.left + x(d.year); })
	        .attr('y', function (d) { return margin.top + y(months[d.month - 1]); })
	        .attr('width', cellWidth)
	        .attr('height', y.bandwidth())
	        .attr('fill', function (d) { return colorScale(d.variance); })
	        .on('mouseenter', function (d) {
	        d3.select('.heatmap-tooltip')
	            .style('left', (d3.event.pageX - (tooltipWidth / 2)) + "px")
	            .style('top', (d3.event.pageY - (tooltipHeight * 1.25)) + "px")
	            .html("<p>" + months[d.month - 1] + " " + d.year + "<br />Temperature: " + (8.66 + d.variance).toFixed(3) + "℃<br />Variance: " + d.variance.toFixed(3) + "℃");
	        d3.select('.heatmap-tooltip')
	            .transition()
	            .style('display', 'block');
	    })
	        .on('mouseout', function (d) {
	        d3.select('.heatmap-tooltip')
	            .transition()
	            .style('display', 'none');
	    })
	        .append('text')
	        .text(function (d) { return "Data: " + d.year + "-" + d.month + ": " + d.variance; });
	});


/***/ }
/******/ ]);
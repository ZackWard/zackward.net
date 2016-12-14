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
	    left: 60,
	    right: 60,
	    top: 50,
	    bottom: 50
	};
	var chartWidth = 1500 - margin.left - margin.right;
	var chartHeight = 700 - margin.top - margin.bottom;
	d3.select('.chart')
	    .attr('width', (chartWidth + margin.left + margin.right) + "px")
	    .attr('height', (chartHeight + margin.top + margin.bottom) + "px");
	d3.json('https://dl.dropboxusercontent.com/u/13022985/timeuse2.json', function (error, data) {
	    if (error !== null) {
	        console.log("Error: " + error);
	    }
	    // First let's build our scales and axes
	    var x = d3.scaleTime()
	        .domain(d3.extent(data.data, function (d) { return new Date(d.year, 0); }))
	        .range([0, chartWidth]);
	    var xAxis = d3.axisBottom(x);
	    d3.select('.chart')
	        .append('g')
	        .call(xAxis)
	        .classed('axis', true)
	        .attr('transform', 'translate(' + margin.left + ', ' + (margin.top + chartHeight) + ')');
	    var minMinutes = d3.min(data.data, function (d) { return d.averageMinutes; });
	    var maxMinutes = d3.max(data.data, function (d) { return d.averageMinutes; });
	    var y = d3.scaleLinear()
	        .domain([maxMinutes, minMinutes])
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
	        .text('Minutes spent playing games')
	        .attr('fill', '#000')
	        .attr('text-anchor', 'middle')
	        .attr('transform', 'translate(' + (margin.left / 4) + ', ' + (margin.top + (chartHeight / 2)) + ') rotate(-90)');
	    var r = d3.scaleLinear()
	        .domain(d3.extent(data.data, function (d) { return d.individuals; }))
	        .range([5, 25]);
	    // Now add our data
	    var update = d3.select('.chart')
	        .selectAll('.data-point')
	        .data(data.data);
	    update.enter()
	        .append('g')
	        .attr('class', 'data-point')
	        .append('circle')
	        .attr('cx', function (d) { return margin.left + x(new Date(d.year, 0)); })
	        .attr('cy', function (d) { return margin.top + y(d.averageMinutes); })
	        .attr('r', function (d) { return r(d.individuals); })
	        .attr('class', function (d) { return d.sex == 'M' ? 'male' : 'female'; })
	        .on('mouseenter', function (d) {
	        d3.select('.scatterplot-tooltip')
	            .html("<p>" + d.age + " year old " + (d.sex == "M" ? "males" : "females") + " in " + d.year + "</p><p>Average minutes: " + d.averageMinutes + "</p><p>Individuals: " + d.individuals + "</p>")
	            .style('display', 'block')
	            .style('left', (d3.event.pageX - 75) + "px")
	            .style('top', (d3.event.pageY + 20) + "px");
	    })
	        .on('mouseout', function (d) {
	        d3.select('.scatterplot-tooltip')
	            .style('display', 'none');
	    });
	});


/***/ }
/******/ ]);
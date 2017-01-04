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
	    bottom: 20,
	    left: 20,
	    right: 20
	};
	var width = 1000 - margin.left - margin.right;
	var height = 1000 - margin.top - margin.bottom;
	var tooltipWidth = 150;
	var tooltipHeight = 75;
	// Set up anything that we can without data here
	d3.select('.chart')
	    .style('width', width + 'px')
	    .style('height', height + 'px');
	d3.select('.force-tooltip')
	    .style('width', tooltipWidth + 'px')
	    .style('height', tooltipHeight + 'px');
	var simulation = d3.forceSimulation()
	    .force("charge", d3.forceManyBody().strength(function () { return 5; }))
	    .force("collision", d3.forceCollide(30))
	    .force("link", d3.forceLink())
	    .force("center", d3.forceCenter(margin.left + width / 2, margin.top + height / 2));
	d3.json('https://assets.zackward.net/countries.json', function (error, data) {
	    console.log(data);
	    // Attach nodes and links to our simulation
	    simulation.nodes(data.nodes);
	    simulation.force('link').links(data.links);
	    // Attach svg elements to simulation nodes
	    var nodes = d3.select('.chart')
	        .append('div')
	        .classed('nodes', true)
	        .selectAll('.node')
	        .data(data.nodes)
	        .enter().append('div')
	        .attr('class', function (d) { return 'node flag flag-' + d.code; });
	    var links = d3.select('.chart')
	        .append('div')
	        .classed('links', true)
	        .selectAll('.link')
	        .data(data.links)
	        .enter().append('div')
	        .classed('link', true);
	    // On each tick, update svg elements
	    simulation.on('tick.draw', function () {
	        nodes
	            .style('left', function (node) {
	            return node.x < 0 ? 0 : node.x + 'px';
	        })
	            .style('top', function (node) {
	            return node.y < 0 ? 0 : node.y + 'px';
	        });
	        links
	            .attr('x1', function (link) { return link.source.x; })
	            .attr('y1', function (link) { return link.source.y; })
	            .attr('x2', function (link) { return link.target.x; })
	            .attr('y2', function (link) { return link.target.y; });
	    });
	    // Attach d3 drag behavior
	    nodes.call(d3.drag().on('start', dragstart).on('drag', drag).on('end', dragend));
	    function dragstart(d) {
	        console.log("dragging started");
	        if (!d3.event.active) {
	            simulation.alphaTarget(0.3).restart();
	        }
	        d.fx = d.x;
	        d.fy = d.y;
	    }
	    function drag(d) {
	        console.log("Dragging");
	        d.fx = d3.event.x;
	        d.fy = d3.event.y;
	    }
	    function dragend(d) {
	        console.log("Drag end");
	        if (!d3.event.active) {
	            simulation.alphaTarget(0);
	        }
	        d.fx = null;
	        d.fy = null;
	    }
	});


/***/ }
/******/ ]);
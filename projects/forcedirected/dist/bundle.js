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
	    top: 0,
	    bottom: 0,
	    left: 0,
	    right: 0
	};
	// Icon size in px
	var iconSize = 32;
	var halfIcon = iconSize / 2;
	var width = 1200 - margin.left - margin.right;
	var height = 800 - margin.top - margin.bottom;
	var tooltipWidth = 150;
	// Set up anything that we can without data here
	d3.select('.chart')
	    .style('width', width + 'px')
	    .style('height', height + 'px');
	d3.select('.chart-svg')
	    .style('width', width + 'px')
	    .style('height', height + 'px');
	d3.select('.force-tooltip')
	    .style('width', tooltipWidth + 'px');
	var simulation = d3.forceSimulation()
	    .force("charge", d3.forceManyBody().strength(function () { return 5; }))
	    .force("collision", d3.forceCollide(35))
	    .force("link", d3.forceLink())
	    .force("center", d3.forceCenter(margin.left + width / 2, margin.top + height / 2));
	function updateTooltip(x, y) {
	    d3.select('.force-tooltip')
	        .style('left', (x + 10) + 'px')
	        .style('top', (y + 10) + 'px');
	}
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
	    var links = d3.select('.chart-svg')
	        .append('g')
	        .classed('links', true)
	        .selectAll('line')
	        .data(data.links)
	        .enter().append('line')
	        .attr('class', function (link) { return 'link target-' + link.target.index + ' source-' + link.source.index; });
	    // Attach tooltip listener
	    d3.select(window).on('mousemove', function (d) {
	        updateTooltip(d3.event.x, d3.event.y);
	    });
	    nodes.on('mouseenter', function (d) {
	        // Update the tooltip and make it visible
	        d3.select('.force-tooltip')
	            .html('<p>' + d.country + '</p>')
	            .classed('tooltip-visible', true)
	            .classed('tooltip-hidden', false);
	        // Highlight any links to this node
	        d3.selectAll('.target-' + d.index).classed('hover-link', true);
	        d3.selectAll('.source-' + d.index).classed('hover-link', true);
	    });
	    nodes.on('mouseout', function (d) {
	        d3.select('.force-tooltip')
	            .classed('tooltip-visible', false)
	            .classed('tooltip-hidden', true);
	        // Clear all highlighted links
	        d3.selectAll('.link').classed('hover-link', false);
	    });
	    // On each tick, update svg elements
	    simulation.on('tick.draw', function () {
	        nodes
	            .style('left', function (node) {
	            var leftEdge = node.x - halfIcon;
	            return leftEdge < 0 ? 0 + "px" : leftEdge + iconSize > width ? (width - iconSize) + "px" : leftEdge + "px";
	        })
	            .style('top', function (node) {
	            var topEdge = node.y - halfIcon;
	            return topEdge < 0 ? 0 + "px" : topEdge + iconSize > height ? (height - iconSize) + "px" : topEdge + "px";
	        });
	        links
	            .attr('x1', function (link) {
	            return link.source.x < halfIcon ? halfIcon : link.source.x > width - halfIcon ? width - halfIcon : link.source.x;
	        })
	            .attr('y1', function (link) {
	            return link.source.y < halfIcon ? halfIcon : link.source.y > height - halfIcon ? height - halfIcon : link.source.y;
	        })
	            .attr('x2', function (link) {
	            return link.target.x < halfIcon ? halfIcon : link.target.x > width - halfIcon ? width - halfIcon : link.target.x;
	        })
	            .attr('y2', function (link) {
	            return link.target.y < halfIcon ? halfIcon : link.target.y > height - halfIcon ? height - halfIcon : link.target.y;
	        });
	    });
	    // Attach d3 drag behavior
	    nodes.call(d3.drag().on('start', dragstart).on('drag', drag).on('end', dragend));
	    function dragstart(d) {
	        if (!d3.event.active) {
	            simulation.alphaTarget(0.3).restart();
	        }
	        d.fx = d.x;
	        d.fy = d.y;
	    }
	    function drag(d) {
	        updateTooltip(d3.event.x, d3.event.y);
	        d.fx = d3.event.x;
	        d.fy = d3.event.y;
	    }
	    function dragend(d) {
	        if (!d3.event.active) {
	            simulation.alphaTarget(0);
	        }
	        d.fx = null;
	        d.fy = null;
	    }
	});


/***/ }
/******/ ]);
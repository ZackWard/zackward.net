import {Promise} from "es6-promise";

declare var d3: any;
declare var topojson: any;

let width: number = 960;
let height: number = 500;
let defaultRadius: number = 0.75;
let zoomFactor: number = 1;
let dragFactor: number = 4;

let context = d3.select("canvas").node().getContext("2d"),
    projection = d3.geoOrthographic(),
    path = d3.geoPath(projection, context).pointRadius(defaultRadius),
    graticule = d3.geoGraticule(),
    world: any,
    features: any,
    dragStartCoords: any, // This will hold the x,y mouse coords when we start a drag action
    dragStartRotation: any, // This will hold the current projection rotation when we start a drag action
    visibleNodes: any[], // This array will hold all of the currently visible meteorites
    highlightedNode: any = null, // This is the meteorite element that the mouse is currently over
    r: any; // D3 Linear Scale for our point Radius

let originalScale: any = projection.scale();

// Set up detached container for non-displayed DOM elements
let detachedContainer = document.createElement("custom");
let dataContainer = d3.select(detachedContainer);


// Set up promises here
function getGeography() {
    return new Promise(function (resolve: any, reject: any) {
        d3.json("https://assets.zackward.net/world-110m.v1.json", function (error: any, world: any) {
            if (error) reject(error);
            resolve(world);
        });
    });
}

function getFeatures() {
    return new Promise(function (resolve: any, reject: any) {
        d3.json("https://assets.zackward.net/meteorite-strike-data.json", function (error: any, data: any) {
            if (error) reject(error);
            resolve(data);
        });
    });
}

function getVisibleMeteorites() {
    visibleNodes = [];

    let meteorites: any = dataContainer.selectAll('custom.data-point');
    meteorites.each(function (d: any) {
        let meteorite = d3.select(this);
        let point: any = {
            type: "Point",
            coordinates: [meteorite.attr('data-lon'), meteorite.attr('data-lat')]
        };
        let bounds: any = path.bounds(point);

        let canvasR: number = parseFloat(meteorite.attr('data-mass-radius')) * zoomFactor;
        let canvasX = bounds[0][0];
        let canvasY = bounds[0][1];

        meteorite.attr('data-canvas-x', canvasX);
        meteorite.attr('data-canvas-y', canvasY);
        meteorite.attr('data-canvas-r', canvasR);

        // Add to the visibleNodes array if this meteorite is in the display area
        if (canvasX >= 0 && canvasX <= width && canvasY >= 0 && canvasY <= height) {
            visibleNodes.push(meteorite);
        }
    });
}

function drawGraticule() {
    context.strokeStyle = "#e1e1e1";
    context.beginPath();
    path(graticule());
    context.stroke();
    
}

function drawGeography() {
    context.fillStyle = "#ccc";
    context.beginPath();
    path(topojson.feature(world, world.objects.land));
    context.fill();
}

function drawMeteorites() {
    context.strokeStyle = "#FF0000";

    // We only need to draw visible meteorites
    visibleNodes.forEach((meteorite: any) => {
        let lon: number = meteorite.attr('data-lon');
        let lat: number = meteorite.attr('data-lat');
        let radius: number = meteorite.attr('data-mass-radius');

        path.pointRadius(radius * zoomFactor);
        context.beginPath();
        path({
            type: "Point",
            coordinates: [lon, lat]
        });
        context.stroke();
    });

    // If highlightedNode is defined, the mouse is over a meteorite. Let's focus 
    // on it somehow
    if (highlightedNode == null) {
        return;
    }
    context.strokeStyle = "#000";
    context.fillStyle = "rgba(255, 0, 0, 0.25)";
    path.pointRadius(highlightedNode.attr('data-mass-radius') * zoomFactor);
    context.beginPath();
    path({
        type: "Point",
        coordinates: [highlightedNode.attr('data-lon'), highlightedNode.attr('data-lat')]
    });
    context.stroke();
    context.fill();
}

function updateTooltip(hide: boolean = false) {
    if (highlightedNode == null || hide) {
        d3.select('.mapdata-tooltip')
            .classed('tooltip-visible', false)
            .classed('tooltip-hidden', true);
        return;
    }
    let htmlString = "";
    htmlString += '<p>Name: ' + highlightedNode.attr('data-name') + '</p>';
    htmlString += '<p>Year: ' + highlightedNode.attr('data-year').split('-')[0];
    htmlString += '<p>Mass: ' + d3.format(',')((parseInt(highlightedNode.attr('data-mass')) / 1000)) + ' kg</p>';
    htmlString += '<p>Class: ' + highlightedNode.attr('data-class');
    d3.select('.mapdata-tooltip')
        .classed('tooltip-hidden', false)
        .classed('tooltip-visible', true)
        .style('left', (d3.event.pageX + 25) + "px")
        .style('top', d3.event.pageY + "px")
        .html(htmlString);
}

function redrawMap() {
    context.clearRect(0, 0, width, height);

    // First draw the graticule (grid lines)
    drawGraticule();

    // Second, draw the geography of the globe
    drawGeography();

    // Finally, draw the meteorite strike data
    drawMeteorites();
}

function moveMouse() {

    let relativeCoords: number[] = d3.mouse(this);

    // Check to see if the mouse is over any of the meteorite circles
    let highlightedNodes: any[] = [];
    visibleNodes.forEach((node: any) => {
        let cx: number = parseInt(node.attr('data-canvas-x'));
        let cy: number = parseInt(node.attr('data-canvas-y'));
        let r: number = parseFloat(node.attr('data-canvas-r'));
        let x: number = relativeCoords[0];
        let y: number = relativeCoords[1];

        if (Math.pow((x - cx), 2) + Math.pow((y - cy), 2) < Math.pow(r, 2)) {
            highlightedNodes.push(node);
        }
    });

    // We may have more than one highlighted node (in the case of a large and a small circle)
    // Generally, we want to highlight the smallest one
    if (highlightedNodes.length > 1) {
        let smallestNode: any = null;
        highlightedNodes.forEach((node: any) => {
            if (smallestNode == null || parseInt(node.attr('data-mass')) < parseInt(smallestNode.attr('data-mass'))) {
                smallestNode = node;
            }
        });
        highlightedNode = smallestNode;
        updateTooltip();
    } else if (highlightedNodes.length == 1) {
        highlightedNode = highlightedNodes[0];
        updateTooltip();
    } else if (highlightedNodes.length == 0) {
        highlightedNode = null;
        updateTooltip();
    }
    redrawMap();
}

function zoomed() {
    zoomFactor = d3.event.transform.k;
    projection.scale(originalScale * d3.event.transform.k);
    updateTooltip(true);
    getVisibleMeteorites();
    redrawMap();
}

function startDragging() {
    dragStartCoords = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
    let rot = projection.rotate();
    dragStartRotation = [-rot[0], rot[1]];
    updateTooltip(true); // Hide the tooltip when we start dragging
}

function doDrag() {   
    let dragCoords = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
    let rotation = [dragStartRotation[0] + (dragStartCoords[0] - dragCoords[0]) / (dragFactor * zoomFactor), dragStartRotation[1] + (dragStartCoords[1] - dragCoords[1]) / (dragFactor * zoomFactor)];
    projection.rotate([-rotation[0], rotation[1]]);
    getVisibleMeteorites();
    redrawMap();
}

function buildMap() {

    // Set up a scale for the radius of our meteorite strike symbols here
    let massExtent: any = d3.extent(features.features, (d: any) => parseInt(d.properties.mass));
    r = d3.scalePow()
        .exponent(0.5)
        .domain(massExtent)
        .range([defaultRadius, defaultRadius * 50]);

    // Set up data binding here
    dataContainer.selectAll('custom.data-point')
        .data(features.features, (d: any) => d.properties.id)
        .enter()
        .append('custom')
        .classed('data-point', true)
        .attr('data-lon', (d: any) => d.geometry == null ? "null" : d.geometry.coordinates[0])
        .attr('data-lat', (d: any) => d.geometry == null ? "null" : d.geometry.coordinates[1])
        .attr('data-mass', (d: any) => d.properties.mass)
        .attr('data-mass-radius', (d: any) => r(parseInt(d.properties.mass)))
        .attr('data-class', (d: any) => d.properties.recclass)
        .attr('data-year', (d: any) => d.properties.year)
        .attr('data-name', (d: any) => d.properties.name);

    // Set up dragging behaviour here. 
    d3.selectAll('canvas').call(d3.drag().on('start', startDragging).on('drag', doDrag));

    // Set up mouseover behaviour here
    d3.select('canvas').on('mousemove', moveMouse);

    // Set up zooming here
    d3.selectAll('canvas').call(d3.zoom().scaleExtent([0.5, 20]).on('zoom', zoomed));

    // Do the initial map drawing
    getVisibleMeteorites();
    redrawMap();
}

Promise.all([getGeography(), getFeatures()]).then(datum => {
    world = datum[0];
    features = datum[1];
    buildMap();
});

import {Promise} from "es6-promise";

declare var d3: any;
declare var topojson: any;

let width: number = 960;
let height: number = 500;

let context = d3.select("canvas").node().getContext("2d"),
    projection = d3.geoOrthographic(),
    path = d3.geoPath(projection, context),
    graticule = d3.geoGraticule(),
    world: any,
    features: any;

let originalScale: any = projection.scale();

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

function redrawMap() {
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "#000";
    context.beginPath();
    path(topojson.mesh(world, world.objects.land));
    context.stroke();

    context.strokeStyle = "#FF0000";
    context.beginPath();
    path(features);
    context.stroke();

    context.strokeStyle = "#e1e1e1";
    context.beginPath();
    path(graticule());
    context.stroke();
}

function zoomed() {
    console.log(d3.event.transform.k);
    projection.scale(originalScale * d3.event.transform.k);
    redrawMap();
}

Promise.all([getGeography(), getFeatures()]).then(datum => {

    world = datum[0];
    features = datum[1];

    console.log(features);

    let dragStartCoords: any;
    let dragStartRotation: any;

    // Set up dragging behaviour here. 
    let drag = d3.drag()
        .on('start', function () {
            dragStartCoords = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
            let rot = projection.rotate();
            dragStartRotation = [-rot[0], rot[1]];
        })
        .on('drag', function () {
            if (dragStartCoords) {
                let dragCoords = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
                let rotation = [dragStartRotation[0] + (dragStartCoords[0] - dragCoords[0]) / 4, dragStartRotation[1] + (dragStartCoords[1] - dragCoords[1]) / 4];
                projection.rotate([-rotation[0], rotation[1]]);
            }
            redrawMap();
        });
    d3.selectAll('canvas').call(drag);

    // Set up zooming here
    d3.selectAll('canvas').call(d3.zoom().on('zoom', zoomed));

    redrawMap();
});

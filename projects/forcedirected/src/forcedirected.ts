declare var d3: any;

// Set up chart sizes here
let margin = {
    top: 20,
    bottom: 20,
    left: 20, 
    right: 20
};

let width: number = 1000 - margin.left - margin.right;
let height: number = 1000 - margin.top - margin.bottom;
let tooltipWidth: number = 150;
let tooltipHeight: number = 75;

// Set up anything that we can without data here
d3.select('.chart')
    .style('width', width + 'px')
    .style('height', height + 'px');

d3.select('.force-tooltip')
    .style('width', tooltipWidth + 'px')
    .style('height', tooltipHeight + 'px');

let simulation: any = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(() => 5))
        .force("collision", d3.forceCollide(30))
        .force("link", d3.forceLink())
        .force("center", d3.forceCenter(margin.left + width / 2, margin.top + height / 2));

d3.json('https://assets.zackward.net/countries.json', function (error: any, data: any) {
    console.log(data);

    // Attach nodes and links to our simulation
    simulation.nodes(data.nodes);
    simulation.force('link').links(data.links);

    // Attach svg elements to simulation nodes
    let nodes = d3.select('.chart')
        .append('div')
        .classed('nodes', true)
        .selectAll('.node')
        .data(data.nodes)
        .enter().append('div')
        .attr('class', (d: any) => 'node flag flag-' + d.code);

    let links = d3.select('.chart')
        .append('div')
        .classed('links', true)
        .selectAll('.link')
        .data(data.links)
        .enter().append('div')
        .classed('link', true)

    // On each tick, update svg elements
    simulation.on('tick.draw', function () {
        nodes
            .style('left', (node: any) => {
                return node.x < 0 ? 0 : node.x + 'px'
            })
            .style('top', (node: any) => {
                return node.y < 0 ? 0 : node.y + 'px'
            });

        links
            .attr('x1', (link: any) => link.source.x)
            .attr('y1', (link: any) => link.source.y)
            .attr('x2', (link: any) => link.target.x)
            .attr('y2', (link: any) => link.target.y)
    });

    // Attach d3 drag behavior
    nodes.call(d3.drag().on('start', dragstart).on('drag', drag).on('end', dragend));

    function dragstart(d: any) {
        console.log("dragging started");
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function drag(d: any) {
        console.log("Dragging");
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragend(d: any) {
        console.log("Drag end");
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }

});
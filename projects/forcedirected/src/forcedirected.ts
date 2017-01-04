declare var d3: any;

// Set up chart sizes here
let margin = {
    top: 0,
    bottom: 0,
    left: 0, 
    right: 0
};

// Icon size in px
let iconSize: number = 32;
let halfIcon: number = iconSize / 2;
let width: number = 1200 - margin.left - margin.right;
let height: number = 800 - margin.top - margin.bottom;
let tooltipWidth: number = 150;


// Set up anything that we can without data here
d3.select('.chart')
    .style('width', width + 'px')
    .style('height', height + 'px');

d3.select('.chart-svg')
    .style('width', width + 'px')
    .style('height', height + 'px');

d3.select('.force-tooltip')
    .style('width', tooltipWidth + 'px');

let simulation: any = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(() => 5))
        .force("collision", d3.forceCollide(35))
        .force("link", d3.forceLink())
        .force("center", d3.forceCenter(margin.left + width / 2, margin.top + height / 2));

function updateTooltip(x: number, y: number) {
    d3.select('.force-tooltip')
        .style('left', (x + 10) + 'px')
        .style('top', (y + 10) + 'px');
}

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

    let links = d3.select('.chart-svg')
        .append('g')
        .classed('links', true)
        .selectAll('line')
        .data(data.links)
        .enter().append('line')
        .attr('class', (link: any) => 'link target-' + link.target.index + ' source-' + link.source.index);

    // Attach tooltip listener
    d3.select(window).on('mousemove', function (d: any) {
        updateTooltip(d3.event.x, d3.event.y);
    });

    nodes.on('mouseenter', function (d: any) {
        // Update the tooltip and make it visible
        d3.select('.force-tooltip')
            .html('<p>' + d.country + '</p>')
            .classed('tooltip-visible', true)
            .classed('tooltip-hidden', false);

        // Highlight any links to this node
        d3.selectAll('.target-' + d.index).classed('hover-link', true);
        d3.selectAll('.source-' + d.index).classed('hover-link', true);
        
    });

    nodes.on('mouseout', function (d: any) {
        d3.select('.force-tooltip')
            .classed('tooltip-visible', false)
            .classed('tooltip-hidden', true);

        // Clear all highlighted links
        d3.selectAll('.link').classed('hover-link', false);
    });

    // On each tick, update svg elements
    simulation.on('tick.draw', function () {
        nodes
            .style('left', (node: any) => {
                let leftEdge: number = node.x - halfIcon;
                return leftEdge < 0 ? 0 + "px" : leftEdge + iconSize > width ? (width - iconSize) + "px" : leftEdge + "px";
            })
            .style('top', (node: any) => {
                let topEdge: number = node.y - halfIcon;
                return topEdge < 0 ? 0 + "px" : topEdge + iconSize > height ? (height - iconSize) + "px" : topEdge + "px";
            });

        links
            .attr('x1', (link: any) => {
                return link.source.x < halfIcon ? halfIcon : link.source.x > width - halfIcon ? width - halfIcon : link.source.x;
            })
            .attr('y1', (link: any) => {
                return link.source.y < halfIcon ? halfIcon : link.source.y > height - halfIcon ? height - halfIcon : link.source.y;
            })
            .attr('x2', (link: any) => {
                return link.target.x < halfIcon ? halfIcon : link.target.x > width - halfIcon ? width - halfIcon : link.target.x;
            })
            .attr('y2', (link: any) => {
                return link.target.y < halfIcon ? halfIcon : link.target.y > height - halfIcon ? height - halfIcon : link.target.y;
            });
    });

    // Attach d3 drag behavior
    nodes.call(d3.drag().on('start', dragstart).on('drag', drag).on('end', dragend));

    function dragstart(d: any) {
        if (!d3.event.active) {
            simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }

    function drag(d: any) {
        updateTooltip(d3.event.x, d3.event.y);
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragend(d: any) {
        if (!d3.event.active) {
            simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }

});
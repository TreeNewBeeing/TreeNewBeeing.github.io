import React, {Component, createElement} from 'react';
import * as d3 from 'd3';
import global from '../../../../lib/Global';
// props:

// width
// height
// style
// element

export default class ForceDirectedGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            change: false
        };
    }

    prepare(element, data) {
        const width = this.props.width;
        const height = this.props.height;

        //set up the simulation and add forces
        const simulation = d3.forceSimulation()
                .nodes(data.nodes);

        const link_force =  d3.forceLink(data.links)
                                .id(function(d) { return d.name; })
                                .distance((d) => {
                                  return 200 * d['Connection Weight'];
                                })
                                .strength((d) => {
                                  return 0.3;
                                });

        const charge_force = d3.forceManyBody()
            .strength(-100);

        const center_force = d3.forceCenter(width / 2, height / 2);

        simulation
            .force("charge_force", charge_force)
            .force("center_force", center_force)
            .force("links",link_force)
        ;

        return simulation;

    }

    create(element, data) {
        // create graph
        element.svg = d3.select(this.svg);

        //add encompassing group for the zoom
        const g = element.svg.append('g')
            .attr("class", "everything");
        element.g = g;

        //draw lines for the links
        element.link = g.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter().append("line")
            .style('cursor', 'pointer')
        ;

        const nodeContainer = g.append("g")
                .attr("class", "nodes")
                .selectAll("path")
                .data(data.nodes)
                .enter()
        ;

        element.nodeLabel = nodeContainer
                .append("text")
        ;
        element.node = nodeContainer
                .append("path")
                .style('cursor', 'pointer')
        ;

    }

    connect(element) {
        const simulation = element.simulation;
        //add tick instructions:
        simulation.on("tick", tickActions );

        function tickActions() {
          //update circle positions each tick of the simulation
          element.node
              .attr('transform', (d) => `translate(${d.x}, ${d.y})`);
          element.nodeLabel
              .attr('x', function(d) { return d.x; })
              .attr("y", function(d) { return d.y; });
          //update link positions
          element.link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
        }


    }

    update(element) {
        console.log(element.link);
        const virtualNodes = this.props.element.virtualNodes;
        const virtualLinks = this.props.element.virtualLinks;
        element.link
          .style('fill', (d, i) => global.networkgraph.colors[virtualLinks.nodesList[i].strokeColor])
          .attr("stroke-width", (d, i) => virtualLinks.nodesList[i].strokeWidth)
          .attr('stroke', (d, i) => global.networkgraph.colors[virtualLinks.nodesList[i].strokeColor])
          .style('opacity', (d, i) => virtualLinks.nodesList[i].selected? '0.5' : '1');

        element.node
          .attr("d", (d, i) =>
            d3.symbol().type(d3.symbols[virtualNodes.nodesList[i].shape]).size(virtualNodes.nodesList[i].size * 1000)()
          )
          .attr("fill", (d, i) => global.networkgraph.colors[virtualNodes.nodesList[i].color])
          .style('opacity', (d, i) => virtualNodes.nodesList[i].selected? '0.5' : '1')
          .attr('stroke-width', (d, i) => virtualNodes.nodesList[i].strokeWidth)
          .attr('stroke', (d, i) => global.networkgraph.colors[virtualNodes.nodesList[i].strokeColor]);

        element.nodeLabel
          .attr('dx', (d, i) => virtualNodes.nodesList[i].dx)
          .attr("dy", ".35em")
          .text(function(d) { return d.name.split('|')[7] });
    }

    clear() {
        this.element.g.remove();
        this.element.link.remove();
        this.element.node.remove();
        this.element.nodeLabel.remove();
        this.element.simulation.on('tick',null);
    }

    createGraph(element) {
        const data = element.data;

        this.element.simulation = this.prepare(this.element, data);

        this.create(this.element, data);
        this.connect(this.element);
        console.log(data);
        this.props.bindInteraction(this.element, element);
    }

    // Lifecycle Method
    componentDidMount() {
        console.log('did mount');
        this.element = {};
        this.createGraph(this.props.element);
        this.setState({...this.state, change: !this.state.change});
    }

    componentWillUpdate() {
        console.log('will update');
        console.log(this.element);
        this.update(this.element);
    }

    componentWillUnmount() {
        this.clear();
    }

    render() {
        console.log('render')
        return (
            <svg width={this.props.width} height={this.props.height} style={this.props.style}
                ref={node => {this.svg = node;}}>

            </svg>
        )
    }
}
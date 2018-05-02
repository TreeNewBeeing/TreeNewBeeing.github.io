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
        const svg = element.svg;
        const width = this.props.width;
        const height = this.props.height;
        const nodes = data.nodes;
        const links = data.links;
        const nodes_dict = data.nodes_dict;
        const τ = 2 * Math.PI;



        function mapRange(value, inMin, inMax, outMin, outMax){
        var inVal = Math.min(Math.max(value, inMin), inMax);
            return outMin + (outMax-outMin)*((inVal - inMin)/(inMax-inMin));
        }

        // Set each node's value to the sum of all incoming and outgoing link values
        let nodeValMin = 100000000,
        nodeValMax = 0;
        for(let i=0; i<nodes.length; i++){
            nodes[i].value = 0;
            nodes[i].displayOrder = i;
        }
        for(let i=0; i<links.length; i++){
            const link = links[i];
            const value = link['Connection Weight'];
            nodes[nodes_dict[link.source.name]].value += link['Connection Weight'];
            nodes[nodes_dict[link.target.name]].value += link['Connection Weight'];
        }
        for(let i=0; i<nodes.length; i++){
            nodeValMin = Math.min(nodeValMin, nodes[i].value);
            nodeValMax = Math.max(nodeValMax, nodes[i].value);
        }

        const arcBuilder = d3.arc()
        .startAngle(-τ/4)
        .endAngle(τ/4);

        arcBuilder.setRadii = function(d){
        const arcHeight = 0.5 * Math.abs(d.x2-d.x1);
        this
            .innerRadius(arcHeight - d.thickness/2)
            .outerRadius(arcHeight + d.thickness/2);
        };

        this.element.arcBuilder = arcBuilder;

    }

    create(element, data) {
        const svg = element.svg;
        const arcBuilder = element.arcBuilder;
        const spacing = 100;
        const margin = 20;
        const nodeY = 380;
        const {nodes, nodes_dict, links} = data.data;
        const {virtualNodes} = data;
        console.log(data);

        //add encompassing group for the zoom
        const g = svg.append("g")
        .attr("class", "everything");
        element.g = g;

        //draw lines for the links
        element.link = g.append("g")
        .attr("class", "links")
        .selectAll("path")
        .data(links)
        .enter().append("path")
        .style('cursor', 'pointer')
        .attr("transform", function(d,i){
            d.x1 = nodeDisplayX(nodes_dict[d.target.name]);
            d.x2 = nodeDisplayX(nodes_dict[d.source.name]);
            return arcTranslation(d);
        })
        .attr("d", function(d, i){
            d.thickness = 0;
            // d.thickness = 1 + d['Connection Weight'];
            arcBuilder.setRadii(d);
            return arcBuilder();
        });
        ;

        console.log(nodes);
        const nodeContainer = g.append("g")
            .attr("class", "nodes")
            .selectAll("path")
            .data(nodes)
            .enter()
        ;

        element.nodeLabel = nodeContainer
            .append("text")
            .attr('transform',(d, i) => `translate(${nodeDisplayX(i)}, ${nodeY+ virtualNodes.nodesList[i].dx}), rotate(90)`)
        ;
        element.node = nodeContainer
            .append("path")
            .attr("transform", (d, i) => `translate(${nodeDisplayX(i)}, ${nodeY})`)
            .style('cursor', 'pointer')
        ;

        function arcTranslation(d){
            return "translate(" + (d.x1 + d.x2)/2 + "," + nodeY + ")";
        }

        function nodeDisplayX(i){
            // console.log(node);
            return i * spacing + margin;
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
    }

    createGraph(element) {
        const data = element.data;
        this.prepare(this.element, data);
        this.create(this.element, element);
        this.props.bindInteraction(this.element, element);
    }

    // Lifecycle Method
    componentDidMount() {
        console.log('did mount');
        this.element = {};
        this.element.svg = d3.select(this.svg);
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
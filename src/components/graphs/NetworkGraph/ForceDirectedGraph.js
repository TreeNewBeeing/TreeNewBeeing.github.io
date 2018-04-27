import React, { Component } from 'react';
import * as d3 from 'd3';
import ControlPanel from './ControlPanel';
import {parseNetwork} from '../../../lib/Parser';
import global from '../../../lib/Global';

class Networkgraph extends Component {
    constructor(props){
      super(props);

      this.state = {
        loaded: false,
        change: false,
        mode: 1,
      }
    }

    componentWillMount() {
      parseNetwork('AIDS-Netwrok.csv', (data) => {
        // create nodes model
        this.element = {};
        this.element.virtualNodes = new Nodes(data.nodes);
        this.element.virtualLinks = new Links(data.links);
        // create graph dom
        this.createGraph(data);

        // set state
        this.setState({...this.state, loaded:true, data:data});
      });
    }

    prepare(element, data) {
      const svg = element.svg;
      const width = +svg.attr("width");
      const height = +svg.attr("height");

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
      const svg = element.svg;

      //add encompassing group for the zoom
      const g = svg.append("g")
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

    prepareArcDiagram(element, data) {
      const svg = element.svg;
      const width = +svg.attr("width");
      const height = +svg.attr("height");
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
    createArcDiagram(element, data) {
      const svg = element.svg;
      const arcBuilder = element.arcBuilder;
      const spacing = 100;
      const margin = 20;
      const nodeY = 380;
      const {nodes, nodes_dict, links} = data;

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
          d.thickness = 1 + d['Connection Weight'];
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
            .attr('transform',(d, i) => `translate(${nodeDisplayX(i)}, ${nodeY+ element.virtualNodes.nodesList[i].dx}), rotate(90)`)
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

    createGraph(data) {
      this.element.svg = this.svg;
      this.element.simulation = this.prepare(this.element, data);

      this.create(this.element, data);
      // console.log(this.element, data);
      this.connect(this.element);
      this.bindInteraction(this.element);
    }

    createGraph2(data) {
      this.prepareArcDiagram(this.element, data);
      this.createArcDiagram(this.element, data);
      this.bindInteraction(this.element);
    }

    clear() {
      this.element.g.remove();
      this.element.link.remove();
      this.element.node.remove();
      this.element.nodeLabel.remove();
      this.element.simulation.on('tick',null);
    }

    bindInteraction(element) {
      const simulation = element.simulation;
      bindDrag(element);
      bindZoom(element);
      (bindClick.bind(this))(element);

      function bindDrag(element) {
        //add drag capabilities
        const node = element.node;
        const drag_handler = d3.drag()
          .on("start", drag_start)
          .on("drag", drag_drag)
          .on("end", drag_end);

        drag_handler(node);

        //Drag functions
        //d is the node
        function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        //make sure you can't drag the circle outside the box
        function drag_drag(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function drag_end(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
      }


      function bindZoom (element) {
        //add zoom capabilities
        const g = element.g;
        const svg = element.svg;
        let k = 0;

        var zoom_handler = d3.zoom()
          .on("zoom", zoom_actions);

        zoom_handler(element.svg);
        //Zoom functions
        function zoom_actions () {
          // console.log(d3.event.transform);
          if(k !== d3.event.transform.k){
            g.attr("transform", d3.event.transform);
          }

        }


      }

      function bindClick (element) {
        const node = element.node;
        const link = element.link;
        node.on('click', clickNode.bind(this));
        link.on('click', clickLink.bind(this));

        function clickNode (d, i) {
          element.virtualNodes.select(i);
          // console.log(element.virtualNodes.nodesList.filter((e) => e.selected));
          this.setState({...this.state, change: !this.state.change});
        }

        function clickLink (d, i) {
          element.virtualLinks.select(i);
          console.log(element.virtualLinks.nodesList.filter((e) => e.selected));
          this.setState({...this.state, change: !this.state.change});
        }
      }

    }

    componentWillUpdate() {
      console.log(this.element);
      this.update(this.element);
    }

    update(element) {
      console.log('update');
      const virtualNodes = element.virtualNodes;
      const virtualLinks = element.virtualLinks;
      element.link
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

    changeColor(num) {
      console.log(this, num);
      this.element.virtualNodes.changeColor(num);
      this.setState({...this.state, change: !this.state.change});
    }

    changeShape(num) {
      this.element.virtualNodes.changeShape(num);
      this.setState({...this.state, change: !this.state.change});
    }

    changeStroke(color, width) {
      this.element.virtualNodes.changeStroke(color, width);
      this.element.virtualLinks.changeStroke(color, width);
      this.setState({...this.state, change: !this.state.change});
    }

    changeSize(size) {
      this.element.virtualNodes.changeSize(size);
      this.setState({...this.state, change: !this.state.change});
    }

    changeMode() {
      this.clear();

      switch(this.state.mode) {
        case 1:
          this.createGraph2(this.state.data);
          this.setState({...this.state, change: !this.state.change, mode: 2});
          break;
        case 2:
          this.createGraph(this.state.data);
          this.setState({...this.state, change: !this.state.change, mode: 1});
          break;
        default:

      }


    }

    render() {
        return (
          <div width='100%' height='800'>

              {this.state.loaded ? null :
                <text style={{fontSize: '50px', position: 'fixed', left: '50%', top: '50%'}}>
                  loading...
                </text>
              }
            <svg width='2000' height='2000' style={{position:'fixed', left: '0', zIndex:'-1'}}
              ref={node => this.svg = d3.select(node)}
            >
            </svg>
            {this.state.loaded ?
              <ControlPanel
                width = {600}
                height = {1000}
                padding = {10}
                virtualLinks = {this.element.virtualLinks}
                virtualNodes = {this.element.virtualNodes}
                data = {this.state.data}

                changeColor = {this.changeColor.bind(this)}
                changeSize = {this.changeSize.bind(this)}
                changeShape = {this.changeShape.bind(this)}
                changeStroke = {this.changeStroke.bind(this)}
                changeMode = {this.changeMode.bind(this)}
              />
            : null}
          </div>
        );
    }
}


class Nodes {

    constructor(json) {

      this.size = 1;
      this.shape = 0;
      this.color = 0;
      this.dx = 18;
      this.strokeColor = 0;
      this.strokeWidth = 1;
      this.nodesList = [];

      for (let i = 0; i < json.length; i += 1) {
        this.nodesList.push({
          size: this.size,
          color: this.color,
          shape: this.shape,
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          dx: this.dx,
          selected: false,
        });
      }

      this.selection = [];
    }

    select(x) {
      console.log(this.nodesList[x]);
      this.nodesList[x].selected = !this.nodesList[x].selected;
    }

    changeColor(num) {
      this.nodesList.forEach((e) => {
        if (e.selected) {
          e.color = num;
        }
      })
    }

    changeSize(num) {
      this.nodesList.forEach((e) => {
        if (e.selected) {
          e.size = num;
        }
      })
    }

    changeShape(num) {
      this.nodesList.forEach((e) => {
        if (e.selected) {
          e.shape = num;
        }
      })
    }

    changeStroke(color, width) {
      this.nodesList.forEach((e) => {
        if (e.selected) {
          if (color === 0 || color)
            e.strokeColor = color;
          if (width === 0 || width)
            e.strokeWidth = width;
        }
      })
    }

}

class Links {

  constructor(json) {

    this.strokeColor = 2;
    this.strokeWidth = 1;
    this.nodesList = [];

    for (let i = 0; i < json.length; i += 1) {
      this.nodesList.push({
        strokeColor: this.strokeColor,
        strokeWidth: this.strokeWidth,
        selected: false,
      });
    }
  }

  select(x) {
    console.log(this.nodesList[x]);
    this.nodesList[x].selected = !this.nodesList[x].selected;
  }

  changeStroke(color, width) {
    this.nodesList.forEach((e) => {
      if (e.selected) {
        if (color === 0 || color)
          e.strokeColor = color;
        if (width === 0 || width)
          e.strokeWidth = width;
      }
    })
  }

}


export default Networkgraph;
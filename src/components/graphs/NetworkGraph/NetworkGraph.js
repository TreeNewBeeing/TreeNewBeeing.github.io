import React, { Component } from 'react';
import * as d3 from 'd3';
import ControlPanel from './ControlPanel';
import {parseNetwork} from '../../../lib/Parser';
import global from '../../../lib/Global';
import ForceDirectedGraph from './graphs/ForceDirectedGraph';
import ArcDiagram from './graphs/ArcDiagram';
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
        this.element.data = data;

        // set state
        this.setState({...this.state, loaded:true, data:data});
      });
    }

    bindInteraction(element, data) {
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
        if (!d3.event.active && simulation) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        //make sure you can't drag the circle outside the box
        function drag_drag(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function drag_end(d) {
          if (!d3.event.active && simulation) simulation.alphaTarget(0);
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
        const virtualLinks = data.virtualLinks;
        const virtualNodes = data.virtualNodes;
        node.on('click', clickNode.bind(this));
        link.on('click', clickLink.bind(this));

        function clickNode (d, i) {
          virtualNodes.select(i);
          // console.log(element.virtualNodes.nodesList.filter((e) => e.selected));
          this.setState({...this.state, change: !this.state.change});
        }

        function clickLink (d, i) {
          virtualLinks.select(i);
          // console.log(virtualLinks.nodesList.filter((e) => e.selected));
          this.setState({...this.state, change: !this.state.change});
        }
      }

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

    changeMode(num) {
      this.setState({...this.state, mode: num});
    }

    renderGraph() {

      // no display until data loaded
      if(!this.state.loaded)
        return null;

      // different display of the graph
      switch(this.state.mode) {
        case 1:
          return (
            <ForceDirectedGraph
              width={2000} height={2000} style={{position:'fixed', left: '0', zIndex:'-1'}}
              element={this.element} bindInteraction={this.bindInteraction.bind(this)}
            />
          )
        case 2:
          return (
            <ArcDiagram
              width={2000} height={2000} style={{position:'fixed', left: '0', zIndex:'-1'}}
              element={this.element} bindInteraction={this.bindInteraction.bind(this)}
            />
          )
      }
    }

    render() {
        return (
          <div width='100%' height='800'>

            {this.state.loaded ? null :
              <h1 style={{fontSize: '50px', position: 'fixed', left: '50%', top: '50%'}}>
                loading...
              </h1>
            }

            {this.renderGraph()}

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

    selectAdjacent(x, element) {
      const {nodes, nodes_dict} = element;
      nodes_dict[nodes[x].name].links.forEach(e => {
        this.nodesList[nodes_dict[e].i].selected = true;
      })
    }

    unselectAdjacent(x, element) {
      const {nodes, nodes_dict} = element;
      nodes_dict[nodes[x].name].links.forEach(e => {
        this.nodesList[nodes_dict[e].i].selected = false;
      })
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
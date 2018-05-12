import '../../../css/clearfix.css'

import React, { Component } from 'react';
import * as d3 from 'd3';
import global from '../../../lib/Global';
import Hamburger from '../../menu/Hamburger';
import { transition } from 'd3';
import '../../../css/ControlPanel.css';

// props:


// width
// height
// padding
// data
// virtualLinks
// virtualNodes

// expand
// groupBased

// changeColor(color)
// changeSize(size)
// changeShape(shape)
// changeStroke(color, width)
// changeMode()
// selectByAdjacent()
// selectByDegree()
// selectByAccessible()
// unselect()
// clickHamburger()

const HAMBURGER_MENU_SIZE = 30;

class ControlPanel extends Component{

    constructor(props){
        super(props);
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   return {...prevState, expand: nextProps.expand && prevState.expand};
    // }

    render() {

        return (
            <div>
            <Hamburger size={HAMBURGER_MENU_SIZE} expand={this.props.expand} click={this.props.changeExpand}/>

            <ul style={{float: 'left', width: `${this.props.width}px`, height: `100%`,padding: `${this.props.padding}px`, backgroundColor:'white', position:'fixed', overflowY:'scroll', opacity:'0.985', border: '1px #f4f4f4 solid', boxShadow: '0px 0px 25px grey', paddingTop: HAMBURGER_MENU_SIZE * 2,
                left: this.props.expand? 0 : -(2 * this.props.padding + this.props.width + 4),
                transition: 'left 0.2s ease-out',
                }}>

                {/* centrality */}
                <li style={{marginTop: '10px'}}>
                <h1> Centrality Distribution</h1><br/>
                <div id="container">
                  <div className="inner-container">
                      <div className="toggle" onClick={() => {this.props.changeBasedType(true)}}>
                          <p>Group Centrality</p>
                      </div>
                      <div className="toggle" onClick={() => {this.props.changeBasedType(false)}}>
                          <p>Graph Centrality</p>
                      </div>
                  </div>
                  <div className="inner-container" id='toggle-container' style={{
                    clipPath: this.props.groupBased ? 'inset(0 0 0 50%)' : 'inset(0 50% 0 0)',}}>
                      <div className="toggle">
                          <p>Group Centrality</p>
                      </div>
                      <div className="toggle">
                          <p>Graph Centrality</p>
                      </div>
                  </div>
                </div>
                <br/>
                  <label className="container">Off
                    <input type="radio" onChange={() => {this.props.changeCentrality(0);}} defaultChecked='true' name="radio"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">Betweenness Centrality
                    <input type="radio" onChange={() => {this.props.changeCentrality(1);}} name="radio"/>
                    <span className="checkmark"></span>
                  </label>
                  <label className="container">Closeness Centrality
                    <input type="radio" onChange={() => {this.props.changeCentrality(2);}} name="radio"/>
                    <span className="checkmark"></span>
                  </label>
                </li>
                {/* select */}
                <li>
                    <h1> Selection </h1><br/>
                    <ul>
                        <li><button onClick={this.props.unselect}> unselect all </button></li>
                        <li><button onClick={this.props.selectByAdjacent}> select adjacent nodes </button></li>
                        <li><button onClick={this.props.selectByDegree}> select nodes with same degree</button></li>
                        <li><button onClick={this.props.selectByAccessible}> select accesible nodes</button></li>
                    </ul>
                    <br/>
                </li>
                <li style={{height:'300px',}}>
                  <h1> Selected Nodes </h1>
                  <ul style={{height: '239px', width:`${0.9 * this.props.width}px`, border:'1px solid', overflowY: 'scroll', padding:'10px',margin:'5px 0'}}>
                    {this.props.virtualNodes.nodesList.map((e, i) => {
                      if (e.selected) {
                        return <li style={{height:'30px', lineHeight:'30px'}}>{this.props.data.nodes[i].name}</li>;
                      }
                    })}
                  </ul>
                </li>

                <li style={{height:'300px'}}>
                  <h1> Selected Links </h1>
                  <ul style={{height: '243px', width:`${0.9 * this.props.width}px`, border:'1px solid', overflowY: 'scroll', padding:'10px',margin:'5px 0'}}>
                    {this.props.virtualLinks.nodesList.map((e, i) => {
                      if (e.selected) {
                        return <li style={{height:'30px', lineHeight:'30px', display: 'inline-block', whiteSpace: 'nowrap', overflowX: 'scroll'}}>{`${this.props.data.links[i].source.name} => ${this.props.data.links[i]['Connection Weight']} => ${this.props.data.links[i].target.name}`}</li>;
                      }
                    })}
                  </ul>
                  <br/>
                </li>

                <li className='clearfix'>
                  <h1> Color </h1>
                  <ul>
                    {global.networkgraph.colors.map((e, i) =>
                      <li onClick={() => {this.props.changeColor(i)}} style={{margin: '30px', width:'40px', height: '40px', backgroundColor: `${e}`, float:'left', cursor:'pointer'}}>

                      </li>
                    )}
                  </ul>

                </li>
                <li className='clearfix'>
                  <h1> Size </h1>
                  <br/>
                  Size: <input ref={node => this.size = node}id="number" type="number" onChange={() => {this.props.changeSize(this.size.value)}}></input>
                  <br/><br/>
                </li>

                <li>
                  <h1> Shape </h1>
                  <ul>
                    <svg width={`${this.props.width}px`}>
                    {d3.symbols.map((e, i) =>
                        <path
                          transform = { `translate(${(2 * i - 1) * 50} ,60)`}
                          d={
                            d3.symbol().type(d3.symbols[i]).size(900)()
                          }
                          style = {{cursor: 'pointer'}}
                          onClick = {() => {this.props.changeShape(i)}}
                        />
                    )}
                    </svg>
                  </ul>
                </li>
                <li className='clearfix'>
                  <h1> Stroke </h1>
                  <br/>
                  Stroke Width: <input ref={node => this.stroke = node}id="number" type="number" onChange={() => {this.props.changeStroke(null, this.stroke.value)}}></input>
                  <br/><br/>
                  Stroke Color:
                  <ul>
                    {global.networkgraph.colors.map((e, i) =>
                      <li onClick={() => {this.props.changeStroke(i, null)}} style={{margin: '30px', width:'40px', height: '40px', backgroundColor: `${e}`, float:'left', cursor:'pointer'}}>

                      </li>
                    )}
                  </ul>
                </li>
                <li>
                    <ul>
                        <li><button onClick={() => {this.props.changeMode(1)}}>Force Directed Graph</button></li>
                        <li><button onClick={() => {this.props.changeMode(2)}}>Arc Deoagram</button></li>
                    </ul>
                </li>

            </ul>
            </div>
        )
    }
}


export default ControlPanel;
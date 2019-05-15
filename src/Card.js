import React, { Component } from 'react';
import './card.css';

class Card extends Component {
  constructor(props){
    super(props);
    let angle = Math.random() * 90 - 45;
    let xPos = Math.random() * 40 - 20;
    let yPos = Math.random() * 40 + 30;
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }  
  render() {
    // rerun new random number everytime
    return (
      <img style={{transform: this._transform}} className="card" src={this.props.image} alt={this.props.name} />
    )
  }
}
export default Card;

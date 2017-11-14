import React, { Component } from 'react';
import './style.css';

class Contact extends Component {
  
  onClick = () => {
    this.props.onClick(this.props.contact)
  }

  render() {
    return (
      <div className="Contact" onClick={this.onClick}>
        <span className="Contact-bloodGroup">{this.props.contact.bloodGroup}</span>
        <div className="col-sm-12">
          <p>{this.props.contact.firstName} {this.props.contact.lastName}</p>
          <p>x: {this.props.contact.x} </p>
          <p>y: {this.props.contact.y}</p>
        </div>
      </div>
    );
  }
}

export default Contact;

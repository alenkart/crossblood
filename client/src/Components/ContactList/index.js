import React, { Component } from 'react';
import Contact from './../Contact';
import { Icon } from 'react-fa';
import './style.css';

class ContactList extends Component {

  constructor() {

    super();

    this.state = {
      contacts: []
    };

  }

  getContacts() {
    return this.props.contacts.map(contact => {
      return <Contact 
        key={contact._id} 
        contact={contact} 
        onClick={this.props.onClickContact}
        />
    });
  }

  render() {
    return (
      <div className="ContactList">
        <div className="col-sm-12 fluid">
          <div className="ContactList-logo">
            <span>Cross | Blood</span>
            <Icon name="heartbeat" className="icon" />
          </div>
        </div>
        <div className="col-sm-12 fluid">
          <div className="ContactList-search">
            <Icon name="search" />
            <input type="text" placeholder="Find a donan" />
          </div>
        </div>
        <div className="col-sm-12 fluid">
          <div className="ContactList-body">
            {this.getContacts()}
          </div>
        </div>
        <div className="col-sm-12 fluid">
          <div className="ContactList-logo">
            <a href="#hero" className="Contact-hero" 
              onClick={this.props.onClick}>Become a donan</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactList;

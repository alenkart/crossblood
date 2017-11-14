import React, { Component } from 'react';
import ContactList from './../ContactList';
import ArcGIS from './../ArcGIS';
import ModalSignUp from './../ModalSignUp';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor() {
    super();

    this.arcGis = {};

    this.state = {
      contacts: [],
      arcGisCenter: {},
      isModalOpen: false,
    };

  }

  componentDidMount() {
    this.getContactsData();
  }

  getContactsData() {

    const url = '/contacts/select';

    fetch(url).then((res) => {

      res.json().then((data) => {

        console.log(data);

        this.setState({ contacts: data });

      });

    });

  }

  onClickContact = (contact) => {
    this.arcGis.goTo([ contact.x, contact.y ]);
  }

  modalToggle = () => this.setState({ isModalOpen: !this.state.isModalOpen });

  modalClose = () => this.setState({ isModalOpen: false });

  render() {
    return (
      <div className="App">
        <ModalSignUp title="Become a Hero"
          show={this.state.isModalOpen}
          close={this.modalClose} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 fluid">
              <ArcGIS
                contacts={this.state.contacts}
                ref={arcGis => this.arcGis = arcGis} />
              <ContactList
                contacts={this.state.contacts}
                onClick={this.modalToggle}
                onClickContact={this.onClickContact} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Modal from './../Modal';
import { isEmail, isMobilePhone, isEmpty } from 'validator';
import './style.css';

class ModalSignUp extends Component {

  constructor() {
    super();

    this.bloodGroups = ['A-', 'A+', 'B-', 'B+', 'O-', 'O+', 'AB-', 'AB+'];

    this.state = {
      form: {
        firstName: '',
        lastName: '',
        contactNumber: '',
        emailAddress: '',
        bloodGroup: this.bloodGroups[0],
        status: true,
        x: 0,
        y: 0,
      }
    };

    this.updateGelocation();
  }

  handleSubmit = (e) => {

    e.preventDefault();
    
    this.updateGelocation();

    if (isEmpty(this.state.form.firstName)) {
      alert("Please type your first Name");
      return;
    }

    if (isEmpty(this.state.form.lastName)) {
      alert("Please type your last name");
      return;
    }

    if (!isMobilePhone(this.state.form.contactNumber, 'any')) {
      alert("Please type valid a Phone Number");
      return;
    }

    if (!isEmail(this.state.form.emailAddress)) {
      alert("Please type valid a Emial Address");
      return;
    }

    this.postContactData();
  }

  updateGelocation() {
    
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(this.setGeolocation, () => {

        alert('We colund\'t get your Geolocation, please try again.');
      });

    } else {

      alert('Please turn your broswer Geolocation ON');
    }
  }

  setGeolocation = (position) => {

    const form = this.state.form;

    form.x = position.coords.longitude;
    form.y = position.coords.latitude;

    this.setState({ form: form });
  }

  postContactData(position) {

    const url = '/contacts/register';

    const request = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.form)
    };

    fetch(url, request).then(res => {

      console.log(res);

      res.json().then((data) => {
        console.log(data);
      });

    }).catch(err => console.log);

  }

  handleChange = (e) => {

    const target = e.target;
    const form = this.state.form;
    const name = target.name;

    form[name] = (target.type === 'checkbox')
      ? target.checked
      : target.value;

    this.setState({ form: form });
  }

  playBloodGroups() {

    return this.bloodGroups.map((v, i) => {
      return (<option value={v} key={i}>{v}</option>)
    });
  }

  render() {
    return (
      <Modal title="Become a Hero" show={this.props.show} close={this.props.close}>
        <form onSubmit={this.handleSubmit}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Firstname</label>
                  <input type="text"
                    className="form-control"
                    name="firstName"
                    onChange={this.handleChange}
                    value={this.state.form.firstName} required />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Lastname</label>
                  <input type="text"
                    className="form-control"
                    name="lastName"
                    onChange={this.handleChange}
                    value={this.state.form.lastName} required />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Contact Number</label>
                  <input type="tel"
                    className="form-control"
                    name="contactNumber"
                    onChange={this.handleChange}
                    value={this.state.form.contactNumber} required />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email"
                    className="form-control"
                    name="emailAddress"
                    onChange={this.handleChange}
                    value={this.state.form.emailAddress} required />
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select className="form-control"
                    name="bloodGroup"
                    onChange={this.handleChange}
                    value={this.state.form.bloodgroup}>
                    {this.playBloodGroups()}
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Lat</label>
                  <input type="number"
                    className="form-control"
                    name="x"
                    value={this.state.form.x} disabled />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Lon</label>
                  <input type="number"
                    className="form-control"
                    name="y"
                    value={this.state.form.y} disabled />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label>Active</label>
                  <input type="checkbox"
                    className="form-control"
                    name="status"
                    onChange={this.handleChange}
                    value={this.state.form.status} checked />
                </div>
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-default">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

export default ModalSignUp;

import React, { Component } from 'react';
import './style.css';

class Modal extends Component {

  render() {

    if (!this.props.show) {
      return null;
    }

    return (
      <div className="Modal">
        <div className="modal fade-in" role="dialog" style={{display: "block"}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={this.props.close}>&times;</button>
                <h4 className="modal-title">{this.props.title}</h4>
              </div>
              <div className="modal-body">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

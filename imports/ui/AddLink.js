import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false, 
      error: ''
    }
  }
  onSubmit(e) {
    // const url = this.state.url; Same as the next line, ES6.
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if(!err) {
        this.handleModalClose();
      } else {
        this.setState({
          error: err.reason
        });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleModalClose() {
    this.setState({ 
      isOpen: false, 
      url: '', 
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
        <Modal 
          onAfterOpen={() => this.refs.url.focus()} 
          isOpen={this.state.isOpen} 
          contentLabel="Add Link"
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box" overlayClassName="boxed-view boxed-view--modal">

          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input 
              type="text" 
              placeholder="URL" 
              value={this.state.url}
              ref="url"
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Close</button>
          </form>
        </Modal>
      </div>
    );
  }
}
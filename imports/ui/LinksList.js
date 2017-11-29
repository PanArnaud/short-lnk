import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Links } from './../api/links';

export default class LinksList extends React.Component {
  constructor(pros) {
    super(pros);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({
        links
      })
    });
  }
  conponentWillUnmount() {
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if(this.state.links.length === 0) {
      return (
        <div>
          <p>Add your first link</p>
        </div>
      );
    } else {
      return this.state.links.map((link) => {
        return (
          <p key={link._id}>{link.url}</p>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}
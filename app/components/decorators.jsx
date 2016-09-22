import React from 'react';


export class LoadOnMount extends React.Component {
  shouldLoad () { return false; }
  load () { return; }
  unload () { return; }

  componentDidMount () {
    if (this.shouldLoad()) {
      this.load();
    }
  }

  componentWillUnmount () {
    this.unload();
  }

  render () {
    return <div>{ children }</div>;
  }
}

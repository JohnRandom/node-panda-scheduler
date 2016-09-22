import React from 'react';
// import styles from './App.css';

import TeachersListing from './containers/teachers-listings';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TeachersListing />
    );
  }
}

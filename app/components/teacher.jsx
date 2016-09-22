import React, { PropTypes } from 'react'


const Teacher = ({ name }) => (
  <li>{ name }</li>
);

Teacher.propTypes = {
  name: PropTypes.string.isRequired
}

export default Teacher;

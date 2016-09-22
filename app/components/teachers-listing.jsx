import React, { PropTypes } from 'react';
import Teacher from './teacher';


const TeachersListing = ({ teachers }) => (
  <ul>
    {teachers.map(teacher =>
      <Teacher key={teacher.id} name={teacher.name} />
    )}
  </ul>
);


TeachersListing.propTypes = {
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}


export default TeachersListing;

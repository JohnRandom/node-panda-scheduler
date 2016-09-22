import { connect } from 'react-redux';
import TeachersListing from '../components/teachers-listing';
import { List } from 'immutable';


const mapStateToProps = (state) => {
  return {
    teachers: state.get('teachers', List()).toJS()
  }
}

const TeachersContainer = connect(
  mapStateToProps
)(TeachersListing);


export default TeachersContainer;

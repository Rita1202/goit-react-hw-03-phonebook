import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    return (
      <>
        <input
          className={css.input}
          name="filter"
          placeholder="Find contacts by name"
          onChange={this.props.handleChange}
          value={this.props.filter}
          type="text"
        />
      </>
    );
  }
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};

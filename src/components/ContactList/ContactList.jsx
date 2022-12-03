import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ContactList.module.css';

export class ContactList extends Component {
  filteredList = () => {
    const filtered = this.props.filter.toLowerCase();
    return this.props.contacts.filter(el =>
      el.name.toLowerCase().includes(filtered)
    );
  };

  fullList = () => {
    return this.props.contacts.map(({ id, number, name }) => {
      return (
        <li className={css.item} key={id}>
          {name}: {number}
          <button
            className={css.delete}
            onClick={() => {
              this.props.deleteUser({ id, number, name });
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  fiteredList = () => {
    return this.filteredList().map(({ id, number, name }) => {
      return (
        <li className={css.item} key={id}>
          {name}: {number}
          <button
            className={css.delete}
            onClick={() => {
              this.props.deleteUser({ id, number, name });
            }}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <>
        <ul className={css.list}>
          {!this.props.filter ? this.fullList() : this.fiteredList()}
        </ul>
      </>
    );
  }
}

ContactList.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};

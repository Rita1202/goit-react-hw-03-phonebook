import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import '../index.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const data = localStorage.getItem('contacts');
    if (data) {
      this.setState({ contacts: JSON.parse(data) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUser = data => {
    const repeat = this.state.contacts.find(el => {
      return el.name === data.name;
    });

    if (repeat) {
      alert(`${data.name} is already in contacts`);
    } else {
      const newUser = {
        ...data,
        id: nanoid(),
      };
      this.setState(prev => ({
        contacts: [...prev.contacts, newUser],
      }));
    }
  };

  deleteUser = userToDelete => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== userToDelete.id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="main-wrapper">
        <h1 className="phonebook">Phonebook</h1>
        <ContactForm
          handleChange={this.handleChange}
          addUser={this.addUser}
          contacts={contacts}
        />

        <h2 className="contacts">Contacts</h2>
        <Filter
          handleChange={this.handleChange}
          filter={filter}
          contacts={contacts}
        />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteUser={this.deleteUser}
        />
      </div>
    );
  }
}

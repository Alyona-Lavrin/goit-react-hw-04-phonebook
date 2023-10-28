import { useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList'

export const App = () => {
  const [state, setState] = useState({
    contacts: JSON.parse(localStorage.getItem('contacts')) || [],
    filter: '',
  });

  const {contacts, filter} = state;

  const updateContacts = (contacts) => {
    setState({...state, contacts: contacts});
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  const addCantact = (value) => {
    if (contacts.filter(({name}) => name.toLowerCase() === value.name.toLowerCase()).length > 0) {
      alert(`${value.name} is already in contacts`);
      return;
    }

    const data = {
      id: nanoid(),
      name: value.name,
      number: value.number
    }
    
    updateContacts(
      [...contacts, data]
    );
  }

  const deleteContact = (deleteId) => {
    const result = contacts.filter(({id}) => id !== deleteId)

    updateContacts(
      result
    );
  }

  const setFilter = (string) => {
    setState({
      ...state,
      filter: string,
    });
  }

  const visibleItems = useMemo(() => {
    let result = contacts
    
    if (filter !== '') {
      result = contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
    }
    
    return result;
  }, [filter, contacts]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addCantact} />
      <h2>Contacts</h2>
      <Filter onFilterContact={setFilter}/>
      <ContactList contacts={visibleItems} onDeleteContact={deleteContact}/>
    </div>
  );
}
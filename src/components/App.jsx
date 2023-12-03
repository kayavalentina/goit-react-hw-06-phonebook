import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { AppContainer, Title, FormContainer } from './App.styled';
import phonebook from '../data/phonebook.json';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    return savedContacts || [...phonebook];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <FormContainer>
        <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      </FormContainer>
      <Title>Phonebook</Title>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </AppContainer>
  );
};

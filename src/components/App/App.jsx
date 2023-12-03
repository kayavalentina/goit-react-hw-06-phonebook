import React from 'react';
import { AppContainer, Title, FormContainer } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

export const App = () => {
  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <FormContainer>
        <ContactForm />
      </FormContainer>
      <Title>Phonebook</Title>
      <Filter />
      <ContactList />
    </AppContainer>
  );
};
export default App;

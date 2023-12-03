import React from 'react';
import { getContacts, getFilter } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import {
  List,
  ListItem,
  ContactInfo,
  Name,
  PhoneNumber,
  DeleteButton,
} from './ContactList.styled';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filteredContacts?.length) {
    return <div>No contacts added yet.</div>;
  }

  return (
    <List>
      {filteredContacts.map(({ id, name, number }, idx) => (
        <ListItem key={id}>
          <ContactInfo>
            <Name>{name}</Name>
            <PhoneNumber>{number}</PhoneNumber>
          </ContactInfo>
          <DeleteButton onClick={() => dispatch(deleteContact(id))}>
            Delete
          </DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;

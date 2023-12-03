import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import {
  FormContainer,
  Label,
  Input,
  ErrorMessageContainer,
  SubmitButton,
} from './ContactForm.styled';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name should be at least 2 characters long')
    .max(30, 'Name should not exceed 30 characters')
    .required('Name is required'),
  number: Yup.string()
    .matches(/^\d+$/, 'Phone number should contain only digits')
    .min(7, 'Phone number should have at least 7 digits')
    .max(15, 'Phone number should not exceed 15 digits')
    .required('Phone number is required'),
});

const ContactForm = ({ onAddContact, contacts }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmit = (values, { resetForm }) => {
    const { name } = values;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts!`);
    } else {
      onAddContact(values.name, values.number);
      resetForm();
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" />
            <ErrorMessage name="name" component={ErrorMessageContainer} />
          </div>
          <div>
            <Label htmlFor="number">Phone Number</Label>
            <Input
              type="text"
              name="number"
              id="number"
              placeholder="Phone Number"
            />
            <ErrorMessage name="number" component={ErrorMessageContainer} />
          </div>
          <SubmitButton type="submit">Add contact</SubmitButton>
        </Form>
      </Formik>
    </FormContainer>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContactForm;

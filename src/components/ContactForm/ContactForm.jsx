import React from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';
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
const initialValues = {
  name: '',
  number: '',
};
const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onSubmit = (values, action) => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isInContacts) {
      return Notiflix.Notify.failure(`${values.name} is already in contacts!`);
    }
    dispatch(addContact(values));
    action.resetForm();
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
  onSubmit: PropTypes.func,
};

export default ContactForm;

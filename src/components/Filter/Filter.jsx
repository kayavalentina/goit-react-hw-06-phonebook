import React from 'react';
import { getFilter } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { Input } from './Filter.styled';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <Input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={event => dispatch(setFilter(event.target.value.trim()))}
    />
  );
};

export default Filter;

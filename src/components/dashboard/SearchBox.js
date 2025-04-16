import React from 'react';

function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <form className='mb-2'>
      <label style={{fontWeight: '500'}} className='me-2'>Search</label>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name"
      />
    </form>
  );
}

export default SearchBox;

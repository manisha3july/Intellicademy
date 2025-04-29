import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <form className="" style={{width: '300'}}>
      <div className="input-group">
        <span className="input-group-text bg-white">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchBox;

import React from 'react';

const SearchBar = ({ searchList, setSearchList }) => {
  return (
    <div className='searchBar'>
      <label htmlFor="search">Search Podcast</label>
      <input
        id="search"
        type='text'
        placeholder='Search podcast'
        value={searchList}
        onChange={(e) => setSearchList(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

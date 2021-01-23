import React from "react";
import "./searchinput.css";
function SearchInput({ setSearchInput }) {
  return (
    <input
      id="search-input-component"
      placeholder="Search..."
      onKeyUp={(e) => setSearchInput(e.target.value)}
    />
  );
}
export default SearchInput;

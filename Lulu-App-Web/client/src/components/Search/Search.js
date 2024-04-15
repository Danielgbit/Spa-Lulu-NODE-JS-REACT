import { useState } from "react";

const SearchComponent = ({ onValueChange }) => {
  const [valueSearch, setValueSearch] = useState("");

  const handleOnChange = (e) => {
    const { value } = e.target;
    setValueSearch(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onValueChange(valueSearch);
  };

  return (
      <form onSubmit={handleOnSubmit} className="search-container-max">
        <input placeholder="¿Quieres buscar un producto?" onChange={handleOnChange} className="search-input" type="text" />
        <button className="search-button-submit" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
  );
};

export default SearchComponent;

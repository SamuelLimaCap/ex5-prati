import { Search } from "react-bootstrap-icons";
import "./SearchBar.css";
import { useCallback, useEffect, useState } from "react";

export default function SearchBar({ onChangeInput }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((term) => {
      console.log(term);
      if (term.trim() === "") {
        onChangeInput("");
      } else {
        onChangeInput(term);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleInputSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <form className="search-form">
        <div className="search">
          <Search className="search-icon" />
          <input
            type="search"
            className="search-input"
            name="search-input"
            placeholder="Search"
            onChange={handleInputSearch}
          />
        </div>
      </form>
    </>
  );
}

import { Search } from "react-bootstrap-icons";
import "./SearchBar.css";

export default function SearchBar() {
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
          />
        </div>
      </form>
    </>
  );
}

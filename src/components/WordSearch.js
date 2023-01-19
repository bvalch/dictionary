import { useState } from "react";
import "../styles/styles.css";
import useStateData from "../hooks/useStateData";

const WordSearch = ({ getWordDefinition }) => {
  const { setError } = useStateData();
  const [searchTerm, setSearchTerm] = useState("");

  //makes get request at the API with the search input, resets search input field
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length < 1) {
      setError("Minimum one charachter required");
    } else {
      getWordDefinition(searchTerm);
      setSearchTerm("");
    }
  };

  //validates input to be only letters without any whitespaces
  const regExValidator = (searchTerm) => {
    const regExFilter = /^\b[a-zA-Z]+\b$/;
    return regExFilter.test(searchTerm);
  };
  //sets input and errors in state
  const handleSearchInput = (e) => {
    if (!regExValidator(e.target.value)) {
      setError("Only letters allowed for input with no whitespaces");
    } else {
      setError("");
    }
    setSearchTerm(e.target.value);
  };

  return (
    <form className="search-bar">
      <label className="label" htmlFor="searchField">
        Search for any word!
      </label>
      <input
        className="input"
        type="text"
        id="searchField"
        placeholder="Your input here"
        value={searchTerm}
        onChange={(e) => handleSearchInput(e)}
      ></input>
      <button className="button" type="submit" onClick={(e) => handleSearch(e)}>
        Search
      </button>
    </form>
  );
};
export default WordSearch;

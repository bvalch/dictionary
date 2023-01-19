import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Favs from "./components/Favs";
import WordSearch from "./components/WordSearch";
import WordDefinition from "./components/WordDefinition";
import ErrorMessage from "./components/ErrorMessage";
import Message from "./components/Message";
import { getFavs, setFavs } from "./hooks/getFav";
import useStateData from "./hooks/useStateData";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const favs = getFavs();
  const {
    data,
    setData,
    error,
    setError,
    message,
    setMessage,
    wordToRenderInFavs,
    setWordToRenderInFavs,
  } = useStateData();

  const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  const navigate = useNavigate();

  //navigates to /search in case query is provided outside of the search component
  useEffect(() => {
    if (data) {
      navigate("/search")
    }
  }, [data]);

  //resets current data and error before making next request to API
  const getWordDefinition = async (wordToGet) => {
    setData("");
    setError("");
    try {
      const response = await fetch(baseURL + wordToGet.toLowerCase());
      const data = await response.json();
      response?.status === 404 ? setError("No Word Found") : setData(data[0]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong with your request, try again later");
    }
  };

  //checks for existing entries in the favorites local storage
  const checkDuplicates = (wordToCheck) => {
    return favs.some((el) => el.word === wordToCheck);
  };

  //saves to local storage 
  const saveToFavs = (wordToSave) => {
    setError("");
    if (window.localStorage.length === 0) {
      setFavs([wordToSave]);
    } else if (!checkDuplicates(wordToSave.word)) {
      favs.push(wordToSave);
      setFavs(favs);
    } else {
      setError("You already have this word saved ");
    }
    setMessage("SUCCESS");
  };

  //deletes from local storage a single entry by filtering the array
  const deleteFromFavs = async (wordToDelete) => {
    const favsCopy=favs.slice();
    const filteredFavorites = favsCopy.filter((obj) => obj.word !== wordToDelete);
   await setFavs(filteredFavorites);
   await setWordToRenderInFavs("");
    console.log(wordToRenderInFavs);
    setMessage("success");
  };

  return (
    <div className="App">
      <NavBar />
      <div className={`message ${message !== "" ? "show-message" : ""}`}>
        <Message message={message} setMessage={setMessage} />{" "}
      </div>
      <Routes>
        <Route
          path="/search"
          element={<WordSearch getWordDefinition={getWordDefinition} />}
        />

        <Route
          path="/favs"
          element={
            <Favs
              deleteFromFavs={deleteFromFavs}
              getWordDefinition={getWordDefinition}
            />
          }
        />
      </Routes>

      {error !== "" ? <ErrorMessage error={error} /> : null}

      {data !== "" ? (
        <WordDefinition
          saveToFavs={saveToFavs}
          deleteFromFavs={deleteFromFavs}
          getWordDefinition={getWordDefinition}
        />
      ) : null}
    </div>
  );
}

export default App;

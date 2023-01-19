import { useEffect } from "react";
import { getFavs } from "../hooks/getFav";
import useStateData from "../hooks/useStateData";
import WordCard from "./WordCard";
import "../styles/styles.css";

const Favs = ({
  deleteFromFavs,
  getWordDefinition,
}) => {
  const favs = getFavs();
  const { setData, setError,wordToRenderInFavs,setWordToRenderInFavs } = useStateData();
  useEffect(() => {
    setData("");
    setError("");
    setWordToRenderInFavs("")
  }, []);

  
  const handleDeleteFromFavs = (wordToDelete) => {
    deleteFromFavs(wordToDelete);
  };

  //finds the word to display and sets in global state
  const handleDefinitionsRequest = (wordToDisplay) => {
    const findWord = favs.filter((el) => el.word === wordToDisplay);
    setWordToRenderInFavs(findWord)
  };

  //counter needed to keep track of definitions count across seperate categories(verb,noun,etc)
  let counter = 0;
  const definitionNodes = wordToRenderInFavs[0]?.meanings?.map((el) =>
    el.definitions.map((e, i) => {
      counter += 1;
      return (
        <WordCard
          counter={counter}
          partOfSpeech={el.partOfSpeech}
          definition={e.definition}
          getWordDefinition={getWordDefinition}
          synonyms={e.synonyms}
          antonyms={e.antonyms}
          key={i}
          
        />
      );
    })
  );
  

  const favNodes = favs?.map((el, i) => {
    return (
      
      <li className="list-item">
        <button className="deletebutton" onClick={() => handleDeleteFromFavs(el.word)} >X</button>
        <div className="list-item-div" key={i}  onClick={() => handleDefinitionsRequest(el.word)}>{el.word}</div>
        
      </li>
      
      
    );
  });


  return (
    <div>
      <div>
        <h1 className="headerContainer">Saved definitions</h1>
        <ul className="favscontainer"> {favNodes}</ul>
      </div>
      <h1 className="headerContainer">{!favs?.length>0? " Nothing here yet": "Click on word to see definition"}</h1>
      <div className="fav-def-container">{definitionNodes}</div>
    </div>
  );
};

export default Favs;

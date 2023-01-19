import "../styles/styles.css";
import { useState, useEffect } from "react";
import { getFavs } from "../hooks/getFav";
import useStateData from "../hooks/useStateData";
import WordCard from "./WordCard";
import SynonymList from "./SynonymList";

const WordDefinition = ({ saveToFavs, deleteFromFavs, getWordDefinition }) => {
  const favs = getFavs();
  const { data } = useStateData();

  const [wordIsInFavs, setWordIsInFavs] = useState(false);
  const handleAddToFavourites = () => {
    saveToFavs(data);
  };
  const handleDeleteFromFavs = () => {
    deleteFromFavs(data.word);
  };

  //flips boolean to determine wether word in global state is already in local storage favorites, controls save/delete button
  useEffect(() => {
    if (favs) {
      favs.some((el) => el.word === data.word)
        ? setWordIsInFavs(true)
        : setWordIsInFavs(false);
    }
  }, [data, favs]);

  if (data === undefined) return "Loading";
  
  let counter = 0;
  const definitionNodes = data.meanings.map((el) =>
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
  const synonymNodes = data.meanings.map(meaning=>meaning.synonyms).reduce((acc,val)=>acc.concat(val),[]).map((el)=>{
    return (
      <SynonymList key={el} value={el} getWordDefinition={getWordDefinition} />
    )
  })
  const antonymNodes = data.meanings.map(meaning=>meaning.antonyms).reduce((acc,val)=>acc.concat(val),[]).map((el)=>{
    return (
      <SynonymList value={el} getWordDefinition={getWordDefinition} />
    )
  })

  return (
    <div className="definitionContainer">
      <div className="headerContainer">
        <h3>Showing results for :</h3>
        <h1>{data.word}</h1>
        <div className="cont">SYNONYMS : {synonymNodes}</div>
        
        <div className="synoantocontainer">ANTONYMS : {antonymNodes}</div>
        

        {wordIsInFavs ? (
          <button
            type="button"
            className="buttonSave"
            onClick={handleDeleteFromFavs}
          >
            Delete
          </button>
        ) : (
          <button
            type="button"
            className="buttonSave"
            onClick={handleAddToFavourites}
          >
            Save this word
          </button>
        )}
      </div>
      <div className="nodesContainer">{definitionNodes}</div>
    </div>
  );
};

export default WordDefinition;

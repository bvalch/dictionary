import { useEffect } from "react";
import useStateData from "../hooks/useStateData";

const WordCard=({partOfSpeech,definition, synonyms,antonyms,counter,getWordDefinition})=>{
  const wordToRenderInFavs = useStateData();

  useEffect(()=>{

  },[wordToRenderInFavs])


    return(
        <div key={counter} className="infoCard">
          <div className="partofspeech">{partOfSpeech}</div>
          <h2>{`DEFINITION  N:${counter}`}</h2>
          <h3>{definition}</h3>
          <h2>SYNONYMS</h2>
          <h3 >
            {synonyms.length === 0 ? "N/A" : synonyms.map((synonym,i)=>{
                return <div key ={i} className = "synonym" onClick={() => getWordDefinition(synonyms[0])}>{synonym}</div>
            })}
          </h3>
          <h2>ANTONYMS</h2>
          <h3>{antonyms.length === 0 ? "N/A" : antonyms}</h3>
         
        </div>
    )
}
export default WordCard;
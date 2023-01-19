import { useContext } from "react";
import DataContext from "../context/stateProvider";

export const useStateData = () => {
  const { data, setData } = useContext(DataContext);
  const { error, setError } = useContext(DataContext);
  const { message  , setMessage } = useContext(DataContext);
  const { wordToRenderInFavs,setWordToRenderInFavs}=useContext(DataContext);

  return { data, setData, error, setError, message, setMessage,wordToRenderInFavs,setWordToRenderInFavs };
};

export default useStateData;

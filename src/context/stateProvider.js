import { createContext,useState } from "react";
const DataContext = createContext({});

export const DataProvider =({children})=>{
    const [data,setData]=useState("");
    const [error,setError]=useState("");
    const [message,setMessage]=useState("");
    const [ wordToRenderInFavs,setWordToRenderInFavs]=useState("")
    return(
        <DataContext.Provider value={{data,setData, error, setError, message, setMessage,wordToRenderInFavs,setWordToRenderInFavs}} >
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;
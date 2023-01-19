import "../styles/styles.css";

const ErrorMessage=({error})=>{

    return(
        <div className="errorMessage"><h2>{error}</h2></div>
    )

}
export default ErrorMessage;
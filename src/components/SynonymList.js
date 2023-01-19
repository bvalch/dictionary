const SynonymList = ({ value, getWordDefinition}) => {

  return (
    <span className="synonym" onClick={()=>getWordDefinition(value)}>{ value}  </span>
    );
};
export default SynonymList;

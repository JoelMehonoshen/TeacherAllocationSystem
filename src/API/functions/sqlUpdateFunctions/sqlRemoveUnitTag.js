// sql to add / remove academic tags 
const sqlRemoveUnitTag= (tag, UnitCode) => {

  sqlpt1 = "UPDATE Units ";
  sqlpt2 = "SET Tags = REPLACE((SELECT Tags FROM Units WHERE UnitCode = '" + UnitCode +"'),':" + tag +":','') WHERE UnitCode = '" + UnitCode +"'";
  return sqlpt1 + sqlpt2; 
  } 

module.exports = sqlRemoveUnitTag; 
// Get all tags for a specified academic 
const sqlGetUnitTags = (UnitCode) => {
    sqlpt1 = "Select Tags FROM Units WHERE UnitCode = ";
    sqlpt2 = "'" + UnitCode + "'";
    return sqlpt1 + sqlpt2;
    }

module.exports = sqlGetUnitTags; 
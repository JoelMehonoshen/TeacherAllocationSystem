//Delete the unit year where the year id =
const sqlRemoveUnit = (unitYearCode) => {
    sqlpt1 = "DELETE FROM UnitYear WHERE UnitYearCode =";
    sqlpt2 = "'" + unitYearCode + "' ";
    return sqlpt1 + sqlpt2;
}

module.exports = sqlRemoveUnit; 
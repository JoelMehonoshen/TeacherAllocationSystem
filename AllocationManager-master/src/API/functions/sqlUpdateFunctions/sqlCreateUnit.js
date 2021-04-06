const sqlCreateUnit = (unitCode,unitName) => 
{
    // Remove tags just for now to get it working 
    sqlpt1 = "INSERT OR IGNORE INTO Units(UnitCode,UnitName,tags)";
    sqlpt2 = "VALUES ('"+ unitCode+"','"+ unitName+"','"+"')";

    return sqlpt1 + sqlpt2;
}

module.exports = sqlCreateUnit; 
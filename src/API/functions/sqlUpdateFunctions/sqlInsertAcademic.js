
//Run per academic(Insert or Replace handles uniqueness)
//Add school later
const sqlInsertAcademic = ( name,  school) => 
{
    sqlpt1 = "INSERT OR IGNORE INTO Academic(Name,School)";
    sqlpt2 = "VALUES ('"+ name +"','"+ school +"') ";
    console.log(sqlpt1 + sqlpt2)
    return sqlpt1 + sqlpt2;
}

module.exports = sqlInsertAcademic; 
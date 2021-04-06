const updateUnits = async (db, query) => {

    const units = await selectUnits(db, query); 
    await updateUnitsLoad(db, query, units); 
}


const selectUnits = (db, query) => {
    return new Promise((resolve, reject) => {

        let result = []; 
        db.each(sqlSelectUnits(query.yearID), (err, row) => {
          if(err) {reject(err)}

          result.push(row)
        }, () => {

          resolve(result)
        })
      })
}

const updateUnitsLoad = (db, query, units) => {
    let result = [];


    for (let i=0; i < units.length; i++) {
        db.each(sqlUpdateUnits(units[i].UnitYearCode, query.newMinLoad,units[i].Enrolled,units[i].Share), (err, row) => {
            if (err) { console.log(err) }
            result.push(row); 
        })
    }
}


const sqlSelectUnits = (yearID) => {
    sqlpt1 = "SELECT UnitYearCode,Enrolled,Share FROM UnitYear WHERE YearID = '" + yearID + "'";

    return sqlpt1;
}
const sqlUpdateUnits = (unitYearCode,minLoad,enrolled,share) => {
    AssignedLoad = Math.max(Math.log10(enrolled/7),minLoad)*share;
    sqlpt1 = "UPDATE UnitYear SET AssignedLoad = '"+AssignedLoad+"' WHERE UnitYearCode = '" + unitYearCode + "'";
    
    return sqlpt1 ;
}


module.exports = updateUnits;
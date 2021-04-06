
const removeYear = async (db, query) => {
  const academics = await selectAcademics(db, query); 
  const units = await selectUnits(db, query); 
  await deleteAllocations(db, academics, units); 
  await deleteAcademics(db, query); 
  await deleteUnits(db, query); 
  await deleteYear(db, query); 
}



const selectAcademics = (db, query) => {
  return new Promise((resolve, reject) => {

      let result = []; 
      db.each(sqlSelectAcademics(query.yearID), (err, row) => {
        if(err) {reject(err)}

        result.push(row)
      }, () => {

        resolve(result)
      })
    })
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

const deleteAllocations = (db, academics, units) => {
  let result = [];
  for (let i=0; i < academics.length; i++) {
    for (let j=0; j < units.length; j++) {
      db.each(sqlDeleteAllocations(academics[i].AcademicAllocationCode, units[j].UnitYearCode), (err, row) => {
          if (err) { console.log(err) }
          result.push(row); 
      })
  }

}}
const deleteAcademics = (db, query) => {
  let result = [];


  
      db.each(sqlDeleteAcademics( query.yearID), (err, row) => {
          if (err) { console.log(err) }
          result.push(row); 
      })
  
}
const deleteUnits = (db, query) => {
  let result = [];


  
      db.each(sqlDeleteUnits( query.yearID), (err, row) => {
          if (err) { console.log(err) }
          result.push(row); 
      })
  
}
const deleteYear = (db, query) => {
  let result = [];


  
      db.each(sqlDeleteYear( query.yearID), (err, row) => {
          if (err) { console.log(err) }
          result.push(row); 
      })
  
}

const sqlSelectAcademics = (yearID) => {
  sqlpt1 = "SELECT AcademicAllocationCode FROM AcademicAllocation WHERE YearID = '" + yearID + "'";
  return sqlpt1;
}
const sqlSelectUnits = (yearID) => {
  sqlpt1 = "SELECT UnitYearCode FROM UnitYear WHERE YearID = '" + yearID + "'";
  return sqlpt1;
}

const sqlDeleteAcademics = (yearID) => {
  sqlpt1 = "DELETE FROM AcademicAllocation WHERE YearID = '" + yearID + "'";

  return sqlpt1;
}
const sqlDeleteUnits = (yearID) => {
  sqlpt1 = "DELETE FROM UnitYear WHERE YearID = '" + yearID + "'";

  return sqlpt1;
}
const sqlDeleteAllocations = (academics,units) => {
  sqlpt1 = "DELETE FROM Allocation WHERE AcademicAllocationCode = '" + academics + "' and UnitYearCode = '" + units + "'";
  return sqlpt1 ;
}
const sqlDeleteYear = (yearID) => {
  sqlpt1 = "DELETE FROM Years WHERE YearID = '"+yearID+"'"
  return(sqlpt1)
}
module.exports = removeYear;
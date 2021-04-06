 // exports a year from the database 
const exportYear = (db, query) => { 
  return new Promise((resolve, reject) => {
    let result = [];
    if (query.tablename == 'year'){

      db.each(sqlExportYear(query.yearID), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })
  
      }
      else if  (query.tablename == 'academicYear'){
        db.each(sqlAcademicYearDetails(query.yearID), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
      }
      else if  (query.tablename == 'unitYear'){
        db.each(sqlUnitYearDetails(query.yearID), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
      }
      else if  (query.tablename == 'academic'){
          db.each(sqlAcademicDetails(query.academicID), (err, row) => {
            if(err) {console.log(err)}
            result.push(row)
          }, () => {
            resolve(result)
          })
      
    }
    else if  (query.tablename == 'unit'){
      
        db.each(sqlUnitDetails(query.unitID), (err, row) => {
          if(err) {console.log(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    
  }
  else if  (query.tablename == 'allocations'){
      
    db.each(sqlAllocationDetails(query.unitYearCode, query.academicAllocationCode), (err, row) => {
      if(err) {console.log(err)}
      result.push(row)
    }, () => {
      resolve(result)
    })
}

    })}

const sqlExportYear = (yearID) => {
    return "SELECT * FROM Years WHERE YearID = '"+yearID+"'"; 
} 
  // const allocationDetails = await AllocationDetails(db, query); 
const sqlAcademicYearDetails = (yearID) => { 
  return "SELECT * FROM AcademicAllocation WHERE YearID = '"+yearID+"'"; 
}
const sqlAcademicDetails = (academicID) => {
  return "SELECT * FROM Academic WHERE AcademicID = '"+academicID+"'"; 
}
const sqlUnitYearDetails = (yearID) => {
return "SELECT * FROM UnitYear WHERE YearID = '"+yearID+"' ORDER BY UnitID"; 
}
const sqlUnitDetails = (unitID) => {
  return "SELECT * FROM Units WHERE UnitID = '"+unitID+"'"; 
}
// const AllocationDetails = (db, query) => { 
//   return new Promise((resolve, reject) => {
//     let result = []; 
//     db.each(sqlAllocationDetails(query.yearID), (err, row) => {
//       if(err) {reject(err)}
//       result.push(row);

//     })
//   })
// }
const sqlAllocationDetails = (unitYearCode,academicAllocationCode) => {
  
 return "SELECT * FROM Allocation WHERE UnitYearCode = '"+unitYearCode+"' AND AcademicAllocationCode = '"+academicAllocationCode+"'"; 
}
      
module.exports = exportYear; 
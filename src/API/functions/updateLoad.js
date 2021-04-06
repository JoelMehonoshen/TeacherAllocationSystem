
const updateLoad = async (db, query) => {
    await updateYear(db, query); 
    const academics = await selectAcademics(db, query); 
    await updateAcademics(db, query, academics); 
}

const updateYear = (db, query) => {
    let result = [];
    db.each(sqlUpdateYear(query.yearID), (err, row) => {
        if (err) { console.log(err) }
        result.push(row); 
    })
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

const updateAcademics = (db, query, academics) => {
    let result = [];


    for (let i=0; i < academics.length; i++) {
        db.each(sqlUpdateAcademics(academics[i].AcademicID, query.yearID), (err, row) => {
            if (err) { console.log(err) }
            result.push(row); 
        })
    }
}

const sqlUpdateYear = (yearID) => {
    sqlpt1 = "UPDATE Years SET StandardLoad = (ifnull((SELECT Sum(AssignedLoad) FROM UnitYear WHERE YearID = '" + yearID + "') / (SELECT Sum(Load) FROM AcademicAllocation WHERE YearID = '" + yearID + "'),0.0)) WHERE YearID = '" + yearID + "'";
    return sqlpt1;
}

const sqlSelectAcademics = (yearID) => {
    sqlpt1 = "SELECT academicID FROM AcademicAllocation WHERE YearID = '" + yearID + "'";

    return sqlpt1;
}
const sqlUpdateAcademics = (academics,yearID) => {

    sqlpt1 = "UPDATE AcademicAllocation SET UnitLoad = (SELECT StandardLoad FROM Years WHERE YearID = '" + yearID + "')*Load WHERE AcademicID = '" + academics + "' and YearID = '" + yearID + "'";

    return sqlpt1 ;
}


module.exports = updateLoad;


const importTable = (db, query) => {
    return new Promise((resolve, reject) => {
      let result = [];
      
      if(query.tableName == "units")
      {
        db.each(sqlInsertUnit( query.unitCode, query.unitName), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })

      }
      else if (query.tableName == "years")
      {
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlUpdateYears( query.yearID, query.minLoad, query.standardLoad), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      }
      else if (query.tableName == "academic")
      {
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlInsertAcademic( query.name, query.school), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      }
      else if (query.tableName == "academicAllocation")
      {
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlInsertAcademicAllocation( query.name, query.yearID, query.load, query.unitLoad, query.actualLoad, query.loadError), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      }
      else if (query.tableName == "subject")
      {
        
        if (query.semester == 12)
        {
          query.semester = "3"
        }
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlInsertSubject(query.unitCode, query.yearID, query.semester, query.students, query.share ,query.assignedLoad, query.allocatedLoad, query.loadError), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

       
      }
      else if (query.tableName == "subjectpt2")
      {
        
        if (query.semester == 12)
        {
          query.semester = "3"
        }
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlInsertSubjectPt2(query.unitCode, query.yearID, query.semester), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

       
      }
      else if (query.tableName == "allocation")
      {
        if (query.semester == 12)
        {
          query.semester = "3"
        }
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlAllocations(  query.unitCode,query.yearID,query.semester,query.name, query.allocation), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      }
      else if (query.tableName == "updateTags")
      {
        // Change timeID to actual amount later, 1 for now 
      db.each(sqlUpdateTags( query.yearID,query.name), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      }

    })
  }
// RUN  per unit( unique onstraint should stop any double ups in unit codes)
const sqlInsertUnit = (UnitCode, CourseName) => 
{
    sqlpt1 = "INSERT OR IGNORE INTO Units(UnitCode,UnitName)";
    sqlpt2 = " VALUES ('" + UnitCode + "','" + CourseName + "')"; 
    return sqlpt1 + sqlpt2;
}
const sqlUpdateYears = (yearID,minLoad,standardLoad) => 
{
    sqlpt1 = "UPDATE Years SET Minimum = '"+minLoad+"', StandardLoad = '"+standardLoad+"' ";
    sqlpt2 = " WHERE YearID = '"+yearID+"'"; 
    return sqlpt1 + sqlpt2;
}

//Run per academic(Insert or Replace handles uniqueness)
//Add school later
const sqlInsertAcademic = ( name,school ) => 
{
    sqlpt1 = "INSERT OR IGNORE INTO Academic(Name,School)";
    sqlpt2 = "VALUES ('"+ name +"','"+ school +"') ";

    return sqlpt1 + sqlpt2;
}
const sqlInsertAcademicAllocation = ( name, YearID, Load, UnitLoad, ActualLoad, LoadError) => 
{
    sqlpt1 = "INSERT OR IGNORE INTO AcademicAllocation(AcademicID, YearID, Load, UnitLoad, ActualLoad, LoadError,AcademicAllocationCode) ";
    sqlpt2 = "VALUES ((SELECT AcademicID FROM Academic WHERE Name = '"+ name +"'),'" + YearID + "','"+ Load +"','" + UnitLoad + "','" + ActualLoad + "','" + LoadError + "',(SELECT AcademicID FROM Academic WHERE Name = '"+ name +"')||'" + YearID + "')";

    return sqlpt1 + sqlpt2;
}
const sqlInsertSubject = (UnitCode, YearID, Semester, Students, Share ,AssignedLoad, AllocatedLoad, LoadError) => 
{
  //(SELECT SubjectID FROM Subject WHERE UnitID = (SELECT UnitID FROM Unit WHERE UnitCode = '" + UnitCode + "') AND YearID ='" + YearID + "' AND SemesterID = (SELECT SemesterID FROM Semesters WHERE Semester = '" + Semester + "')
    sqlpt1 = "INSERT OR IGNORE INTO UnitYear(UnitID, YearID, SemesterID, Share , Enrolled,AssignedLoad, AlocatedLoad, LoadError)";
    sqlpt2 = "VALUES ((SELECT UnitID FROM Units WHERE UnitCode = '" + UnitCode + "'),'" + YearID + "', '" + Semester + "','" + Share + "','" + Students + "','" + AssignedLoad + "','" + AllocatedLoad + "','" + LoadError + "')";

    return sqlpt1 + sqlpt2;
    
}
const sqlInsertSubjectPt2 = (UnitCode, YearID, Semester) => 
{
  //(SELECT SubjectID FROM Subject WHERE UnitID = (SELECT UnitID FROM Unit WHERE UnitCode = '" + UnitCode + "') AND YearID ='" + YearID + "' AND SemesterID = (SELECT SemesterID FROM Semesters WHERE Semester = '" + Semester + "')
    sqlpt1 = "UPDATE UnitYear ";
    sqlpt2 = "SET UnitYearCode = (SELECT UnitYear.UnitID || '"+YearID+"' || '"+Semester+"' FROM UnitYear,Units WHERE Units.UnitCode = '"+UnitCode+"' AND UnitYear.UnitID = Units.UnitID ) ";
    sqlpt3 = "WHERE YearID = '"+YearID+"' AND SemesterID =  '"+Semester+"' AND UnitID = (SELECT UnitID FROM Units WHERE UnitCode = '"+UnitCode+"')";
    return sqlpt1 + sqlpt2 + sqlpt3;
    
}
const sqlAllocations = ( UnitCode,yearID,semester,name, Allocation) => 
{
  //sql statemaent to insert a new allocation when given the unitcode year semester name and allocation
    sqlpt1 = "INSERT OR IGNORE INTO Allocation(UnitYearCode,AcademicAllocationCode,AllocationAmount) ";
    sqlpt2 = "VALUES ((SELECT UnitYear.UnitYearCode FROM UnitYear,Units WHERE Units.UnitCode = '"+UnitCode+"' AND UnitYear.UnitID = Units.UnitID AND UnitYear.SemesterID =  '"+semester+"' AND YearID = '"+yearID+"'),(SELECT AcademicID FROM Academic WHERE Name = '"+ name +"')||'" + yearID + "','" + Allocation + "')";

    return sqlpt1 + sqlpt2;
}
const sqlUpdateTags = (YearID,name) => {
  sqlpt1 = "UPDATE AcademicAllocation SET Tags = ifnull((SELECT Tags FROM Academic WHERE Academic.Name = '"+name+"' ) || (SELECT group_concat(Tags)";
  sqlpt2 = "FROM Units,UnitYear,Allocation WHERE UnitYear.UnitID = Units.UnitID AND UnitYear.YearID = '"+YearID+"' AND Allocation.UnitYearCode = UnitYear.UnitYearCode";
  sqlpt3 = "AND Allocation.AcademicAllocationCode = (SELECT AcademicID FROM Academic WHERE Academic.Name = '"+name+"')||'"+YearID+"'),'')WHERE AcademicAllocation.AcademicID = (SELECT AcademicID FROM Academic WHERE Name = '"+name+"') AND YearID = '"+YearID+"'";
  return sqlpt1 + sqlpt2 + sqlpt3;
}


module.exports = importTable; 


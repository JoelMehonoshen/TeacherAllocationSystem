SELECT DISTINCT Academic.AcademicID, Academic.Title, Academic.FirstName, Academic.LastName, Academic.Load, AcademicAllocation.LoadError 
FROM Academic,AcademicAllocation,Subject,Unit,Allocation 
WHERE Allocation.AcademicID = Academic.AcademicID 
AND Unit.UnitID = Subject.UnitID
AND Subject.SubjectID = Allocation.SubjectID 
AND AcademicAllocation.YearID = Subject.YearID 
AND Academic.AcademicID = AcademicAllocation.AcademicID
{'add this piece of sql for searchs'}
AND Unit.UnitCode LIKE 'cab%'

{'run for each academic found in previous loop and append results to that academic'}
SELECT Time.Semester, Unit.UnitCode, Subject.AssignedLoad, Allocation.AllocationAmount 
FROM Subject,Unit,Time,Allocation 
WHERE  Subject.UnitID = Unit.UnitID 
AND Subject.SubjectID = Allocation.SubjectID 
AND Subject.YearID = Time.YearID 
AND Allocation.AcademicID = 'SearchID' 
ORDER BY Unit.UnitCode ASC




{'Update sequence'}
UPDATE Allocation
SET AllocationAmount = '1.0'
WHERE AcademicID = '5'
AND SubjectID = '11'



{'UnitLoad = all subject allocations added together'}
UPDATE AcademicAllocation
SET UnitLoad = '{AssignedLoad * AllocationAmount} for each unit assigned'
WHERE AcademicID = ''
AND TimeID = '' 




(SELECT SUM(AllocationAmount)
FROM Allocation
WHERE SubjectID = '11'

SELECT Sum(Allocation.AllocationAmount* Subject.AssignedLoad)
FROM Subject,Allocation
WHERE Allocation.AcademicID = '2'
AND Subject.SubjectID = Allocation.SubjectID

UPDATE AcademicAllocation
SET LoadError = AcademicAllocation.UnitLoad - AcademicAllocation.ActualLoad
WHERE AcademicID = '2'
AND TimeID = '1'

{/** 
  RUN FOR EACH SUBJECT
  variable 1: Updated Allocation Amount
  variable 2&3 identify the row to update
 */}
const sqlAllocationUpdate = (variable1,variable2,variable3) => {
  sqlpt1 = "UPDATE Allocation SET AllocationAmount =";
  sqlpt2 = "'" + variable1 + "' WHERE AcademicID =";
  sqlpt3 = "'" + variable2 + "' AND SubjectID =";
  sqlpt4 = "'" + variable3 + "' ";
  return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4;
} 
{/** 
  Run per Academic
  variable 1: AcademicID
  Variable 2: TimeID(Gloabal for demo)
 */}
const sqlAcademicUpdate = (variable1,variable2,) => {
  sqlpt1 = "UPDATE AcademicAllocation SET UnitLoad =SELECT Sum(Allocation.AllocationAmount * Subject.AssignedLoad)FROM Subject,AllocationWHERE Allocation.AcademicID =";
  sqlpt3 = "'" + variable1 + "' AND Subject.SubjectID = Allocation.SubjectID) WHERE AcademicID =";
  sqlpt4 = "'" + variable1 + "' AND YearID =";
  sqlpt5 = "'" + variable2 + "' ";
  return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4 + sqlpt5;
} 
{/** 
  Run per Academic
  variable 1: AcademicID
  Variable 2: TimeID(Gloabal for demo)
 */}
const sqlAcademicErrorUpdate = (variable1,variable2) => {
  sqlpt1 = "UPDATE AcademicAllocation SET LoadError = AcademicAllocation.UnitLoad - AcademicAllocation.ActualLoad WHERE AcademicID =";
  sqlpt2 = "'" + variable1 + "' AND YearID =";
  sqlpt3 = "'" + variable2 + "' ";
  return sqlpt1 + sqlpt2 + sqlpt3;
} 
{/**
  could run over all of the subjects at the end or after other queries are done
  variable 1: SubjectID
*/}
const sqlSubjectUpdate = (variable1) => {
  sqlpt1 = "UPDATE Subject SET AlocatedLoad = (SELECT SUM(AllocationAmount) FROM Allocation WHERE SubjectID =";
  sqlpt2 = "'" + variable1 + "' ), LoadError = (SELECT SUM(AllocationAmount) FROM Allocation WHERE SubjectID =";
  sqlpt3 = "'" + variable1 + "') - 1 WHERE SubjectID =";
  sqlpt4 = "'" + variable1 + "'";
  return sqlpt1 + sqlpt2 + sqlpt3 + sqlpt4;
} 





Under Allocated Academics
/**
Only year needs to be entered at this stage can be 1 by default for testing
*/
SELECT DISTINCT Academic.AcademicID, Academic.Title, Academic.FirstName, Academic.LastName, Academic.Load, AcademicAllocation.UnitLoad , AcademicAllocation.ActualLoad, AcademicAllocation.LoadError 
FROM Academic,AcademicAllocation,Subject,Unit,Allocation 
WHERE Allocation.AcademicID = Academic.AcademicID 
AND Unit.UnitID = Subject.UnitID 
AND Subject.SubjectID = Allocation.SubjectID 
AND AcademicAllocation.YearID = Subject.YearID 
AND Academic.AcademicID = AcademicAllocation.AcademicID
AND Subject.YearID = '1'
AND AcademicAllocation.LoadError < 0.0


Under Allocated Units
/**
Only Year needs to be entered at this stage can be 1 by default for testing
*/
SELECT Semesters.Semester, Unit.UnitCode, Subject.AssignedLoad, Allocation.AllocationAmount 
FROM Subject,Unit,Semesters,Allocation 
WHERE  Subject.UnitID = Unit.UnitID 
AND Subject.SubjectID = Allocation.SubjectID 
AND Subject.SemesterID = Semesters.SemesterID
AND Subject.YearID = '1'
AND Subject.LoadError < 0.0
ORDER BY Unit.UnitCode ASC


SELECT DISTINCT Year
FROM Years


/**
Select Tags
*/
const sqlSubjectUpdate = (variable1) => {
  sqlpt1 = "Select AcademicTags FROM Academic WHERE AcademicID = ";
  sqlpt2 = "'" + variable1 + "'";
  return sqlpt1 + sqlpt2;
} 

/**
Delete/Add Tags
*/
const sqlSubjectUpdate = (variable1) => {
  sqlpt1 = "Update Academic(AcademicTag) SET (";
  sqlpt2 = "'" + variable1 + "')";
  return sqlpt1 + sqlpt2;
} 
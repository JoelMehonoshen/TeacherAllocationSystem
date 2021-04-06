
/**
need to test if the unique constraint will save us from having to query before inserting
*/
INSERT INTO Unit(UnitCode,CourseName)
VALUES (UnitCodeValue,CourseNameValue)

/**
need to query database to not double up on names
*/
INSERT INTO Academics(Title,FirstName,LastName,Load)
VALUES (AcademicTtile,FirstnameValue,LastnameValue,LoadValue)

/**
need to test if the unique constraint will save us from having to query before inserting
*/
INSERT INTO Subject(SubjectID,UnitID,YearID,SemesterID,Share,Enrolled,AssignedLoad,AlocatedLoad,Loaderror)
VALUES (SubjectID,UnitID,YearID,SemesterID,Share,Enrolled,AssignedLoad,AlocatedLoad,Loaderror)

/**
need to test if the unique constraint will save us from having to query before inserting
*/
INSERT INTO AcademicAllocation(AcademicID,YearID,UnitLoad,ActualLoad,LoadError)
VALUES (AcademicID,YearID,UnitLoad,ActualLoad,LoadError)

/**
need to test if the unique constraint will save us from having to query before inserting
*/
INSERT INTO Allocation(SubjectID,AcademicID,AllocationAmount)
VALUES (SubjectID,AcademicID,AllocationAmount)
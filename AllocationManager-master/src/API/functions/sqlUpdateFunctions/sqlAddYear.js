
const sqlAddYear = (year, minLoad) => {
    // SQL to add a new year to the db
    return `INSERT OR IGNORE INTO Years(Year,Minimum,StandardLoad) VALUES(${year},${minLoad},0.0)`; 
}

module.exports = sqlAddYear;
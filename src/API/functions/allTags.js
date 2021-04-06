sqlGetAllTags = require("./sqlGetFunctions/sqlGetAllTags.js"); 

// Get all the tags
const allTags = (db) => {
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlGetAllTags(), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })
}

module.exports = allTags; 
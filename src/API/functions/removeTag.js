sqlRemoveTag = require("./sqlUpdateFunctions/sqlRemoveTag.js"); 

// Removes a tag from the database 
const removeTag = (db, query) => { 
    return new Promise((resolve, reject) => {
      let result = []; 
      db.each(sqlRemoveTag(query.tag), (err, row) => {
        if(err) {reject(err)}
        result.push(row)
      }, () => {
        resolve(result)
      })

      // Further functionality will be to remove the tag where it is assigned to
      // any unit or academic. 
    })
}

module.exports = removeTag; 
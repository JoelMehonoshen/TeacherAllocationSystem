sqlGetAllTagsExcludingSome = require("./sqlGetFunctions/sqlGetAllTagsExcludingSome.js"); 

// Get all the tags
const allTagsExcludingSome = (db, tagsToExclude) => {
      return new Promise((resolve, reject) => {
        let result = []; 
        db.each(sqlGetAllTagsExcludingSome(tagsToExclude), (err, row) => {
          if(err) {reject(err)}
          result.push(row)
        }, () => {
          resolve(result)
        })
    })
}

module.exports = allTagsExcludingSome; 
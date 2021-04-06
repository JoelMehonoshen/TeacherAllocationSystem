const sqlRemoveTag = (tag) => {
    // SQL to remove a given tag from the database
    return "DELETE from Tags WHERE tag = '" + tag + "'";
}

module.exports = sqlRemoveTag;
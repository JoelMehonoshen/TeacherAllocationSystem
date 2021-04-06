const sqlAddTag = (newTag) => {
    // SQL to add the new tag to the tags database  
    return "INSERT OR IGNORE INTO Tags(Tag) VALUES ('"+ newTag +"')";
}

module.exports = sqlAddTag;
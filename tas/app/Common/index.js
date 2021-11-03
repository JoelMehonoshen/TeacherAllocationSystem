/*
  This file contains helper methods for the rest of the application.
  Contains tag management methods
  https://stackoverflow.com/questions/50862401/how-to-share-code-between-controllers-in-adonis-js/50862607
*/

"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");
const Tag = use("App/Models/Tag");

module.exports = class Common {
  // Gets all the tags from the database
  getTags() {
    Tag.all()
      .then((tags) => {
        return tags;
      })
      .catch((err) => {
        Logger.error(err);
        throw new Exception("Error getting tags", 500);
      });
  }

  // Gets a single tag from the database
  getTag(id) {
    Tag.find(id)
      .then((tag) => {
        return tag;
      })
      .catch((err) => {
        Logger.error(err);
        throw new Exception("Error getting tag", 500);
      });
  }

  // Adds a single tag to the database
  addTag(tag, type, entity) {
    tag = new Tag();
    switch (type) {
      case "unit":
        newTag.type = "unit";
        newTag.unit_id = entity;
        newTag.tag = tag;
        newTag.save();
        break;
      case "academic":
        newTag.type = "academic";
        newTag.academic_id = entity;
        newTag.tag = tag;
        newTag.save();
        break;
      case "allocation":
        newTag.type = "allocation";
        newTag.allocation_id = entity;
        newTag.tag = tag;
        newTag.save();
        break;
      default:
        throw new Exception("Invalid tag type");
    }
  }

  // Removes a single tag from the database
  removeTag(tag) {}
};

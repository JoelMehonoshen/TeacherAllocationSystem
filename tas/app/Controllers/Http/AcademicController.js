"use strict";
const Exception = use("App/Exceptions/Handler");
const Logger = use("Logger");

const Academic = use("App/Models/Academic");
const Database = use("Database");

class AcademicController {
  async addacademic({ request, response }) {
    try {
      await Database.table("academics").insert({
        name: request.input("name"),
        year: request.input("year"),
        school: request.input("school"),
        load: request.input("load"),
      });
      return response.route("/academics", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async updateacademic({ response, request }) {
    try {
      await Database.from("academics")
        .where("id", request.input("academicID"))
        .update({
          name: request.input("name"),
          load: request.input("load"),
        });
      return response.route("/academics", true);
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }

  async render({ request, view }) {
    try {
      if (request.input("search")) {
        const academics = await Database.from("academics").where(
          "name",
          request.input("search")
        );
        return view.render("academics", { academics: academics });
      } else {
        const academics = await Academic.all();
        return view.render("academics", { academics: academics.toJSON() });
      }
    } catch (error) {
      Logger.error(error);
      throw new Exception();
    }
  }
}
module.exports = AcademicController;

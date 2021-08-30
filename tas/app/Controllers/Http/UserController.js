"use strict";

const User = use("App/Models/User");
const Logger = use("Logger");
const validator = require("validator");
const password_options = {
  minLength: 8,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  returnScore: false,
};

class UserController {
  /*
    Validates that user credentials are valid then creates a new user and returns a  token
  */
  async signup({ request, auth, response }) {

    // Check if the creds meet our requirements, if they don't throw an error
    try {
      if (!validator.isEmail(request.input("email"))) {
        throw "Not a valid email address.";
      }
      if (
        !validator.isStrongPassword(request.input("password"), password_options)
      ) {
        throw "Password needs to be at least 8 characters.";
      }
    } catch (error) {
      Logger.error(error);
      return response.status(400).json({
        status: "error",
        message: error,
      });
    }

    // Check if this email address is already beeing used, if it does throw an error
    try {
      if (await User.findBy('email', request.input("email"))) {
        throw "A user with this email already exists."
      }
    } catch (error) {
      Logger.error(error);
      return response.status(400).json({
        status: "error",
        message: error
      });
    }

    // If all the above have passed then lets create the user and return their token
    try {
      const userData = request.only(["username", "email", "password"]);
      const newUser = await User.create(userData);
      await auth.login(newUser)
      return response.redirect('/', true)
    } catch (error) {
      Logger.error(error);
      return response.status(400).json({
        status: "error",
        message:
          "There was a problem creating the user, please try again later.",
      });
    }
  }

  /*
    Logs in a user to the service and returns a session token
  */
  async login({ request, auth, response }) {
    try {
      await auth.attempt(request.input("email"), request.input("password"));

      return response.route('/', true)

    } catch (error) {
      return response.route('/login_error', true)

      // Logger.error(error);
      // response.status(400).json({
      //   status: "error",
      //   message: "Invalid credentials.",
      // });
    }
  }

  /*
    Logs Out User
  */
  async signout({ auth, response }) {
    try {
      await auth.logout()
      return response.route('/', true)
    } catch (error) {
      Logger.error(error);
      response.send("Error Logging Out");
    }
  }

  /*
    Tests authentication & returns the logged in user
  */
  async whoami({ request, auth, response }) {
    try {
      return await auth.getUser();
    } catch (error) {
      Logger.error(error);
      response.send("Missing or invalid token");
    }
  }


}

module.exports = UserController;

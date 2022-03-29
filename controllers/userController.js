import HttpError from "http-errors";
import userModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
import messageapp from "../data/messages.js";

const register = (req, res, next) => {
  console.log(`---> userController::register`);

  try {
    const body = req.body;
    let result;

    if (!body.username || !body.password) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      console.log(`---> userController::register ${body.password}`);
      const user = {
        username: body.username,
        password: body.password,
        timestamp: body.timestamp || 0,
        active: 1,
      };

      result = userModel.loginUser(user);
      if (result != undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        result = userModel.createUser(user);

        if (result < 0)
          next(HttpError(400, { message: messageapp.user_error_register }));

        res.status(201).json(result);
      }
    }
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  console.log(`---> userController::login`);

  try {
    const body = req.body;

    if (!body.username || !body.password) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        password: body.password,
        timestamp: body.timestamp || 0,
      };
      const result = userModel.loginUser(user);

      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          console.log(`---> userController::login ${result.password}`);
          console.log(`---> userController::login ${body.password}`);

          if (!bcrypt.compareSync(body.password, result.password))
            next(HttpError(400, { message: messageapp.user_error_login }));
          else res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const _delete = (req, res, next) => {
  try {
    const body = req.body;

    if (!body.username) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        password: body.password,
        timestamp: body.timestamp || 0,
        active: 1,
      };
      const result = userModel.loginUser(user);

      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          result.active = 0;
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const active = (req, res, next) => {
  try {
    const body = req.body;

    if (!body.username) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        password: body.password,
        timestamp: body.timestamp || 0,
        active: 0,
      };
      const result = userModel.loginUser(user);

      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 1) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          result.active = 1;
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res, next) => {
  console.log("---> userController:getUser");

  try {
    const user = {
      username: req.params.username,
    };
    const result = userModel.loginUser(user);
    const resultado = JSON.parse(JSON.stringify(result));
    delete resultado.password;

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const newPass = (req, res) => {
  try {
    const body = req.body;
    const newpassword = bcrypt.hashSync(req.body.newpassword, 10);

    if (!body.username || !body.password) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        password: body.password,
        timestamp: body.timestamp || 0,
        active: 1,
      };
      const result = userModel.loginUser(user);

      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          console.log(`---> userController::login ${result.password}`);
          console.log(`---> userController::login ${body.password}`);

          if (!bcrypt.compareSync(body.password, result.password)) {
            next(HttpError(400, { message: messageapp.user_error_login }));
          } else {
            result.password = newpassword;
            res.status(200).json(result);
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const getGrants = (req, res, next) => {
  console.log("---> userController:getGrants");
  try {
    const body = req.body;

    if (!body.username || !body.grants) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        timestamp: body.timestamp || 0,
        active: 1,
        grants: body.grants,
      };
      const result = userModel.loginUser(user);

      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          result.grants = body.grants;
          userModel.updateUser(result);
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteGrants = (req, res, next) => {
  console.log("---> userController:deleteGrants");
  try {
    const body = req.body;

    if (!body.username || !body.grants) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        timestamp: body.timestamp || 0,
        active: 1,
        grants: body.grants,
      };
      const result = userModel.loginUser(user);
      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          body.grants.forEach((element) => {
            if (result.grants.includes(element))
              result.grants.splice(result.grants.lastIndexOf(element), 1);
          });
          userModel.updateUser(result);
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

const updateGrants = (req, res, next) => {
  console.log("---> userController:updateGrants");
  try {
    const body = req.body;

    if (!body.username || !body.grants) {
      next(HttpError(400, { message: messageapp.parameter_not_especified }));
    } else {
      const user = {
        username: body.username,
        timestamp: body.timestamp || 0,
        active: 1,
        grants: body.grants,
      };
      const result = userModel.loginUser(user);
      if (result === undefined) {
        next(HttpError(400, { message: messageapp.user_error_login }));
      } else {
        if (result.active == 0) {
          next(HttpError(400, { message: messageapp.user_error_login }));
        } else {
          body.grants.forEach((element) => {
            if (!result.grants.includes(element)) result.grants.push(element);
          });
          userModel.updateUser(result);
          res.status(200).json(result);
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  _delete,
  active,
  getUser,
  newPass,
  getGrants,
  deleteGrants,
  updateGrants,
};

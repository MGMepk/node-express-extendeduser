import Router from "express";
import userController from "../controllers/userController.js";
import authHandler from "../middleware/authHandler.js";
import userHandler from "../middleware/userHandler.js";

const router = Router();

router.use((req, res, next) => {
  console.log("---> userRouter.js");
  next();
});

// router.use(userHandler.validateUserEmail);
// router.use(userHandler.validateUserPassword); // Done

const addTimestamp = (req, res, next) => {
  console.log("---> userRouter:addTimestamp");
  req.body.timestamp = new Date();
  next();
};

router
  .route("/register")
  .post(userHandler.validateUserEmail)
  .post(userHandler.validateUserPassword)
  .post(authHandler.encryptPassword)
  .post(addTimestamp)
  .post(userController.register);

router
  .route("/user") // Done
  .delete(userController._delete)
  .put(userController.active);

router
  .route("/grants")
  .post(userController.getGrants)
  .delete(userController.deleteGrants)
  .put(userController.updateGrants);

router
  .route("/newpass") // Done
  .put(userController.newPass);

// Ojo revisar
router.route("/:username")
.get(userController.getUser);

router.route("/login").post(userController.login);

export default router;

const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/user", usersController.usersGet);

module.exports = usersRouter;
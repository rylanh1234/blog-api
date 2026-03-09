const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/user", usersController.usersGet);
usersRouter.get("/posts", usersController.postsGet);
usersRouter.get("/post/:postid", usersController.postByIdGet);

module.exports = usersRouter;
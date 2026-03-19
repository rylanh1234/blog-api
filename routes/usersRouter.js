const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/user", usersController.usersGet);
usersRouter.get("/posts", usersController.postsGet);
usersRouter.get("/posts/:slug", usersController.postBySlugGet);
usersRouter.post("/posts/:slug", usersController.commentPost);

module.exports = usersRouter;
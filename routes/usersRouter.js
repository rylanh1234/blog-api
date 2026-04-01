const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/user", usersController.usersGet);
usersRouter.get("/posts", usersController.postsGet);
usersRouter.get("/posts/:slug", usersController.postBySlugGet);
usersRouter.post("/posts/:slug", usersController.commentPost);
usersRouter.post("/posts", usersController.postsPost);
usersRouter.patch("/posts/:slug", usersController.postsPatch);
usersRouter.patch("/posts/:slug/unpublish", usersController.unpublishPatch);
usersRouter.delete("/posts/:slug", usersController.postDelete);

module.exports = usersRouter;
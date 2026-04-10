const { Router } = require("express");
const pageRouter = Router();
const path = require("node:path");

pageRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/user.html"));
})

pageRouter.get("/create", async (req,res) => {
    res.sendFile(path.join(__dirname, "../public/create.html"));
})

pageRouter.get("/sign-up", async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
})

pageRouter.get("/:slug", async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/post.html"));
})

pageRouter.get("/:slug/edit", async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/edit.html"));
})

module.exports = pageRouter;
const { Router } = require("express");
const pageRouter = Router();
const path = require("node:path");

pageRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/user.html"));
})

module.exports = pageRouter;
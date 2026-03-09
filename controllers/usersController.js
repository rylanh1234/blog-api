exports.usersGet = async (req, res) => {
    const prisma = require("../app");
    const users = await prisma.user.findMany();
    res.json(users);
}

exports.postsGet = async (req, res) => {
    const prisma = require("../app");
    const posts = await prisma.post.findMany();
    res.json(posts);
}

exports.postByIdGet = async (req, res) => {
    const prisma = require("../app");
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
        where: { id: postId }
    });
    res.json(post)
}
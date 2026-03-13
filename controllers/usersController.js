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

exports.postBySlugGet = async (req, res) => {
    const prisma = require("../app");
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
        where: { slug: slug },
        include: { 
            author: true,
            comments: {
                include: { author: true }
            }
        }
    });
    res.json(post);
}
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

exports.commentPost = async (req, res) => {
    const prisma = require("../app");
    const { slug } = req.params;
    const comment = await prisma.post.update({
        where: { slug: slug},
        data: {
            comments: {
                create: [{
                    author: {
                        connect: { id: 1 }
                    },
                    content: req.body.commentText,
                    createdAt: Date()
                }]
            }
        }
    })
    res.json(comment);
}

exports.postsPost = async (req, res) => {
    const prisma = require("../app");
    const post = await prisma.post.create({
        data: {
            author: {
                connect: { id: 1 }
            },
            title: req.body.postTitle,
            content: req.body.postContent,
            published: true,
            createdAt: Date(),
            slug: req.body.postTitle.toLowerCase().replace(" ", "-")
        }
    })
    res.json(post);
}
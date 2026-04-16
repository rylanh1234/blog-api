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
    let publishedStatus = true;
    if (req.body.btnName === "save") {
        publishedStatus = false;
    }
    const post = await prisma.post.create({
        data: {
            author: {
                connect: { id: req.body.authorId }
            },
            title: req.body.postTitle,
            content: req.body.postContent,
            published: publishedStatus,
            createdAt: publishedStatus ? Date() : null, // create date for first publish
            slug: req.body.postTitle.toLowerCase().replace(" ", "-"),
            lastEdited: null
        }
    })
    res.json(post);
}

exports.postsPatch = async (req, res) => {
    const prisma = require("../app");
    let publishedStatus = false;
    let firstPublish = false;
    const { slug } = req.params;
    if (req.body.btnName === "post") {
        publishedStatus = true;
        const firstPublishCheck = await prisma.post.findUnique({
            where: { slug: slug },
            select: { createdAt: true }
        })
        firstPublish = firstPublishCheck.createdAt;
    }
    const post = await prisma.post.update({
        where: { slug: slug },
        data: {
            author: {
                connect: { id: 1 }
            },
            title: req.body.postTitle,
            content: req.body.postContent,
            published: publishedStatus,
            createdAt: firstPublish ? firstPublish : Date(),
            lastEdited: firstPublish ? Date() : null,
            slug: req.body.postTitle.toLowerCase().replace(" ", "-")
        }
    })
    res.json(post);
}

exports.unpublishPatch = async (req, res) => {
    const prisma = require("../app");
    const { slug } = req.params;
    const post = await prisma.post.update({
        where: { slug: slug },
        data: {
            published: false
        }
    })
    res.json(post);
}

exports.postDelete = async (req, res) => {
    const prisma = require("../app");
    const { slug } = req.params;
    const post = await prisma.post.delete({
        where: { slug: slug }
    })
    res.json(post);
}

const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email.";
const pwLengthErr = "must be between 6 and 30 characters.";

const validateUser = [
        //.trim(), .escape(), and .normalizeEmail() to sanitize
        body("userName").trim().escape()
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Name ${lengthErr}`),
        body("email").isEmail().normalizeEmail().withMessage(`Email ${emailErr}`),
        body("password").trim().escape()
        .isLength({ min: 6, max: 30 }).withMessage(`Password ${pwLengthErr}`),
];

exports.usersPost = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors.array());
        }
    
        const { userName, email, password } = matchedData(req);
        const prisma = require("../app");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: userName,
                email: email,
                password: hashedPassword
            }
        })
        res.json(user);
    }
];
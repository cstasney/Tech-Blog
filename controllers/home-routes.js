const router = require('express').Router()
const { Post, Comment, User } = require('../models');
const { findByPk } = require('../models/User');

// render all blog posts to the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        })

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get desired blog post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await findByPk(req.params.id, {
            include: [User, {
                model: Comment,
                include: [User],
            }]
        })
        if (postData) {
            const post = postData.get({ plain: true });

            res.render('single-post', {post});
        } else {
            res.status(404).end
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
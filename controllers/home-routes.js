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

        // if (!req.session.loggedIn) {
        res.render('all-posts', { posts });
        // } else {
        //     res.render('all-posts-admin', {
        //         layout: 'dashboard',
        //         posts,
        //       });
        // }

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

            res.render('single-post', { post });
        } else {
            res.status(404).end
        }

    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});


router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;
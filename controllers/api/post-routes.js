const withAuth = require('../../utils/auth');
const { Post } = require('../../models/');
const { update } = require('../../models/User');
const router = require('express').Router();

router.post('/', withAuth, async (req,res) => {
    const body = req.body
    try {
        const postData = await Post.create({ ...body, userId: req.session.userId});
        res.json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});


router.put('/:id', withAuth, async (req, res) => {
    try {
      const [updatedPost] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (updatedPost > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (postData) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
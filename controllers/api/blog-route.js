const router = require('express').Router();
const { Blog, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// router to create new BLOG
router.post ('/', withAuth, async(req,res) => {
    try {

        const blogInput = {
          title :req.body.title,
          description: req.body.description,
          author_id: req.session.user_id
        }
        
        const blogData = await Blog.create(blogInput);
        res.status(200).json(blogData);
    } catch (err){
        res.status(500).json(err);
    }
});

// router to retrieve a BLOG using its unique id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    const blog = blogData.get({ plain: true });
    console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});


// router to update a BLOG
router.put ('/:id', withAuth, async(req,res) => {
  try {
      const blogInput = {
        title :req.body.title,
        description: req.body.description,
        author_id: req.session.user_id
      }
      
      const blogData = await Blog.update(blogInput,
        {where :
          {id : req.params.id,
          author_id: req.session.user_id,
          },
      });
      if (!blogData) {
        res.status(404).json({ message: 'No blogs found with this id!' });
        return;
      }
      res.status(200).json(blogData);
  } catch(err){
      res.status(500).json(err);
  }
});


//Router to delete a BLOG using its ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          author_id: req.session.user_id,
        },
      });
      if (!blogData) {
        res.status(404).json({ message: 'No blogs found with this id!' });
        return;
      }
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  // router to add comments to a BLOG
router.post('/:id/comment',withAuth, async(req,res) => {
  try {
  
    const commentInput = {
      comment :req.body.description,
      blog_id: req.body.blog_id,
      commenter_id: req.session.user_id
    }  

    const commentData = await Comments.create(commentInput);

    res.status(200).json(commentData);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

  
  module.exports = router;
  
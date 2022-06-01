// importing necessary package
const router = require('express').Router();
const { Blog, User, Comments } = require('../models');
const withAuth = require('../utils/auth');


// Pulling all blogs in the homepage irrespective of the log in status 
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } 
  catch (err) {
    res.status(500).json('errored out');
  }
});

router.get('/blog/post',withAuth, (req,res)=> {
  res.render('blogform');
})

//router for querying a specific id
router.get('/blog/:id', withAuth, async (req, res) => {
 
  try {
    console.log('Retrieve blog comments');
    const blogData = await Blog.findByPk(req.params.id,{
        include : [
          {model: Comments, attributes: ['comment','commenter_id'],
        include: [{model: User, attributes: ['id','name']}, ]
        }]
  
    });
  
    console.log('++ In comment vs update blog ++ ');
    
    const blog = blogData.get({ plain: true });
    console.log(blog);

    const user_comment = blog.comments;
    console.log ('unpacking', user_comment);

    if (blog.author_id == req.session.user_id) {
      res.render('blogedit', {
        blog,
        logged_in: req.session.logged_in
      });
    } else { 
        res.render('blog', {
          blog,
          logged_in: req.session.logged_in
        });
      }
  } catch (err) {
  }
});

//Dashboard 
router.get('/dashboard',withAuth, async(req,res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        author_id: req.session.user_id
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
    res.render('dashboard', { 
      blogs, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {
    res.status(500).json(err);
  }
})

 // If the user is already logged in, redirect the request to homepage else redirect to log in page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Setting up router for signup page 
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});




module.exports = router;

// importing necessary package
const router = require('express').Router();
const { Blog, User, Comments } = require('../models');
const withAuth = require('../utils/auth');
const format_date = require('../utils/helpers');


// Pulling all blogs in the homepage irrespective of the log in status 
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: {model:User, attributes:['name']}
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } 
  catch (err) {
    res.status(500).json('errored out');
  }
});


//Create router to post new blog
router.get('/blog/post',withAuth, (req,res)=> {
  res.render('blogform');
})

//router for querying a specific blog with author, comments and commenter_id using id
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    console.log('Retrieve blog comments');
    const blogData = await Blog.findByPk(req.params.id,{
        include:[{model:User, attributes: ['id','name']},],
        include : [
        {model: Comments, attributes: ['comment','commenter_id', 'date_created'],
        include: [{model: User, attributes: ['id','name']}, ]
        }]
  
    });
    
    const blog = blogData.get({ plain: true });

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
    res.status(500).json(err);
  }
});

//Dashboard 
router.get('/dashboard',withAuth, async(req,res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        author_id: req.session.user_id
      },
      include: {model:User, attributes:['name']}
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

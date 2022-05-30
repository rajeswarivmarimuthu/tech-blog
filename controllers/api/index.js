const router = require('express').Router();

const blogRoutes = require('./blog-route');
const userRoutes = require ('./user-route');

router.use('/blog',blogRoutes );
router.use('/user',userRoutes);

module.exports = router;
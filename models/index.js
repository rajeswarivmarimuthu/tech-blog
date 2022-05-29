const User = require('./user');
const Blog = require('./blog');
const comments = require('./comments');
const Comments = require('./comments');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});


Blog.hasMany(comments, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

comments.belongsToMany(Blog,{
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'  
})


module.exports = { User, Blog };

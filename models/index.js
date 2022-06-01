const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');

User.hasMany(Blog, {
    foreignKey: 'author_id',
    onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
    foreignKey: 'author_id'
});


Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Blog,{
    foreignKey: 'blog_id',
})

User.hasMany(Comments, {
    foreignKey: 'commenter_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(User,
{
    foreignKey: 'commenter_id',
});


module.exports = { User, Blog, Comments };

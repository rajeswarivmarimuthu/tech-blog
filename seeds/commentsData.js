const { Comments } = require('../models');

const commentsData = [
    {
        "comment": "This blog is awesome",
        "blog_id" : 3,
        "commenter_id": 2
    },
    {
        "comment": "Loving the style of writing",
        "blog_id" : 1,
        "commenter_id": 3
    },
    {
        "comment": "Well Articulated",
        "blog_id" : 2,
        "commenter_id": 4
    }
  ];

  const seedComments = () => Comments.bulkCreate(commentsData);

  module.exports = seedComments;
  
const { Blog } = require('../models');

const blogData = [
    {
        "title": "javascript",
        "description" : "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.",
        "author_id": 2
    },
    {
        "title": "Heroku",
        "description" : "Heroku is a cloud platform as a service supporting several programming languages. One of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, Node.js, Scala, Clojure, Python, PHP, and Go.",
        "author_id": 2
    },
    {
        "title": "Java",
        "description" : "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
        "author_id": 2
    }
  ];

  const seedBlogs = () => Blog.bulkCreate(blogData);

  module.exports = seedBlogs;
  
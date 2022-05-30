
// Global variables to identify the blog details
var currentUrl = window.location.pathname;
const parsedCurrentUrl = currentUrl.split('/');
const blog_id = parseInt(parsedCurrentUrl[parsedCurrentUrl.length - 1]);
const req_url = `/api/blog/${blog_id}`

//Handler for updating the blog 
const blogUpdateHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title-keyed').value.trim();
    const description = document.querySelector('#blog-details-keyed').value.trim();

    if (title && description) {
      const response = await fetch(req_url, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
};

//handler to delete the blog

const blogDeleteHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(req_url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } 
    else {
        alert(response.statusText);
    }   
};


document
  .querySelector('.blog-update')
  .addEventListener('click', blogUpdateHandler);


document
  .querySelector('.blog-delete')
  .addEventListener('click', blogDeleteHandler);
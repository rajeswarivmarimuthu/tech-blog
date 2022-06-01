const commentPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const description = document.querySelector('#comment-details-keyed').value.trim();
    var currentUrl = window.location.pathname;
    console.log(currentUrl);

    const parsedCurrentUrl = currentUrl.split('/');
    const blog_id = parseInt(parsedCurrentUrl[parsedCurrentUrl.length - 1]);

    comment_url = `/api/blog/${blog_id}/comment`
    const response = await fetch(comment_url, {
        method: 'POST',
        body: JSON.stringify({ description, blog_id }),
        headers: { 'Content-Type': 'application/json' }
    })
    console.log ('response in submit comment', response)
    if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace(`/blog/${blog_id}`);
      } else {
        alert(response.statusText);
      }

};

document
  .querySelector('.comment-post')
  .addEventListener('submit', commentPostHandler);
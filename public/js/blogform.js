const blogPostHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#blog-title-keyed').value.trim();
    const description = document.querySelector('#blog-details-keyed').value.trim();
  
    if (title && description) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/blog', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('.blog-post')
  .addEventListener('submit', blogPostHandler);

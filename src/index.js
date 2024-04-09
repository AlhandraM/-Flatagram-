// Execute the code once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch image data from the server and update the DOM accordingly
  function getImageData() {
    // Fetch image data from the server
    fetch("http://localhost:3000/images/1")
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Update the title, image source, and like count on the webpage
        document.getElementById("card-title").textContent = data.title;
        document.getElementById("card-image").src = data.image;
        document.getElementById("like-count").textContent =
          data.likes + " likes";

        // Update the comments list with the received comments data
        const commentsList = document.getElementById("comments-list");
        commentsList.innerHTML = ""; // Clear existing comments
        data.comments.forEach((comment) => {
          const li = document.createElement("li"); // Create a new list item for each comment
          li.textContent = comment.content; // Set the content of the list item
          commentsList.appendChild(li); // Add the list item to the comments list
        });
      });

    // Fetch comments data from the server
    fetch("http://localhost:3000/comments")
      .then((response) => response.json()) // Parse the response as JSON
      .then((comments) => {
        // Update the comments list with the received comments data
        const commentsList = document.getElementById("comments-list");
        comments.forEach((comment) => {
          const li = document.createElement("li"); // Create a new list item for each comment
          li.textContent = comment.content; // Set the content of the list item
          commentsList.appendChild(li); // Add the list item to the comments list
        });
      });
  }

  // Call the getImageData function to fetch and display image and comments data
  getImageData();

  // Event listener for the like button click event
  document.getElementById("like-button").addEventListener("click", function () {
    // Increment the like count displayed on the webpage
    const likeCount = document.getElementById("like-count");
    const currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1 + " likes";
  });

  // Event listener for the comment form submission event
  document
    .getElementById("comment-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      // Get the new comment entered by the user
      const newComment = document.getElementById("comment").value;
      // Append the new comment to the comments list on the webpage
      const commentsList = document.getElementById("comments-list");
      const li = document.createElement("li"); // Create a new list item for the comment
      li.textContent = newComment; // Set the content of the list item
      commentsList.appendChild(li); // Add the list item to the comments list
      document.getElementById("comment").value = ""; // Clear the comment input field
    });
});

// Establish a socket connection
const socket = io();


// Event listener for receiving existing comments
socket.on('comments', (comments) => {
  const commentsDiv = document.getElementById('comments');
  comments.forEach((comment) => {
    createCommentElement(comment, commentsDiv);
  });
});

// Event listener for receiving new comments
socket.on('comment', (comment) => {
  const commentsDiv = document.getElementById('comments');
  createCommentElement(comment, commentsDiv);
});

function createCommentElement(comment, parentElement) {
  const existingComment = parentElement.querySelector(`[data-comment-id="${comment.id}"]`);

  if (existingComment) {
    // If the comment already exists, update its content
    existingComment.innerHTML = comment.name + ': ' + comment.comment;
  } else {
    // Otherwise, create a new comment element
    const text = document.createElement('p');
    text.setAttribute('data-comment-id', comment.id);
    text.innerHTML = comment.name + ': ' + comment.comment;
    parentElement.insertBefore(text, parentElement.firstChild);
  }
};

function GetValue() {
  let get = document.getElementById("textarea").value;
  let getName = document.getElementById("usernameField").value;

  if (get !== "" && getName !== "") {
    let text = document.createElement("p");
    text.innerHTML = getName + ": " + get;

    let commentsDiv = document.getElementById("comments");
    commentsDiv.insertBefore(text, commentsDiv.firstChild);

    // Emit the comment to the server
    socket.emit('comment', { name: getName, comment: get });
  } else {
    alert("You must fill all the fields.");
  }
}

// Receive and display comments from the server
socket.on('comments', (comments) => {
  let commentsDiv = document.getElementById("comments");
  comments.forEach((comment) => {
    let text = document.createElement("p");
    text.innerHTML = comment.name + ": " + comment.comment;
    commentsDiv.appendChild(text);
  });
});

// Receive and display new comments from other users
socket.on('comment', (comment) => {
  let commentsDiv = document.getElementById("comments");
  let text = document.createElement("p");
  text.innerHTML = comment.name + ": " + comment.comment;
  commentsDiv.insertBefore(text, commentsDiv.firstChild);
});

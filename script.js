function GetValue() {
  let get = document.getElementById("textarea").value;
  let getName = document.getElementById("usernameField").value;

  if (get !== "" && getName !== "") {
    let text = document.createElement("p");
    text.innerHTML = getName + ": " + get;

    let commentsDiv = document.getElementById("comments");
    commentsDiv.insertBefore(text, commentsDiv.firstChild);

    // Store the comment and username on the server
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: getName, comment: get })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  } else {
    alert("You must fill all the fields.");
  }
}

// Retrieve and display the comments on page load
window.onload = function () {
  fetch('/comments')
    .then(response => response.json())
    .then(comments => {
      let commentsDiv = document.getElementById("comments");
      comments.forEach(comment => {
        let text = document.createElement("p");
        text.innerHTML = comment.name + ": " + comment.comment;
        commentsDiv.appendChild(text);
      });
    })
    .catch(error => console.error(error));
};

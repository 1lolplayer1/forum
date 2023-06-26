function GetValue() {
    let get = document.getElementById("textarea").value;
    let getName = document.getElementById("usernameField").value;

    if (get !== "" && getName !== "") {
        let text = document.createElement("p");
        text.innerHTML = getName + ": " + get;

        let commentsDiv = document.getElementById("comments");
        commentsDiv.insertBefore(text, commentsDiv.firstChild);

        // Store the comment and username in localStorage
        let storedComments = localStorage.getItem("comments");
        let commentsArray = storedComments ? JSON.parse(storedComments) : [];
        commentsArray.unshift({ name: getName, comment: get });
        localStorage.setItem("comments", JSON.stringify(commentsArray));
    } else {
        alert("You must fill all the fields.");
    }
}

// Retrieve and display the comments on page load
window.onload = function () {
  let storedComments = localStorage.getItem("comments");
  if (storedComments) {
    let commentsArray = JSON.parse(storedComments);
    let commentsDiv = document.getElementById("comments");
    for (let i = 0; i < commentsArray.length; i++) {
      let text = document.createElement("p");
      text.innerHTML = commentsArray[i].name + ": " + commentsArray[i].comment;
      commentsDiv.appendChild(text);
    }
  }
};


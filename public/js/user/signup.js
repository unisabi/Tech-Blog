const form = document.getElementById("signup");

const signup = async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  fetch("/api/user", {
    method: "post",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      document.location.replace("/dashboard");
    })
    .catch((err) => console.log(err));
};

form.addEventListener("submit", signup);

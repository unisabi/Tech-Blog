const login = async function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  try {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Login failed. Try again.");
    }

    window.location.replace("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    usernameInput.value = "";
    passwordInput.value = "";
  }
};

document.getElementById("login").addEventListener("submit", login);

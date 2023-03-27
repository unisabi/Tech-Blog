const logout = async () => {
  try {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to log out. Please try again.");
    }

    document.location.replace("/");
  } catch (error) {
    console.error(error);
    alert("error occurred while trying to log out. Try again!");
  }
};

document.getElementById("logout").addEventListener("click", logout);

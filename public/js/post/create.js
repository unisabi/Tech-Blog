const newPost = async (event) => {
  event.preventDefault();
  const body = document
    .querySelector('textarea[name="post-body"]')
    .value.trim();
  const title = document.querySelector('input[name="post-title"]').value.trim();

  if (!title || !body) {
    alert("Enter Title and Body");
    return;
  }
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error");
    }

    document.location.replace("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Error");
  }
};

document.getElementById("create-new-post").addEventListener("submit", newPost);

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const credentials = {
    username: form.username.value,
    password: form.password.value
  };

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  const result = await res.json();

  if (result.success) {
    alert("Login successful!");
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("Invalid username or password.");
  }
});

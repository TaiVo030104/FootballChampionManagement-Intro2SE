const URL =
  "https://footballchampionshipmanagement.onrender.com/api/v1/auth/login";
const loginForm = document.getElementById("login-form");
console.log(loginForm);
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (data.error) {
    alert(data.error);
  } else {
    console.log(data);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "../pages/match.html";
  }
});
async function logout() {
  const response = await fetch(
    "https://footballchampionshipmanagement.onrender.com/api/v1/auth/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await response.json();
  if (data.message === "Logout success") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".item-3");
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    header.innerHTML = `<button class="button" id="logout" style="cursor: pointer" onclick="logout()">Logout</button>`;
  }
});

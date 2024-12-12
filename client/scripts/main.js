async function logout() {
  const response = await fetch("http://localhost:3000/api/v1/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
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
  } else {
    window.location.href = "../pages/login.html";
  }
});

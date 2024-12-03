const API_BASE =
  "https://footballchampionshipmanagement.onrender.com/api/v1/teams";
let teamData = [];
let currentPage = 1;
const teamsPerPage = 8;
let filteredData = [...teamData];

// Logo upload functionality
const logoUploadInput = document.querySelector("#logo-upload");
const logoPreviewArea = document.querySelector("#team-logo-preview"); // Updated reference to the correct ID

logoUploadInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const logoImg = document.createElement("img");
      logoImg.src = reader.result;
      logoImg.classList.add("team-logo-img");
      logoPreviewArea.innerHTML = ""; // Clear existing content
      logoPreviewArea.appendChild(logoImg);
    };
    reader.readAsDataURL(file);
  }
});

// Attach event listener to the SAVE button
document.querySelector(".btn-save").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get values from the input fields
  const teamName = document.querySelector("#team-name").value;
  const homeGround = document.querySelector("#home-ground").value;
  const teamSize = document.querySelector("#team-size").value;

  // Validate required fields
  if (!teamName || !homeGround) {
    alert("Team Name and Home Stadium are required.");
    return;
  }

  const newTeam = {
    teamName: teamName,
    teamLeader: document.querySelector("#team-leader").value, // Optional
    homeGround: homeGround,
    teamSize: teamSize || 16, // Default to 16 if empty
    // teamLogo: logoPreviewArea.querySelector('img') ? logoPreviewArea.querySelector('img').src : null // Optional logo
  };

  // Send POST request to create the team
  createTeam(newTeam);
});

async function createTeam(teamData) {
  // Thử tạo team
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamname: teamData.teamName,
      fieldname: teamData.homeGround,
      // Chỉ gửi các trường cần thiết
    }),
  });

  // Kiểm tra nếu phản hồi không OK
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error creating team:", errorData);
    alert(`Error creating team: ${errorData.message || "Unknown error"}`);
    return;
  }
  if (response.ok) {
    window.location.href = "./team.html"; // Quay lại trang danh sách team
  } else {
    console.error("Có lỗi khi lưu dữ liệu:", response.statusText);
  }

  // Nếu phản hồi thành công
  const newTeam = await response.json();
  console.log("New team created:", newTeam);
  alert("Team created successfully!");

  // Cập nhật dữ liệu và render lại các đội
  filteredData.push(newTeam);
  renderTeams();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTeams();
});

const API_BASE =
  "https://footballchampionshipmanagement.onrender.com/api/v1/teams";
let teamData = [];
let currentPage = 1;
const teamsPerPage = 8;
let filteredData = [...teamData];

// Logo upload functionality
const logoUploadInput = document.querySelector("#logo-upload");
const logoPreviewArea = document.querySelector("#team-logo-preview");

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
    showNotification("Team Name and Home Stadium are required.");
    return;
  }

  const newTeam = {
    teamName: teamName,
    homeGround: homeGround,
    teamSize: teamSize || 16, // Default to 16 if empty
  };

  // Send POST request to create the team
  createTeam(newTeam);
});

async function createTeam(teamData) {
  // Ensure homeGround is provided before making the POST request
  const homeGround = document.querySelector("#home-ground").value;
  if (!homeGround) {
    showNotification("Home Ground is required.");
    return;
  }

  // Send POST request to create the team
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      teamname: teamData.teamName,
      fieldname: homeGround,
      teamSize: teamData.teamSize,
    }),
  });

  // Handle errors from the server
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error creating team:", errorData);
    showNotification(
      `Error creating team: ${errorData.message || "Unknown error"}`
    );
    return;
  }

  // If team is created successfully
  const newTeam = await response.json();
  console.log("New team created:", newTeam);
  showNotification("Team created successfully!");

  // Keep team on current page (assuming the team is already being displayed)
  filteredData.push(newTeam);
  window.location.href = "../pages/team.html";

  renderTeamList(); // Function to update the display with the new team

  // Clear the form and prepare for next entry
  resetForm(); // Reset form after successful team creation

  // Optionally, redirect after successful creation (remove this if not required)
}

// Cancel button functionality to reset form
document
  .querySelector(".btn-cancel")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent any default behavior
    resetForm(); // Reset the form fields
  });

// Function to reset the form inputs
function resetForm() {
  document.querySelector("#team-name").value = "";
  document.querySelector("#home-ground").value = "";
  document.querySelector("#team-size").value = "";
  logoPreviewArea.innerHTML = ""; // Clear logo preview
}

function showNotification(message, type = "success") {
  const container = document.getElementById("notification-container");
  if (!container) {
    console.error("Notification container is missing.");
    return;
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerText = message;

  container.appendChild(notification);

  // Automatically remove notification after 4 seconds
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

// Function to render the updated team list (for pagination or immediate display)
function renderTeamList() {
  const teamListContainer = document.querySelector("#team-list-container");
  teamListContainer.innerHTML = ""; // Clear existing list

  const teamsToRender = filteredData.slice(
    (currentPage - 1) * teamsPerPage,
    currentPage * teamsPerPage
  );
  teamsToRender.forEach((team) => {
    const teamElement = document.createElement("div");
    teamElement.classList.add("team");
    teamElement.innerHTML = `
      <h3>${team.teamName}</h3>
      <p>${team.homeGround}</p>
      <p>Size: ${team.teamSize}</p>
    `;
    teamListContainer.appendChild(teamElement);
  });
}

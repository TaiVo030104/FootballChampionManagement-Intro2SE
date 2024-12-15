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
  // const homeGround = document.querySelector('#home-ground').value;
  const teamSize = document.querySelector("#team-size").value;

  // Validate required fields
  if (!teamName) {
    showNotification("Team Name and Home Stadium are required.");
    return;
  }

  const newTeam = {
    teamName: teamName,
    // teamLeader: document.querySelector('#team-leader').value, // Optional
    // homeGround: homeGround,
    teamSize: teamSize || 16, // Default to 16 if empty
    // teamLogo: logoPreviewArea.querySelector('img') ? logoPreviewArea.querySelector('img').src : null // Optional logo
  };

  // Send POST request to create the team
  createTeam(newTeam);
});

async function createTeam(teamData) {
  const homeGround = document.querySelector("#home-ground").value; // Capture home ground from the form

  // Ensure homeGround is provided before making the POST request
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
      fieldname: homeGround, // Correct field name
      teamSize: teamData.teamSize, // Include teamSize if needed
      // If you plan to include a logo, uncomment the following line
      // teamLogo: teamData.teamLogo
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
  // window.location.href = "../pages/team.html"; // Redirect to team page
  // Optionally, update the team list or render new data
  filteredData.push(newTeam);
  cancelForm();
}
function cancelForm() {
  // Clear the form fields
  document.querySelector("#team-name").value = "";
  document.querySelector("#home-ground").value = "";
  document.querySelector("#team-size").value = 16;

  // Clear the logo preview
  logoPreviewArea.innerHTML = "";

  // Optionally, reset any other inputs or settings if needed
  // For example, reset a drop-down list:
  // document.querySelector("#team-leader").selectedIndex = 0; 
}

document.querySelector(".btn-cancel").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default action
  cancelForm(); // Call the cancel function
});

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
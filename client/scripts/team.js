const API_BASE =
  "https://footballchampionshipmanagement.onrender.com/api/v1/teams";

let teamData = [];
let currentPage = 1;
const teamsPerPage = 8;
let filteredData = [];

// Fetch teams data from API
async function fetchTeams() {
  try {
    const response = await fetch(`${API_BASE}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    teamData = data.data.teams.map((team) => ({
      id: team.teamid || "N/A", // Ensure the teamid is used for the id
      teamName: team.teamname || "N/A",
      teamLeader: "N/A",
      homeGround: team.fieldname || "N/A",
      teamSize: "N/A",
    }));

    // Sort teams by teamId (id can be numeric or string)
    teamData.sort((a, b) => a.id - b.id); // Sort ascending, modify if you need descending
    filteredData = [...teamData]; // Keep filteredData in sync

    renderTable(currentPage, filteredData);
    updatePagination(filteredData);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
}

// Render table with pagination
function renderTable(page, data) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";

  const startIndex = (page - 1) * teamsPerPage;
  const pageTeams = data.slice(startIndex, startIndex + teamsPerPage);

  pageTeams.forEach((team, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${team.id}</td>
            <td>${team.teamName}</td>
            <td>${team.teamLeader}</td>
            <td>${team.homeGround}</td>
            <td>${team.teamSize}</td>
            <td class="team-actions">
                <div class="actions">
                    <span class="edit-icon" onclick="editItem(${
                      startIndex + index
                    })">
                        <img src="../assets/images/team/edit.svg" alt="Edit">
                    </span>
                    <span class="delete-icon" onclick="deleteItem(${
                      startIndex + index
                    })">
                        <img src="../assets/images/team/delete.svg" alt="Delete">
                    </span>
                </div>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    filteredData = teamData.filter((item) =>
      item.teamName.toLowerCase().includes(query)
    );

    // Sort filtered data by teamId after search
    filteredData.sort((a, b) => a.id - b.id); // Sort ascending, modify if you need descending

    currentPage = 1;
    renderTable(currentPage, filteredData);
    updatePagination(filteredData);
  });
}

// Update pagination controls
function updatePagination(data) {
  const pagination = document.querySelector(
    ".pagination.home-product__pagination"
  );
  pagination.innerHTML = ""; // Clear previous pagination

  const totalPages = Math.ceil(data.length / teamsPerPage); // Total pages based on filtered data length

  // Previous button
  if (currentPage > 1) {
    pagination.innerHTML += `
            <li class="pagination-item">
                <a href="#" class="pagination-link" onclick="changePage(${
                  currentPage - 1
                })">
                    &lt;
                </a>
            </li>`;
  }

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
            <li class="pagination-item ${i === currentPage ? "active" : ""}">
                <a href="#" class="pagination-link" onclick="changePage(${i})">${i}</a>
            </li>`;
  }

  // Next button
  if (currentPage < totalPages) {
    pagination.innerHTML += `
            <li class="pagination-item">
                <a href="#" class="pagination-link" onclick="changePage(${
                  currentPage + 1
                })">
                    &gt;
                </a>
            </li>`;
  }
}

// Change page functionality
// function changePage(page) {
//   const totalPages = Math.ceil(filteredData.length / teamsPerPage); // Recalculate total pages based on filtered data
//   if (page < 1 || page > totalPages) return; // Don't allow out of bounds pages

//   currentPage = page; // Update current page
//   renderTable(currentPage, filteredData); // Re-render the table
//   updatePagination(filteredData); // Update pagination controls
// }

// Delete team item
// async function deleteItem(index) {
//   const teamId = teamData[index].id;

//   try {
//     const response = await fetch(`${API_BASE}/${teamId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     if (response.ok) {
//       showNotification("Team deleted successfully!");
//       teamData.splice(index, 1);
//       filteredData = [...teamData];

//       // Update current page if necessary (handle page out of bounds)
//       const totalPages = Math.ceil(filteredData.length / teamsPerPage);
//       if (currentPage > totalPages) {
//         currentPage = totalPages; // Go to the last page if the current one is empty
//       }

//       renderTable(currentPage, filteredData); // Re-render the table with the updated data
//       updatePagination(filteredData); // Update pagination
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to delete team:", response.status, errorData);
//       showNotification(errorData.message, "error");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     showNotification("Failed to delete the team.", "error");
//   }
// }

// Change page functionality
function changePage(page) {
  currentPage = page; // Update current page
  renderTable(currentPage, filteredData); // Re-render the table
  updatePagination(filteredData); // Update pagination
}

// Delete team item
async function deleteItem(index) {
  const teamId = teamData[index].id;

  try {
    const response = await fetch(`${API_BASE}/${teamId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      showNotification("Team deleted successfully!", "success");
      teamData.splice(index, 1);
      filteredData = [...teamData];

      // Update current page if necessary
      const totalPages = Math.ceil(filteredData.length / teamsPerPage);
      if (currentPage > totalPages) {
        currentPage = totalPages; // Go to the last page if the current one is empty
      }

      renderTable(currentPage, filteredData);
      updatePagination(filteredData);
    } else {
      const errorData = await response.json();
      console.error("Failed to delete team:", response.status, errorData);
      showNotification(errorData.message, "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Failed to delete the team.", "error");
  }
}

// Edit team item
function editItem(index) {
  const team = teamData[index];
  const row = document.querySelectorAll("table tbody tr")[index % teamsPerPage];
  row.innerHTML = `
  <td>${team.id}</td>
  <td><input type="text" value="${team.teamName}" id="edit-teamName-${index}" autofocus></td>
  <td><input type="text" value="${team.teamLeader}" id="edit-teamLeader-${index}"></td>
  <td><input type="text" value="${team.homeGround}" id="edit-homeGround-${index}"></td>
  <td><input type="text" value="${team.teamSize}" id="edit-teamSize-${index}"></td>
  <td class="team-actions">
      <button class="btn btn-save" onclick="saveEdit(${index})">Save</button>
      <button class="btn btn-cancel" onclick="fetchTeams()">Cancel</button>
  </td>
`;

  // Optionally set the cursor at the end of text in the first input field
  const inputField = document.getElementById(`edit-teamName-${index}`);
  if (inputField) {
    const valueLength = inputField.value.length;
    inputField.focus(); // Focus on the input
    inputField.setSelectionRange(valueLength, valueLength); // Place cursor at the end
  }
}

// Save edited team
async function saveEdit(index) {
  const teamId = teamData[index].id;
  const updatedTeam = {
    teamname: document.getElementById(`edit-teamName-${index}`).value,
    fieldname: document.getElementById(`edit-homeGround-${index}`).value,
  };

  try {
    const response = await fetch(`${API_BASE}/${teamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTeam),
    });

    if (response.ok) {
      showNotification("Team updated successfully!", "success");
      fetchTeams(); // Refresh the table
    } else {
      const errorData = await response.json();
      console.error("Failed to update team:", errorData);
      showNotification(errorData.message, "error");
    }
  } catch (error) {
    console.error("Error updating the team:", error);
    showNotification("Failed to update the team.", "error");
  }
}

// Initialize
window.onload = () => {
  fetchTeams();
  setupSearch();
};

function showNotification(message, type) {
  const container = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerText = message;

  container.appendChild(notification);

  // Automatically remove notification after 4 seconds
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

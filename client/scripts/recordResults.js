document.addEventListener("DOMContentLoaded", async () => {
  const API_URL =
    "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
  const PLAYERS_API_URL =
    "https://footballchampionshipmanagement.onrender.com/api/v1/players";
  const GOALS_API_URL =
    "https://footballchampionshipmanagement.onrender.com/api/v1/goals";
  const matchId = new URLSearchParams(window.location.search).get("id");
  let goals = [];
  let currentPage = 1;
  const goalsPerPage = 7;
  if (!matchId) {
    console.error("No match ID provided in the URL.");
    return;
  }

  async function fetchPlayers(team1Name, team2Name) {
    try {
      const response = await fetch(PLAYERS_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (
        data.status !== "success" ||
        !data.data ||
        !Array.isArray(data.data.players)
      ) {
        console.error(
          "Unexpected response format or players list is missing:",
          data
        );
        return {};
      }

      const playersMap = data.data.players.reduce((map, player) => {
        const playerTeamName = player.team.teamname;
        if (playerTeamName === team1Name || playerTeamName === team2Name) {
          map[player.playername] = {
            playerid: player.playerid,
            team: playerTeamName,
          };
        }
        return map;
      }, {});

      console.log("Filtered Players Map:", playersMap);
      return playersMap;
    } catch (error) {
      console.error("Error fetching players data:", error);
      return {};
    }
  }

  async function fetchMatchDetails() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      const matches = data.data.matches || [];

      const match = matches.find((m) => m.matchid == matchId);

      if (!match) {
        console.error(`No match found with ID ${matchId}`);
        return null;
      }

      document.getElementById("teamA-input").textContent = match.team1.teamname;
      document.getElementById("teamB-input").textContent = match.team2.teamname;
      document.getElementById("round-info").value = match.roundcount;
      document.getElementById("date-info").value = match.matchdate;
      document.getElementById("time-info").value = match.matchtime;
      document.getElementById("stage-info").value = match.fieldname;

      // Lưu thông tin team vào global object
      window.matchDetails = {
        team_team1: match.team1.teamid,
        team_team2: match.team2.teamid,
        team1Name: match.team1.teamname,
        team2Name: match.team2.teamname,
      };

      return window.matchDetails;
    } catch (error) {
      console.error("Error fetching match data:", error);
      return null;
    }
  }
  async function fetchPlayers(team1Name, team2Name) {
    try {
      const response = await fetch(PLAYERS_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      const playersMap = data?.data?.players?.reduce((map, player) => {
        const playerTeamName = player.team?.teamname;
        if (playerTeamName === team1Name || playerTeamName === team2Name) {
          map[player.playername] = {
            playerid: player.playerid,
            team: playerTeamName,
          };
        }
        return map;
      }, {});

      return playersMap || {};
    } catch (error) {
      console.error("Error fetching players data:", error);
      return {};
    }
  }
  async function fetchGoals(matchId) {
    try {
      const response = await fetch(`${GOALS_API_URL}/${matchId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("Full response from fetchGoals:", data);

      // Directly access the goals array
      if (data && data.goals) {
        goals = data.goals; // Lưu dữ liệu vào biến toàn cục
        renderGoalsTable(goals); // Render chỉ sau khi dữ liệu được fetch
      } else {
        console.error("No goals found in response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching goals data:", error);
      return [];
    }
  }
  function renderGoalsTable(goals) {
    const goalsTableBody = document.getElementById("goals-table-body");
    goalsTableBody.innerHTML = ""; // Clear table trước khi render mới

    // Tính khoảng index dữ liệu cần hiển thị
    const startIndex = (currentPage - 1) * goalsPerPage;
    const endIndex = Math.min(startIndex + goalsPerPage, goals.length);

    // Duyệt qua mục trong khoảng cần hiển thị
    for (let i = startIndex; i < endIndex; i++) {
      const goal = goals[i];
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${i + 1}</td>
        <td>${goal.player.playername}</td>
        <td>${goal.player.team.teamname}</td>
        <td>${goal.goaltype}</td>
        <td>${goal.goaltime}</td>
        <td><button class="btn-remove"><i class="trash-btn fas fa-trash"></i></button></td>
      `;
      goalsTableBody.appendChild(newRow);
    }

    renderPagination(goals.length);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / goalsPerPage);
    const paginationContainer = document.querySelector(
      ".home-product__pagination"
    );
    paginationContainer.innerHTML = ""; // Clear pagination trước khi render mới

    // Tạo nút Previous
    const prevPage = document.createElement("li");
    prevPage.classList.add("pagination");
    prevPage.innerHTML = `<a href="#" class="pagination-link"><i class="pagination-icon fas fa-angle-left"></i></a>`;
    prevPage.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderGoalsTable(goals);
      }
    });
    paginationContainer.appendChild(prevPage);

    // Tạo nút số trang
    for (let i = 1; i <= totalPages; i++) {
      const page = document.createElement("li");
      page.classList.add("pagination");
      if (i === currentPage) page.classList.add("pagination-active");
      page.innerHTML = `<a href="#" class="pagination-link">${i}</a>`;
      page.addEventListener("click", () => {
        currentPage = i;
        renderGoalsTable(goals);
      });
      paginationContainer.appendChild(page);
    }

    // Tạo nút Next
    const nextPage = document.createElement("li");
    nextPage.classList.add("pagination");
    nextPage.innerHTML = `<a href="#" class="pagination-link"><i class="pagination-icon fas fa-angle-right"></i></a>`;
    nextPage.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderGoalsTable(goalsoals);
      }
    });
    paginationContainer.appendChild(nextPage);
  }

  const matchDetails = await fetchMatchDetails();

  if (matchDetails) {
    const goals = await fetchGoals(matchId);

    window.playersMap = await fetchPlayers(
      matchDetails.team1Name,
      matchDetails.team2Name
    );
  } else {
    console.error("Failed to fetch match details. Cannot fetch players.");
  }

  let serialNumber = goals.length + 1;

  console.log("Current number of goals in the array:", goals.length);
  const addButton = document.querySelector(".btn-add");
  const playerTableBody = document.getElementById("goals-table-body");

  function attachTimeInputHandler(input) {
    input.addEventListener("input", () => {
      let value = input.value;
      value = value.replace(/[^0-9:]/g, "");
      const parts = value.split(":");
      if (parts.length > 3) parts.length = 3;
      const formattedParts = parts.map((part) => part.slice(0, 2));
      value = formattedParts.join(":");
      input.value = value;
    });
  }

  function attachPlayerChangeHandler(playerDropdown, teamDisplay) {
    playerDropdown.addEventListener("change", () => {
      const playerName = playerDropdown.value;
      const playerData = window.playersMap[playerName];

      if (playerData) {
        teamDisplay.value = playerData.team || "";
      } else {
        teamDisplay.value = "";
      }
    });
  }

  addButton.addEventListener("click", () => {
    if (Object.keys(window.playersMap).length === 0) {
      console.error("Players list is not available:", window.playersMap);
      return;
    }

    const newRow = document.createElement("tr");
    const playerDropdown = `
      <select class="player-name">
        <option value="">Select Player</option>
        ${Object.keys(window.playersMap)
          .map(
            (playerName) =>
              `<option value="${playerName}">${playerName}</option>`
          )
          .join("")}
      </select>`;
    const goalTypeDropdown = `
      <select class="goal-type">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>`;
    newRow.innerHTML = `
      <td><input type="text" class="serial-number" value="${serialNumber}" readonly /></td>
      <td>${playerDropdown}</td>
      <td><input type="text" class="team-name" readonly /></td>
      <td>${goalTypeDropdown}</td>
      <td><input type="text" class="time" placeholder="hh:mm:ss" maxlength="8" /></td>
      <td><button class="btn-remove"><i class="trash-btn fas fa-trash"></i></button></td>
    `;

    playerTableBody.appendChild(newRow);
    serialNumber++;
    const playerDropdownElement = newRow.querySelector(".player-name");
    const teamDisplayElement = newRow.querySelector(".team-name");
    const timeInput = newRow.querySelector(".time");
    attachPlayerChangeHandler(playerDropdownElement, teamDisplayElement);
    attachTimeInputHandler(timeInput);
  });

  playerTableBody.addEventListener("click", async (event) => {
    const target = event.target;

    if (
      target.classList.contains("trash-btn") ||
      target.closest(".btn-remove")
    ) {
      const row = target.closest("tr");
      const goalTimeInput = row.children[4].textContent.trim();
      console.log("Row HTML:", row.innerHTML);
      console.log("Goal Time Input:", goalTimeInput);
      if (goalTimeInput) {
        const deleteGoalUrl = `${GOALS_API_URL}/${matchId}/${goalTimeInput}`;

        try {
          const response = await fetch(deleteGoalUrl, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            console.log("Goal deleted successfully:", goalTimeInput.value);

            playerTableBody.removeChild(row);
            window.location.reload();
          } else {
            console.error("Failed to delete goal:", await response.text());
          }
        } catch (error) {
          console.error("Error deleting goal data:", error);
        }
      } else {
        console.error("Invalid goal time for deletion");
      }
    }
  });

  const saveButton = document.querySelector(".btn-save");
  saveButton.addEventListener("click", async () => {
    const rows = document.querySelectorAll("#goals-table-body tr");
    let goalData = [];

    Array.from(rows).forEach((row) => {
      const playerDropdown = row.querySelector(".player-name");
      const playerId =
        playerDropdown?.value &&
        window.playersMap[playerDropdown.value]?.playerid;
      const goalTimeInput = row.querySelector(".time");
      const goalTypeDropdown = row.querySelector(".goal-type");

      if (playerId && goalTimeInput?.value && goalTypeDropdown?.value) {
        goalData = {
          player_playerid: playerId,
          match_matchid: matchId,
          goaltime: goalTimeInput.value,
          goaltype: goalTypeDropdown.value,
        };
      }
    });

    const matchUpdateData = {
      matchdate: document.getElementById("date-info").value,
      matchtime: document.getElementById("time-info").value,
    };

    console.log("Match Update Data:", matchUpdateData);
    console.log("Goal Data:", goalData);

    try {
      await fetch(`${API_URL}/${matchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(matchUpdateData),
      });

      await fetch(`${GOALS_API_URL}/${matchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(goalData),
      });

      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  });
});

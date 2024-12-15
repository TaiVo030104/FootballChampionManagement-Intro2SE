document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
  const PLAYERS_API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/players";
  const matchId = new URLSearchParams(window.location.search).get("id");

  if (!matchId) {
    console.error("No match ID provided in the URL.");
    return;
  }


  async function fetchPlayers() {
    try {
      const response = await fetch(PLAYERS_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (data.status !== "success" || !data.data || !Array.isArray(data.data.players)) {
        console.error("Unexpected response format or players list is missing:", data);
        return {};
      }

      const playersMap = data.data.players.reduce((map, player) => {
        map[player.playername] = {
          playerid: player.playerid, 
          team: player.team.teamname,    
        };
        return map;
      }, {});

      console.log("Players map:", playersMap);
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
        return;
      }
      document.getElementById("teamA-input").textContent = match.team1.teamname; 
      document.getElementById("teamB-input").textContent = match.team2.teamname; 
      document.getElementById("round-info").value = match.roundcount; 
      document.getElementById("date-info").value = match.matchdate;   
      document.getElementById("time-info").value = match.matchtime;   
      document.getElementById("stage-info").value = match.fieldname;  

      window.teamNames = [match.team1.teamname, match.team2.teamname];
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  }

  window.playersMap = await fetchPlayers();
  fetchMatchDetails();

  let serialNumber = 1; 
  const addButton = document.querySelector(".btn-add");
  const playerTableBody = document.getElementById("player-table-body");

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
          .map((playerName) => `<option value="${playerName}">${playerName}</option>`)
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

    const removeButton = newRow.querySelector(".btn-remove");
    removeButton.addEventListener("click", () => {
      playerTableBody.removeChild(newRow);
    });

    const playerDropdownElement = newRow.querySelector(".player-name");
    const teamDisplayElement = newRow.querySelector(".team-name");
    const timeInput = newRow.querySelector(".time");
    attachPlayerChangeHandler(playerDropdownElement, teamDisplayElement);
    attachTimeInputHandler(timeInput);
  });

  const saveButton = document.querySelector(".btn-save");
  saveButton.addEventListener("click", async () => {
    const rows = document.querySelectorAll("#player-table-body tr");
    const goalData = {};
    Array.from(rows).forEach((row, index) => {
      const playerName = row.querySelector(".player-name").value;
      const playerId = window.playersMap[playerName]?.playerid;
      const goalTime = row.querySelector(".time").value;
      const goalType = row.querySelector(".goal-type").value;
  
      goalData[index + 1] = {
        player_playerid: playerId,
        match_matchid: matchId,
        goaltime: goalTime,
        goaltype: goalType,
      };
    });
  
    const matchUpdateData = {
      teamA: document.getElementById("teamA-input").textContent,
      teamB: document.getElementById("teamB-input").textContent,
      round: document.getElementById("round-info").value,
      date: document.getElementById("date-info").value,
      time: document.getElementById("time-info").value,
      stage: document.getElementById("stage-info").value,
    };
  
    
  
    console.log("Match Update Data:", matchUpdateData);
    console.log("Goal Data:", goalData);
  
    try {

      const matchResponse = await fetch(`${API_URL}/${matchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(matchUpdateData),
      });
  
      if (!matchResponse.ok) {
        console.error("Failed to update match:", matchResponse.statusText);
      } else {
        console.log("Match updated successfully");
      }
  

      const goalResponse = await fetch(`https://footballchampionshipmanagement.onrender.com/api/v1/goals/${matchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(goalData),
      });
  
      if (!goalResponse.ok) {
        console.error("Failed to save goal data:", goalResponse.statusText);
      } else {
        console.log("Goals saved successfully");
        alert("Match and goals have been updated successfully!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving data.");
    }
  });
});

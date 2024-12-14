document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
  const PLAYERS_API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/players";
  const matchId = new URLSearchParams(window.location.search).get("id");

  if (!matchId) {
    console.error("No match ID provided in the URL.");
    return;
  }

  // Fetch thông tin cầu thủ và tạo mapping playername -> playerid
  async function fetchPlayers() {
    try {
      const response = await fetch(PLAYERS_API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log("Response data:", data);

      // Kiểm tra cấu trúc dữ liệu trả về và lấy danh sách cầu thủ từ `data.data.players`
      if (data.status !== "success" || !data.data || !Array.isArray(data.data.players)) {
        console.error("Unexpected response format or players list is missing:", data);
        return {};
      }

      // Lưu danh sách cầu thủ vào playersMap: playername -> playerid
      const playersMap = data.data.players.reduce((map, player) => {
        map[player.playername] = player.playerid; // Tạo map playername -> playerid
        return map;
      }, {});

      console.log("Players map:", playersMap);
      return playersMap;
    } catch (error) {
      console.error("Error fetching players data:", error);
      return {};
    }
  }

  // Fetch và hiển thị thông tin trận đấu
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

      // Hiển thị thông tin trận đấu lên giao diện
      document.getElementById("teamA-input").textContent = match.team1.teamname; // Team A
      document.getElementById("teamB-input").textContent = match.team2.teamname; // Team B
      document.getElementById("round-info").value = match.roundcount; // Round
      document.getElementById("date-info").value = match.matchdate;   // Date
      document.getElementById("time-info").value = match.matchtime;   // Time
      document.getElementById("stage-info").value = match.fieldname;  // Stage

      // Lưu tên đội để dùng cho dropdown trong bảng
      window.teamNames = [match.team1.teamname, match.team2.teamname];
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  }

  // Lấy danh sách cầu thủ và lưu vào `window.playersMap`
  window.playersMap = await fetchPlayers();
  fetchMatchDetails();

  let serialNumber = 1; // Biến này sẽ tự động tăng lên khi thêm hàng mới
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

      if (formattedParts.length === 3 && formattedParts.join(":").length === 8) {
        console.log("Hợp lệ:", value);
      } else {
        console.log("Đang nhập:", value);
      }
    });
  }

  // Thêm hàng vào bảng
  addButton.addEventListener("click", () => {
    if (Object.keys(window.playersMap).length === 0) {
      console.error("Players list is not available:", window.playersMap);
      return; // Dừng nếu không có cầu thủ
    }

    const newRow = document.createElement("tr");

    // Tạo dropdown để chọn tên cầu thủ
    const playerDropdown = `
      <select class="player-name">
        <option value="">Select Player</option>
        ${Object.keys(window.playersMap)
          .map((playerName) => `<option value="${playerName}">${playerName}</option>`)
          .join("")}
      </select>`;

    const teamDropdown = `
      <select class="team-name">
        <option value="">Select Team</option>
        ${window.teamNames
          .map((teamName) => `<option value="${teamName}">${teamName}</option>`)
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
      <td>${teamDropdown}</td>
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

    const timeInput = newRow.querySelector(".time");
    attachTimeInputHandler(timeInput);
  });

  // Lưu dữ liệu
  const saveButton = document.querySelector(".btn-save");
  saveButton.addEventListener("click", async () => {
    const rows = document.querySelectorAll("#player-table-body tr");
    const goalData = Array.from(rows).map((row) => {
      const playerName = row.querySelector(".player-name").value;
      const playerId = window.playersMap[playerName]; // Lấy playerid từ playersMap
      const goalTime = row.querySelector(".time").value;
      const goalType = row.querySelector(".goal-type").value;

      return {
        player_playerid: playerId,   // playerid thay vì playername
        match_matchid: matchId,      // Match ID
        goaltime: goalTime,          // Thời gian ghi bàn
        goaltype: goalType           // Loại bàn thắng
      };
    });

    // Kiểm tra nếu playername bị bỏ trống
    const invalidPlayer = goalData.find((data) => !data.player_playerid);
    if (invalidPlayer) {
      console.error("Player not selected for row:", invalidPlayer);
      alert("Please select a player for all rows.");
      return; // Dừng lại nếu có dòng chưa chọn cầu thủ
    }
    console.log("Goal Data to be saved:", goalData);
    try {
      const response = await fetch(
        `https://footballchampionshipmanagement.onrender.com/api/v1/goals/${matchId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(goalData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
      } else {
        console.error("Failed to save goal data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving goal data:", error);
    }
  });
});

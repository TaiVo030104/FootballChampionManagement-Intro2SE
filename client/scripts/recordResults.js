document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
  const matchId = new URLSearchParams(window.location.search).get("id");

  if (!matchId) {
    console.error("No match ID provided in the URL.");
    return;
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
      document.getElementById("teamA-input").value = match.team1.teamname; // Team A
      document.getElementById("teamB-input").value = match.team2.teamname; // Team B
      document.getElementById("round-info").textContent = match.roundcount; // Round
      document.getElementById("date-info").textContent = match.matchdate;   // Date
      document.getElementById("time-info").textContent = match.matchtime;   // Time
      document.getElementById("stage-info").textContent = match.fieldname;  // Stage

      // Lưu tên đội để dùng cho dropdown trong bảng
      window.teamNames = [match.team1.teamname, match.team2.teamname];
    } catch (error) {
      console.error("Error fetching match data:", error);
    }
  }

  fetchMatchDetails();

  // Thêm hàng vào bảng
  const addButton = document.querySelector(".btn-add");
  const playerTableBody = document.getElementById("player-table-body");

  addButton.addEventListener("click", () => {
    const newRow = document.createElement("tr");

    // Tạo dropdown để chọn tên đội
    const teamDropdown = `
      <select class="team-name">
        <option value="">Select Team</option>
        ${window.teamNames
          .map((teamName) => `<option value="${teamName}">${teamName}</option>`)
          .join("")}
      </select>`;

    newRow.innerHTML = `
      <td><input type="text" class="serial-number" /></td>
      <td><input type="text" class="player-name" /></td>
      <td>${teamDropdown}</td>
      <td><input type="text" class="role-type" /></td>
      <td><input type="text" class="time" /></td>
      <td><button class="btn-remove"><i class="trash-btn fas fa-trash"></i></button></td>
    `;
    playerTableBody.appendChild(newRow);

    // Thêm sự kiện "Xóa" cho nút Remove
    const removeButton = newRow.querySelector(".btn-remove");
    removeButton.addEventListener("click", () => {
      playerTableBody.removeChild(newRow);
    });
  });

  // Lưu dữ liệu
  const saveButton = document.querySelector(".btn-save");
  saveButton.addEventListener("click", async () => {
    const rows = document.querySelectorAll("#player-table-body tr");
    const goalData = Array.from(rows).map((row) => ({
      serialnumber: row.querySelector(".serial-number").value,
      playername: row.querySelector(".player-name").value,
      teamname: row.querySelector(".team-name").value,
      goaltype: row.querySelector(".role-type").value,
      goaltime: row.querySelector(".time").value,
    }));

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

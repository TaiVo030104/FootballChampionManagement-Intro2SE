document.addEventListener("DOMContentLoaded", () => {
  const API_URL =
    "https://footballchampionshipmanagement.onrender.com/api/v1/matches?sort=matchid";
  const matchContainer = document.querySelector(".match-container");

  // Fetch dữ liệu từ API và hiển thị
  async function fetchAndDisplayMatches() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      const matches = data.data.matches || [];

      matchContainer.innerHTML = ""; // Xóa nội dung cũ

      if (matches.length === 0) {
        const autoMatchButton = document.createElement("button");
        autoMatchButton.textContent = "Auto Match Team";
        autoMatchButton.classList.add("auto-match-btn");
        autoMatchButton.style.margin = "auto";
        autoMatchButton.style.display = "block";
        autoMatchButton.style.cursor = "pointer";
        autoMatchButton.style.padding = "10px 20px";
        autoMatchButton.style.backgroundColor = "#3D8361";
        autoMatchButton.style.color = "white";
        autoMatchButton.style.borderRadius = "5px";
        autoMatchButton.addEventListener("click", autoMatchTeams);
        matchContainer.appendChild(autoMatchButton);
      } else {
        matches.forEach((match) => {
          const matchCard = document.createElement("div");
          matchCard.classList.add("match-card");

          const score1 = match.score1 ?? "-";
          const score2 = match.score2 ?? "-";

          matchCard.innerHTML = `
          <div class="team">
              <span>${match.team1.teamname}</span>
              <span class="score">${score1}</span>
              <i class="trash-btn fas fa-trash"></i>
          </div>
          <div class="team">
              <span>${match.team2.teamname}</span>
              <span class="score">${score2}</span>
              <a href="../pages/recordResults.html?id=${match.matchid}">
                  <i class="edit-btn fas fa-edit"></i>
              </a>
          </div>
      `;
          matchContainer.appendChild(matchCard);
        });
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }
  async function autoMatchTeams() {
    try {
      const response = await fetch(
        "https://footballchampionshipmanagement.onrender.com/api/v1/matches/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        // Fetch lại danh sách matches sau khi POST thành công
        fetchAndDisplayMatches();
      } else {
        console.error("Error auto matching teams:", response.statusText);
      }
    } catch (error) {
      console.error("Error auto matching teams:", error);
    }
  }

  fetchAndDisplayMatches();
});

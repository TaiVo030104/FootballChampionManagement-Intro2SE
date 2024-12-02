const URL_RULES =
  "https://footballchampionshipmanagement.onrender.com/api/v1/rules";

let originalValues = [];

function toggleEditMode() {
  const inputs = document.querySelectorAll(".rule-form input");
  const editButton = document.querySelector(".edit-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const modeRule = document.querySelector(".view_rules h2");

  if (editButton.textContent === "EDIT") {
    originalValues = Array.from(inputs).map((input) => input.value);
    inputs.forEach((input) => {
      input.removeAttribute("readonly");
      input.classList.add("editable");
    });
    editButton.textContent = "SAVE";
    cancelButton.style.display = "inline";
    modeRule.textContent = "EDIT RULE";
  } else {
    saveData();
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
      input.classList.remove("editable");
    });
    editButton.textContent = "EDIT";
    cancelButton.style.display = "none";
    modeRule.textContent = "VIEW RULE";
  }
}

function cancelEdit() {
  const inputs = document.querySelectorAll(".rule-form input");
  inputs.forEach((input, index) => {
    input.value = originalValues[index];
  });
  toggleEditMode();
}

// Hàm để tải dữ liệu từ json-server
async function loadData() {
  try {
    const response = await fetch(URL_RULES);
    const data = await response.json();

    // Gán giá trị từ JSON vào các ô input
    document.getElementById("pointsForWin").value = data.pointsForWin;
    document.getElementById("pointsForLoss").value = data.pointsForLoss;
    document.getElementById("pointsForDraw").value = data.pointsForDraw;
    document.getElementById("relegatedTeams").value = data.relegatedTeams;
    document.getElementById("participatingTeams").value =
      data.participatingTeams;
    document.getElementById("championsLeagueTeams").value =
      data.championsLeagueTeams;
    document.getElementById("europaLeagueTeams").value = data.europaLeagueTeams;
    document.getElementById("maxForeignPlayers").value = data.maxForeignPlayers;
    document.getElementById("maxAddedTime").value = data.maxAddedTime;
    document.getElementById("rankingCriteria").value = data.rankingCriteria;

    // Các ô input với nhiều giá trị (ageLimit và playerLimit)
    document.getElementById("ageLimitMin").value = data.ageLimit[0];
    document.getElementById("ageLimitMax").value = data.ageLimit[1];
    document.getElementById("playerLimitMin").value = data.playerLimit[0];
    document.getElementById("playerLimitMax").value = data.playerLimit[1];
  } catch (error) {
    console.error("Không thể tải dữ liệu từ JSON server:", error);
  }
}

// Hàm để lưu dữ liệu vào json-server
async function saveData() {
  const updatedData = {
    pointsForWin: parseInt(document.getElementById("pointsForWin").value),
    pointsForLoss: parseInt(document.getElementById("pointsForLoss").value),
    pointsForDraw: parseInt(document.getElementById("pointsForDraw").value),
    relegatedTeams: parseInt(document.getElementById("relegatedTeams").value),
    participatingTeams: parseInt(
      document.getElementById("participatingTeams").value
    ),
    championsLeagueTeams: parseInt(
      document.getElementById("championsLeagueTeams").value
    ),
    europaLeagueTeams: parseInt(
      document.getElementById("europaLeagueTeams").value
    ),
    maxForeignPlayers: parseInt(
      document.getElementById("maxForeignPlayers").value
    ),
    maxAddedTime: parseInt(document.getElementById("maxAddedTime").value),
    ageLimit: [
      parseInt(document.getElementById("ageLimitMin").value),
      parseInt(document.getElementById("ageLimitMax").value),
    ],
    playerLimit: [
      parseInt(document.getElementById("playerLimitMin").value),
      parseInt(document.getElementById("playerLimitMax").value),
    ],
    rankingCriteria: document.getElementById("rankingCriteria").value,
  };

  try {
    await fetch(URL_RULES, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    // alert("Dữ liệu đã được lưu thành công!");
  } catch (error) {
    console.error("Không thể lưu dữ liệu:", error);
  }
}

// Gọi hàm loadData khi trang được tải
window.onload = loadData;

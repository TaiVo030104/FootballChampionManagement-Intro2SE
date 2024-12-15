const URL_RULES =
  "https://footballchampionshipmanagement.onrender.com/api/v1/rules";

let originalValues = [];

function toggleEditMode() {
  const inputs = document.querySelectorAll(".rule-form input");
  const editButton = document.querySelector(".edit-btn");
  const cancelButton = document.querySelector(".cancel-btn");
  const modeRule = document.querySelector(".view_rules h2");

  // if (editButton.textContent === "EDIT") {
  //   originalValues = Array.from(inputs).map((input) => input.value);
  //   inputs.forEach((input) => {
  //     input.removeAttribute("readonly");
  //     input.classList.add("editable");
  //   });
  //   editButton.textContent = "SAVE";
  //   cancelButton.style.display = "inline";
  //   modeRule.textContent = "EDIT RULE";
  // } else {
  //   saveData();
  //   inputs.forEach((input) => {
  //     input.setAttribute("readonly", true);
  //     input.classList.remove("editable");
  //   });
  //   editButton.textContent = "EDIT";
  //   cancelButton.style.display = "none";
  //   modeRule.textContent = "VIEW RULE";
  // }
  if (editButton.textContent === "EDIT") {
    // Lưu giá trị gốc
    originalValues = Array.from(inputs).map((input) => input.value);
    // Chỉ thêm class để thay đổi giao diện nhưng không loại bỏ readonly
    inputs.forEach((input) => {
      input.classList.add("editable");
    });
    editButton.textContent = "SAVE";
    cancelButton.style.display = "inline";
    modeRule.textContent = "EDIT RULE";
  } else {
    // Lưu dữ liệu
    // saveData();
    // Bỏ giao diện "editable"
    inputs.forEach((input) => {
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
    const response = await fetch(URL_RULES, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    // Giả sử JSON có cấu trúc { "rules": [ ... ] }
    const rule = data.rules[0];

    // Gán giá trị từ JSON vào các ô input trong HTML

    // // Gán giá trị từ JSON vào các ô input
    document.getElementById("pointsForWin").value = rule.winscore;
    document.getElementById("pointsForLoss").value = rule.losescore;
    document.getElementById("pointsForDraw").value = rule.drawscore;
    // document.getElementById("relegatedTeams").value = data.relegatedTeams;
    // document.getElementById("participatingTeams").value =
    //   data.participatingTeams;
    // document.getElementById("championsLeagueTeams").value =
    //   data.championsLeagueTeams;
    // document.getElementById("europaLeagueTeams").value = data.europaLeagueTeams;
    document.getElementById("maxForeignPlayers").value = rule.maxforeign;
    document.getElementById("maxAddedTime").value = rule.maxgoaltime;
    // document.getElementById("rankingCriteria").value = data.rankingCriteria;

    // // Các ô input với nhiều giá trị (ageLimit và playerLimit)
    document.getElementById("ageLimitMin").value = rule.minage;
    document.getElementById("ageLimitMax").value = rule.maxage;
    document.getElementById("playerLimitMin").value = rule.minplayer;
    document.getElementById("playerLimitMax").value = rule.maxplayer;
  } catch (error) {
    console.error("Không thể tải dữ liệu từ JSON server:", error);
  }
}

// Hàm để lưu dữ liệu vào json-server
async function saveData() {
  const updatedData = {
    rules: [
      {
        winscore: parseInt(document.getElementById("pointsForWin").value),
        losescore: parseInt(document.getElementById("pointsForLoss").value),
        drawscore: parseInt(document.getElementById("pointsForDraw").value),
        relegatedTeams: parseInt(
          document.getElementById("relegatedTeams").value
        ),
        participatingTeams: parseInt(
          document.getElementById("participatingTeams").value
        ),
        championsLeagueTeams: parseInt(
          document.getElementById("championsLeagueTeams").value
        ),
        europaLeagueTeams: parseInt(
          document.getElementById("europaLeagueTeams").value
        ),
        maxforeign: parseInt(
          document.getElementById("maxForeignPlayers").value
        ),
        maxgoaltime: parseInt(document.getElementById("maxAddedTime").value),

        minage: parseInt(document.getElementById("ageLimitMin").value),
        maxage: parseInt(document.getElementById("ageLimitMax").value),
        minplayer: parseInt(document.getElementById("playerLimitMin").value),
        maxplayer: parseInt(document.getElementById("playerLimitMax").value),
        rankingCriteria: document.getElementById("rankingCriteria").value,
      },
    ],
  };

  try {
    await fetch(URL_RULES, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

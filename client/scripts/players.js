document.addEventListener("DOMContentLoaded", function () {
  const playerTable = document.querySelector(".player-table tbody");
  const addBtn = document.querySelector(".add-btn");
  //   const saveBtn = document.querySelector(".btn-save");
  const searchInput = document.querySelector(".search-bar");
  const url = "http://localhost:3000/players"; // URL của JSON server

  let editingPlayerId = null; // Biến lưu ID cầu thủ khi sửa

  // Hàm load danh sách cầu thủ từ JSON server
  function loadPlayers() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        playerTable.innerHTML = ""; // Xóa danh sách hiện tại
        data.forEach((player) => {
          const row = document.createElement("tr");
          row.dataset.id = player.id;
          row.innerHTML = `
                        <td>${player.id}</td>
                        <td>${player.playerName}</td>
                        <td>${player.team}</td>
                        <td>${player.role}</td>
                        <td>${player.goals}</td>
                        <td>
                            <div class="actions">
                                <span class="edit-icon"><i class="fas fa-edit"></i></span>
                                <span class="delete-icon"><i class="fas fa-trash"></i></span>
                            </div>
                        </td>
                    `;
          playerTable.appendChild(row);
        });
        attachActionListeners(); // Gắn các sự kiện hành động cho các edit và delete icon
      });
  }

  // Gắn sự kiện cho các icon edit và delete
  function attachActionListeners() {
    const editIcons = document.querySelectorAll(".edit-icon");
    const deleteIcons = document.querySelectorAll(".delete-icon");

    editIcons.forEach((icon) => {
      icon.addEventListener("click", function (event) {
        const playerRow = event.target.closest("tr");
        const playerId = playerRow.dataset.id;
        window.location.href = `./addPlayer.html?id=${playerId}`; // Chuyển sang trang addplayer với ID
      });
    });

    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", function (event) {
        const playerRow = event.target.closest("tr");
        const playerId = playerRow.dataset.id;
        deletePlayer(playerId);
      });
    });
  }

  // Hàm xóa cầu thủ
  function deletePlayer(id) {
    fetch(`${url}/${id}`, { method: "DELETE" }).then(() => loadPlayers());
  }

  // Hàm cập nhật cầu thủ khi nhấn "Save"
  //   saveBtn.addEventListener("click", function () {
  //     const playerData = getFormData(); // Hàm lấy dữ liệu từ form
  //     if (editingPlayerId) {
  //       // Nếu có ID cầu thủ cần chỉnh sửa
  //       updatePlayer(editingPlayerId, playerData);
  //     } else {
  //       // Nếu là thêm mới
  //       addPlayer(playerData);
  //     }
  //   });

  // Hàm thêm cầu thủ mới
  function addPlayer(playerData) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    }).then(() => {
      window.location.href = "./players.html"; // Chuyển về danh sách cầu thủ sau khi thêm
    });
  }

  // Hàm cập nhật cầu thủ
  function updatePlayer(id, playerData) {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    }).then(() => {
      window.location.href = "./players.html"; // Chuyển về danh sách cầu thủ sau khi cập nhật
    });
  }

  // Lấy dữ liệu từ form
  function getFormData() {
    const name = document.querySelector("#player-name").value;
    const team = document.querySelector("#player-team").value;
    const role = document.querySelector("#player-role").value;
    const goals = document.querySelector("#player-goals").value;

    return { name, team, role, goals };
  }

  // Kiểm tra nếu có ID trong URL để sửa cầu thủ
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("id")) {
    editingPlayerId = urlParams.get("id");
    fetch(`${url}/${editingPlayerId}`)
      .then((response) => response.json())
      .then((player) => {
        document.querySelector("#player-name").value = player.name;
        document.querySelector("#player-team").value = player.team;
        document.querySelector("#player-role").value = player.role;
        document.querySelector("#player-goals").value = player.goals;
      });
  }

  // Sự kiện nhấn vào nút "Add"
  addBtn.addEventListener("click", function () {
    window.location.href = "./addPlayer.html"; // Chuyển đến trang addplayer để thêm cầu thủ
  });

  // Tìm kiếm cầu thủ theo tên
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll(".player-table tbody tr");
    rows.forEach((row) => {
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = name.includes(query) ? "" : "none";
    });
  });

  // Tải danh sách cầu thủ khi trang load
  loadPlayers();
});

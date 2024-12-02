document.addEventListener("DOMContentLoaded", function () {
  const playerTable = document.querySelector(".player-table tbody");
  const addBtn = document.querySelector(".add-btn");
  const searchInput = document.querySelector(".search-bar");
  const url =
    "https://footballchampionshipmanagement.onrender.com/api/v1/players?sort=playerid"; // URL API mới

  let players = []; // Dữ liệu toàn bộ cầu thủ
  let filteredPlayers = []; // Dữ liệu cầu thủ sau khi tìm kiếm
  let currentPage = 1; // Trang hiện tại
  const playersPerPage = 10; // Số cầu thủ trên mỗi trang

  // Hàm load toàn bộ cầu thủ từ API
  function loadPlayers() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          players = data.data.players; // Lưu dữ liệu cầu thủ từ API

          // Sắp xếp danh sách cầu thủ theo playerid tăng dần
          // players.sort((a, b) => a.playerid - b.playerid);

          filteredPlayers = players; // Mặc định là chưa tìm kiếm, nên filteredPlayers bằng players
          renderPlayers();
          renderPagination();
        } else {
          console.error("Failed to fetch players from API.");
        }
      })
      .catch((error) => {
        console.error("Error loading players:", error);
      });
  }

  // Hàm render danh sách cầu thủ lên bảng
  function renderPlayers() {
    playerTable.innerHTML = ""; // Xóa danh sách hiện tại

    // Lọc cầu thủ theo trang hiện tại
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    const playersToDisplay = filteredPlayers.slice(startIndex, endIndex);

    // Thêm các cầu thủ vào bảng
    playersToDisplay.forEach((player, index) => {
      const row = document.createElement("tr");
      row.dataset.id = player.playerid;

      // Gán Serial Number (index + 1)
      row.innerHTML = `
      <td>${startIndex + index + 1}</td>  <!-- Serial Number -->
      <td>${player.playername}</td>
      <td>${player.team.teamname}</td>
      <td>${player.playertype}</td>
      <td>${player.goalcount}</td>
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
  }

  // Hàm render phân trang
  function renderPagination() {
    const paginationContainer = document.querySelector(".pagination-container");
    const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
    const pagination = document.querySelector(".home-product__pagination");

    pagination.innerHTML = ""; // Xóa các trang hiện tại

    // Thêm nút quay lại
    const prevPage = document.createElement("li");
    prevPage.classList.add("pagination");
    prevPage.innerHTML = `<a href="#" class="pagination-link"><i class="pagination-icon fas fa-angle-left"></i></a>`;
    prevPage.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderPlayers();
        renderPagination();
      }
    });
    pagination.appendChild(prevPage);

    // Thêm các nút trang
    for (let i = 1; i <= totalPages; i++) {
      const page = document.createElement("li");
      page.classList.add("pagination");
      if (i === currentPage) {
        page.classList.add("pagination-active");
      }
      page.innerHTML = `<a href="#" class="pagination-link">${i}</a>`;
      page.addEventListener("click", function () {
        currentPage = i;
        renderPlayers();
        renderPagination();
      });
      pagination.appendChild(page);
    }

    // Thêm nút tiến lên
    const nextPage = document.createElement("li");
    nextPage.classList.add("pagination");
    nextPage.innerHTML = `<a href="#" class="pagination-link"><i class="pagination-icon fas fa-angle-right"></i></a>`;
    nextPage.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderPlayers();
        renderPagination();
      }
    });
    pagination.appendChild(nextPage);
  }

  // Hàm gắn sự kiện cho các icon edit và delete
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

  // Sự kiện nhấn vào nút "Add"
  addBtn.addEventListener("click", function () {
    window.location.href = "./addPlayer.html"; // Chuyển đến trang addplayer để thêm cầu thủ
  });

  // Tìm kiếm cầu thủ theo tên
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    filteredPlayers = players.filter((player) =>
      player.playername.toLowerCase().includes(query)
    );
    currentPage = 1; // Sau mỗi lần tìm kiếm, quay lại trang 1
    renderPlayers();
    renderPagination();
  });

  // Tải danh sách cầu thủ khi trang load
  loadPlayers();
});

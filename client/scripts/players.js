document.addEventListener("DOMContentLoaded", function () {
  const playerTable = document.querySelector(".player-table tbody");
  const addBtn = document.querySelector(".add-btn");
  const viewreportBtn = document.querySelector(".view-report-btn");
  const searchInput = document.querySelector(".search-bar");
  const url =
    "https://footballchampionshipmanagement.onrender.com/api/v1/players?sort=playerid"; // URL API mới
  const URLBASE =
    "https://footballchampionshipmanagement.onrender.com/api/v1/players"; // URL API cũ

  let players = []; // Dữ liệu toàn bộ cầu thủ
  let filteredPlayers = []; // Dữ liệu cầu thủ sau khi tìm kiếm
  let currentPage = 1; // Trang hiện tại
  const playersPerPage = 10; // Số cầu thủ trên mỗi trang
  const limitPlayers = 1000;
  // Hàm load toàn bộ cầu thủ từ API
  function loadPlayers() {
    fetch(`${url}&limit=${limitPlayers}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          players = data.data.players; // Lưu dữ liệu cầu thủ từ API
          filteredPlayers = players; // Mặc định là chưa tìm kiếm, nên filteredPlayers bằng players
          renderPlayers();
          renderPagination();
        } else {
          // showNotification("Failed to fetch players from API.");
          return response.json().then((error) => {
            // Hiển thị thông báo lỗi từ server
            showNotification(`Failed to load player: ${error.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error loading players:", error);
        // showNotification("An error occurred while loading players.");
        showNotification(`Failed to load player: ${error.message}`);
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
    const maxVisiblePages = 3; // Số lượng trang hiển thị tối đa
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Điều chỉnh startPage khi endPage chạm giới hạn cuối
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      const firstPage = document.createElement("li");
      firstPage.classList.add("pagination");
      firstPage.innerHTML = `<a href="#" class="pagination-link">1</a>`;
      firstPage.addEventListener("click", function () {
        currentPage = 1;
        renderPlayers();
        renderPagination();
      });
      pagination.appendChild(firstPage);

      // Thêm dấu "..."
      if (startPage > 2) {
        const dots = document.createElement("li");
        dots.classList.add("pagination");
        dots.innerHTML = `<span class="pagination-link">...</span>`;
        pagination.appendChild(dots);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPages) {
      // Thêm dấu "..."
      if (endPage < totalPages - 1) {
        const dots = document.createElement("li");
        dots.classList.add("pagination");
        dots.innerHTML = `<span class="pagination-link">...</span>`;
        pagination.appendChild(dots);
      }

      const lastPage = document.createElement("li");
      lastPage.classList.add("pagination");
      lastPage.innerHTML = `<a href="#" class="pagination-link">${totalPages}</a>`;
      lastPage.addEventListener("click", function () {
        currentPage = totalPages;
        renderPlayers();
        renderPagination();
      });
      pagination.appendChild(lastPage);
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

  function deletePlayer(id) {
    fetch(`${URLBASE}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          showNotification("Player deleted successfully!", "success");
          loadPlayers(); // Tải lại danh sách cầu thủ
        } else {
          return response.json().then((error) => {
            // Hiển thị thông báo lỗi từ server
            showNotification(`Failed to delete player: ${error.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting player:", error);
        showNotification("An unexpected error occurred. Please try again.");
      });
  }

  function showNotification(message, type = "error") {
    const notificationContainer = document.getElementById(
      "notificationContainer"
    );
    const notificationMessage = document.getElementById("notificationMessage");

    // Gán nội dung thông báo
    notificationMessage.textContent = message;

    // Xóa các lớp CSS cũ và thêm lớp theo loại thông báo
    notificationContainer.className = "notification-container"; // Xóa các lớp cũ
    notificationContainer.classList.add(type);

    // Hiển thị thông báo
    notificationContainer.style.display = "flex";

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      notificationContainer.style.display = "none";
    }, 5000);
  }

  // Đóng thông báo khi nhấn nút "×"
  document.getElementById("notificationClose").addEventListener("click", () => {
    document.getElementById("notificationContainer").style.display = "none";
  });

  // Sự kiện nhấn vào nút "Add"
  addBtn.addEventListener("click", function () {
    window.location.href = "./addPlayer.html"; // Chuyển đến trang addplayer để thêm cầu thủ
  });

  viewreportBtn.addEventListener("click", function () {
    window.location.href = "./reportPlayer.html"; // Chuyển đến trang reportPlayer để xem báo cáo
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

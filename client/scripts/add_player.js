const API_URL =
  "https://footballchampionshipmanagement.onrender.com/api/v1/players";

// Đường dẫn tới API lấy danh sách các đội bóng
const TEAMS_API_URL =
  "https://footballchampionshipmanagement.onrender.com/api/v1/teams";

let originalPlayerData = null;

// Hàm tải danh sách đội bóng và hiển thị vào dropdown
async function loadTeams() {
  try {
    // Gọi API để lấy danh sách đội bóng
    const response = await fetch(TEAMS_API_URL);
    const result = await response.json();

    if (result.status === "success" && result.data && result.data.teams) {
      const teams = result.data.teams;

      // Điền danh sách đội vào dropdown
      const teamSelect = document.getElementById("team");
      teamSelect.innerHTML = ""; // Xóa danh sách cũ (nếu có)

      // Thêm một lựa chọn "Chọn đội" đầu tiên
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Choose a team";
      teamSelect.appendChild(defaultOption);

      // Thêm các đội vào dropdown
      teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.teamid; // Lưu teamid vào value
        option.textContent = team.teamname; // Hiển thị teamname
        teamSelect.appendChild(option);
      });
    } else {
      console.error("Không thể tải danh sách đội bóng.");

      // Hiển thị thông báo lỗi từ server
      showNotification(`Failed to load team: ${result.message}`, false);
    }
  } catch (error) {
    console.error("Không thể tải danh sách đội bóng:", error);
    showNotification(`Failed to load team: ${error.message}`, false); // Hiển thị thông báo lỗi
  }
}

// Hàm tải dữ liệu cầu thủ khi trang được mở
async function loadPlayerData(playerId) {
  try {
    // Gọi API để lấy dữ liệu cầu thủ
    const response = await fetch(`${API_URL}/${playerId}`);
    const result = await response.json();

    if (result.status === "success" && result.data && result.data.player) {
      const player = result.data.player; // Lấy dữ liệu cầu thủ từ API

      originalPlayerData = player;

      // Điền dữ liệu vào các ô input
      document.getElementById("player-name").value = player.playername || "";
      document.getElementById("role").value = player.playertype || "";
      document.getElementById("goals").value = player.goalcount || 0;
      document.getElementById("note").value = player.notes || "";
      document.getElementById("birthdate").value = player.birthdate || "";

      // Điền giá trị cho ô select (team)
      const teamSelect = document.getElementById("team");
      teamSelect.value = player.team?.teamid || ""; // Chọn đội tương ứng với teamid

      // Gắn thông tin team ID vào input (ẩn hoặc dataset)
      teamSelect.dataset.teamid = player.team?.teamid || "";
    } else {
      console.error("Không tìm thấy dữ liệu cầu thủ hoặc API trả về lỗi.");
      // Hiển thị thông báo lỗi từ server
      showNotification(`Failed to load player: ${result.message}`, false);
    }
  } catch (error) {
    console.error("Không thể tải dữ liệu cầu thủ:", error);
    showNotification(`Failed to load player: ${error.message}`, false); // Hiển thị thông báo lỗi
  }
}

// Hàm khôi phục dữ liệu gốc khi nhấn nút Cancel
function resetPlayerData() {
  if (originalPlayerData) {
    document.getElementById("player-name").value =
      originalPlayerData.playername || "";
    document.getElementById("role").value = originalPlayerData.playertype || "";
    document.getElementById("goals").value = originalPlayerData.goalcount || 0;
    document.getElementById("note").value = originalPlayerData.notes || "";
    document.getElementById("birthdate").value =
      originalPlayerData.birthdate || "";

    // Khôi phục giá trị cho ô select (team)
    const teamSelect = document.getElementById("team");
    teamSelect.value = originalPlayerData.team?.teamid || ""; // Chọn đội tương ứng với teamid

    // Nếu bạn cần khôi phục lại dữ liệu team ID vào dataset (nếu cần gửi API sau đó)
    teamSelect.dataset.teamid = originalPlayerData.team?.teamid || "";
  }
  window.location.href = "./players.html";
}

// Sự kiện cho nút Cancel
document
  .querySelector(".btn-cancel")
  .addEventListener("click", resetPlayerData);

// Hàm lưu dữ liệu khi nhấn nút Save
async function savePlayerData(playerId) {
  const updatedPlayer = {
    team_teamid: parseInt(document.getElementById("team").value, 10),
    playername: document.getElementById("player-name").value,
    birthdate: document.getElementById("birthdate").value,
    playertype: document.getElementById("role").value,
    notes: document.getElementById("note").value,
    goalcount: parseInt(document.getElementById("goals").value),
  };

  try {
    const method = playerId ? "PUT" : "POST";
    const url = playerId ? `${API_URL}/${playerId}` : API_URL;

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlayer),
    });

    if (response.ok) {
      showNotification("Player saved successfully!", true); // Hiển thị thông báo thành công với nút "OK"
    } else {
      // showNotification("Failed to save player. Please try again.", false); // Hiển thị thông báo lỗi
      return response.json().then((error) => {
        // Hiển thị thông báo lỗi từ server
        showNotification(`Failed to save player: ${error.message}`, false);
      });
    }
  } catch (error) {
    console.error("Không thể lưu dữ liệu:", error);
    showNotification("An error occurred. Please try again.", false); // Hiển thị thông báo lỗi
  }
}

// Sự kiện cho nút Save
document.querySelector(".btn-save").addEventListener("click", () => {
  const playerId = getPlayerIdFromURL();
  savePlayerData(playerId);
});

// Hàm lấy playerId từ URL (hoặc từ trạng thái trang khác)
function getPlayerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Hàm thay đổi tiêu đề trang dựa trên chế độ (thêm mới hoặc chỉnh sửa)
function updateHeaderTitle() {
  const playerId = getPlayerIdFromURL();
  const headerTitle = document.querySelector(".body-header-title");

  if (playerId) {
    headerTitle.textContent = "Edit Player";
  } else {
    headerTitle.textContent = "Add Player";
  }
}

// Hàm khởi tạo trang
async function initPage() {
  const playerId = getPlayerIdFromURL(); // Lấy playerId từ URL (nếu có)
  // Cập nhật tiêu đề trang
  updateHeaderTitle();
  try {
    // 1. Tải danh sách đội bóng
    await loadTeams();
    // 2. Nếu có playerId, tải dữ liệu cầu thủ
    if (playerId) {
      await loadPlayerData(playerId);
    }
  } catch (error) {
    console.error("Lỗi khi khởi tạo trang:", error);
  }
}
// Thêm hàm hiển thị thông báo
function showNotification(message, isSuccess = true) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  notificationContainer.innerHTML = `
    <div class="notification ${isSuccess ? "success" : "error"}">
      <p>${message}</p>
      <button class="btn-ok">OK</button>
    </div>
  `;
  notificationContainer.style.display = "flex";

  // Xử lý sự kiện khi nhấn nút OK
  const btnOk = notificationContainer.querySelector(".btn-ok");
  btnOk.addEventListener("click", () => {
    notificationContainer.style.display = "none";
    if (isSuccess) {
      window.location.href = "./players.html"; // Quay lại trang danh sách cầu thủ
    }
  });

  // // Tự ẩn thông báo sau 3 giây nếu không có sự kiện nhấn "OK"
  // setTimeout(() => {
  //   notificationContainer.style.display = "none";
  // }, 3000);
}
// Gọi hàm khởi tạo trang khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", initPage);

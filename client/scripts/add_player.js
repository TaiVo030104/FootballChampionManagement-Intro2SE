// Đường dẫn tới API của JSON Server
const API_URL = "http://localhost:3000/players";

let originalPlayerData = null;

// Hàm tải dữ liệu cầu thủ khi trang được mở
async function loadPlayerData(playerId) {
  try {
    // Gọi API để lấy dữ liệu cầu thủ
    const response = await fetch(`${API_URL}/${playerId}`);
    const player = await response.json();

    originalPlayerData = player;

    // Điền dữ liệu vào các ô input
    document.getElementById("player-name").value = player.playerName;
    document.getElementById("team").value = player.team;
    document.getElementById("role").value = player.role;
    document.getElementById("goals").value = player.goals;
    document.getElementById("note").value = player.note;
  } catch (error) {
    console.error("Không thể tải dữ liệu cầu thủ:", error);
  }
}

// Hàm khôi phục dữ liệu gốc khi nhấn nút Cancel
function resetPlayerData() {
  if (originalPlayerData) {
    document.getElementById("player-name").value =
      originalPlayerData.playerName;
    document.getElementById("team").value = originalPlayerData.team;
    document.getElementById("role").value = originalPlayerData.role;
    document.getElementById("goals").value = originalPlayerData.goals;
    document.getElementById("note").value = originalPlayerData.note;
  }
}

// Sự kiện cho nút Cancel
document
  .querySelector(".btn-cancel")
  .addEventListener("click", resetPlayerData);

// Hàm lưu dữ liệu khi nhấn nút Save
async function savePlayerData(playerId) {
  // Lấy giá trị từ các ô input
  const updatedPlayer = {
    playerName: document.getElementById("player-name").value,
    team: document.getElementById("team").value,
    role: document.getElementById("role").value,
    goals: parseInt(document.getElementById("goals").value),
    note: document.getElementById("note").value,
  };

  try {
    // Kiểm tra xem đây là chỉnh sửa hay thêm mới
    const method = playerId ? "PUT" : "POST";
    const url = playerId ? `${API_URL}/${playerId}` : API_URL;

    // Gửi yêu cầu cập nhật hoặc thêm mới
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlayer),
    });

    if (response.ok) {
      // alert("Dữ liệu đã được lưu thành công!");
      window.location.href = "./players.html";
    } else {
      console.error("Có lỗi khi lưu dữ liệu:", response.statusText);
    }
  } catch (error) {
    console.error("Không thể lưu dữ liệu:", error);
  }
}

// Sự kiện cho nút Save
document.querySelector(".btn-save").addEventListener("click", () => {
  // Giả sử playerId đã có hoặc null nếu thêm mới
  const playerId = getPlayerIdFromURL();
  // const playerId = 1;
  savePlayerData(playerId);
});

// Hàm lấy playerId từ URL (hoặc từ trạng thái trang khác)
function getPlayerIdFromURL() {
  // Lấy playerId từ URL hoặc trả về null nếu không có
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
// Tải dữ liệu nếu có playerId khi trang được mở
const playerId = getPlayerIdFromURL();
if (playerId) {
  loadPlayerData(playerId);
}

updateHeaderTitle();

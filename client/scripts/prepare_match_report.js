const URL_RANK =
  "https://footballchampionshipmanagement.onrender.com/api/v1/rank";

// Hiển thị màu cho Form guide
const updateCircleColors = () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach((circle) => {
    const content = circle.textContent.trim(); // Lấy nội dung bên trong

    // Xóa các class cũ nếu đã có
    circle.classList.remove("win", "draw", "empty");

    // Thêm class phù hợp
    if (content === "W") {
      circle.classList.add("win");
    } else if (content === "D") {
      circle.classList.add("draw");
    } else if (!content) {
      circle.classList.add("empty");
    }
  });
};
// Số dòng mỗi trang
const rowsPerPage = 8;

// Biến lưu trạng thái
let currentPage = 1;

// Hàm hiển thị bảng dựa trên trang hiện tại
// const displayTable = (data, page) => {
//     const tbody = document.querySelector('#leagueTable tbody');
//     tbody.innerHTML = ''; // Xóa dữ liệu cũ nếu có

//     const start = (page - 1) * rowsPerPage;
//     const end = page * rowsPerPage;

//     let pageData = data.slice(start, end); // Lấy dữ liệu cho trang hiện tại

//     // Sắp xếp pageData theo teamid
//     pageData.sort((a, b) => Number(a.teamid) - Number(b.teamid));

//     pageData.forEach(async (teamData) => {
//         const URL_TEAM = `https://footballchampionshipmanagement.onrender.com/api/v1/teams/${teamData.teamid}`
//         const responseTeam = await fetch(URL_TEAM);
//         const dataTeam = await responseTeam.json();
//         teamName = dataTeam.data.team.teamname

//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${teamData.teamid}</td>
//         <td class="team">
//           <div>
//             <img src="${teamData.team?.logo ?? '../assets/images/dortmund.png'}" alt="${teamData.team?.name ?? 'Unknown'} logo">
//             <div>${teamName ?? 'Unknown'}</div>
//           </div>
//         </td>
//         <td>${teamData.played ?? 0}</td>
//         <td>${teamData.win}</td>
//         <td>${teamData.draw}</td>
//         <td>${teamData.lose}</td>
//         <td>${teamData.goalsFor ?? 0}</td>
//         <td>${teamData.goalsAgainst ?? 0}</td>
//         <td>${teamData.goalDifference ?? 0}</td>
//         <td>${teamData.score}</td>
//         <td class="form-guide">
//           <div>
//             ${teamData.form?.map(f => `<div class="circle">${f}</div>`).join('') ?? '<div class="circle empty"></div>'}
//             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
//               <path fill-rule="evenodd" clip-rule="evenodd" d="M3.72624 6.08599C3.32953 6.46796 3.32953 7.10303 3.72624 7.48499L8.47955 12.0617C8.76995 12.3413 9.22954 12.3413 9.51994 12.0617L14.2732 7.48499C14.67 7.10303 14.67 6.46796 14.2732 6.08599C13.8972 5.72394 13.3023 5.72394 12.9262 6.08599L8.99974 9.86657L5.07325 6.08599C4.69723 5.72394 4.10226 5.72394 3.72624 6.08599Z" fill="#C1C2D5"/>
//             </svg>
//           </div>
//         </td>
//       `;
//     //   <td class="actions">
//     //   <div>
//     //     ${teamData.actions.deleteIcon}
//     //     ${teamData.actions.editIcon}
//     //   </div>
//     // </td>
//       tbody.appendChild(row);
//     });
//     updateCircleColors();
//   };

// Hàm hiển thị bảng dựa trên trang hiện tại
const displayTable = async (data, page) => {
  const tbody = document.querySelector("#leagueTable tbody");
  tbody.innerHTML = ""; // Xóa dữ liệu cũ nếu có

  // Sắp xếp tất cả dữ liệu theo teamid
  const sortedData = data.sort((a, b) => Number(a.rank) - Number(b.rank));

  const start = (page - 1) * rowsPerPage;
  const end = page * rowsPerPage;

  let pageData = sortedData.slice(start, end); // Lấy dữ liệu cho trang hiện tại

  // Duyệt qua từng đội và tạo dòng dữ liệu
  for (const teamData of pageData) {
    const URL_TEAM = `https://footballchampionshipmanagement.onrender.com/api/v1/teams/${teamData.teamid}`;
    const responseTeam = await fetch(URL_TEAM, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const dataTeam = await responseTeam.json();
    const teamName = dataTeam.data.team.teamname;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${teamData.rank}</td>
            <td class="team">
              <div>
                <div>${teamName ?? "Unknown"}</div>
              </div>
            </td>
            <td>${teamData.win}</td>
            <td>${teamData.draw}</td>
            <td>${teamData.lose}</td>
            <td>${teamData.score}</td>
        `;
    tbody.appendChild(row);
  }

  updateCircleColors();
};

// Hàm hiển thị nút phân trang với giới hạn số nút
const setupPagination = (data) => {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = ""; // Xóa các nút cũ

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const createButton = (page, text, active = false) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    if (active) button.classList.add("active");
    button.addEventListener("click", () => {
      currentPage = page;
      displayTable(data, currentPage);
      setupPagination(data); // Cập nhật lại nút khi trang thay đổi
    });
    return button;
  };

  // Nút "«" (trang trước)
  if (currentPage > 1) {
    const prevButtonSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
        <rect width="31" height="30" rx="6" fill="#80AF81"/>
        <path d="M10.3436 13.9849L16.9843 7.34424C17.4432 6.88525 18.1854 6.88525 18.6395 7.34424L19.743 8.44775C20.202 8.90674 20.202 9.64893 19.743 10.103L15.0409 14.8149L19.7479 19.522C20.2069 19.981 20.2069 20.7231 19.7479 21.1772L18.6444 22.2856C18.1854 22.7446 17.4432 22.7446 16.9891 22.2856L10.3485 15.645C9.88465 15.186 9.88465 14.4438 10.3436 13.9849Z" fill="white"/>
      </svg>
    `;
    // // Tạo phần tử SVG từ chuỗi và lưu vào biến
    // const prevButtonSVGElement = createSVGElement(prevButtonSVG);
    const prevButton = createButton(currentPage - 1, prevButtonSVG);
    pagination.appendChild(prevButton);
  }

  // Hiển thị nút trang
  if (totalPages <= 4) {
    // Hiển thị tất cả nếu số trang <= 6
    for (let i = 1; i <= totalPages; i++) {
      const button = createButton(i, i, currentPage === i);
      pagination.appendChild(button);
    }
  } else {
    // Hiển thị nút trang giới hạn
    const showDots = (position) => {
      const dots = document.createElement("button");
      dots.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="8" viewBox="0 0 28 8" fill="none">
                                <ellipse cx="4" cy="4" rx="4" ry="3.5" fill="#3D8361"/>
                                <ellipse cx="14" cy="4" rx="4" ry="3.5" fill="#3D8361"/>
                                <ellipse cx="24" cy="4" rx="4" ry="3.5" fill="#3D8361"/>
                            </svg>
                            `;
      dots.classList.add("ect");
      pagination.appendChild(dots);
    };

    // Luôn hiển thị 2 trang đầu tiên
    for (let i = 1; i <= 2; i++) {
      const button = createButton(i, i, currentPage === i);
      pagination.appendChild(button);
    }

    // Hiển thị dấu "..." nếu cần
    if (currentPage > 2) {
      showDots();
    }

    // Hiển thị 2 trang xung quanh trang hiện tại
    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);
    for (let i = start; i <= end; i++) {
      const button = createButton(i, i, currentPage === i);
      pagination.appendChild(button);
    }

    // Hiển thị dấu "..." nếu cần
    if (currentPage < totalPages - 2) {
      showDots();
    }

    // Luôn hiển thị 2 trang cuối cùng
    for (let i = totalPages - 1; i <= totalPages; i++) {
      const button = createButton(i, i, currentPage === i);
      pagination.appendChild(button);
    }
  }

  // Nút "»" (trang sau)
  if (currentPage < totalPages) {
    const nextButtonSVG = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                            <rect width="31" height="30" rx="6" fill="#80AF81"/>
                            <path d="M19.7437 15.645L13.103 22.2856C12.644 22.7446 11.9019 22.7446 11.4478 22.2856L10.3442 21.1821C9.88525 20.7231 9.88525 19.981 10.3442 19.5269L15.0513 14.8198L10.3442 10.1128C9.88525 9.65381 9.88525 8.91162 10.3442 8.45752L11.4429 7.34424C11.9019 6.88525 12.644 6.88525 13.0981 7.34424L19.7388 13.9849C20.2026 14.4438 20.2026 15.186 19.7437 15.645Z" fill="white"/>
                            </svg>
                            `;
    const nextButton = createButton(currentPage + 1, nextButtonSVG);
    pagination.appendChild(nextButton);
  }
};

// Hàm để tải dữ liệu từ json-server
async function loadData() {
  try {
    const responseRank = await fetch(URL_RANK, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const dataRank = await responseRank.json();
    jsonData = dataRank.rank;

    displayTable(jsonData, currentPage);
    setupPagination(jsonData);
  } catch (error) {
    console.error("Không thể tải dữ liệu từ JSON server:", error);
  }
}

// Gọi hàm loadData khi trang được tải
window.onload = loadData;

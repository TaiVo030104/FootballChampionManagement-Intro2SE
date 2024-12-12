document.addEventListener("DOMContentLoaded", () => {
  const apiUrl =
    "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
  const rowsPerPage = 8; // Số lượng dòng mỗi trang

  let currentPage = 1;
  let matches = [];

  // Fetch matches data from the API
  const fetchMatches = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Failed to fetch matches");
      const data = await response.json();
      matches = data.data.matches; // Assuming the matches are in this structure
      updateTable();
      updatePagination();
    } catch (error) {
      console.error("Error fetching matches:", error);
      alert("Failed to load matches data.");
    }
  };

  // Populate match data into the table with pagination
  const updateTable = () => {
    const tableBody = document.getElementById("player-table-body");
    tableBody.innerHTML = ""; // Clear existing table rows

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, matches.length);

    // Generate rows for the current page
    for (let i = startIndex; i < endIndex; i++) {
      const match = matches[i];
      const teamA = match.team1?.teamname || "N/A";
      const teamB = match.team2?.teamname || "N/A";

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${i + 1}</td>
                <td>${teamA}</td>
                <td>${teamB}</td>
                <td>${match.matchdate} ${match.matchtime}</td>
                <td>${match.fieldname}</td>
                <td>Round ${match.roundcount}</td>
                <td>
                    <div class="actions">
                        <span class="edit-icon"><i class="fas fa-edit"></i></span>
                        <span class="delete-icon"><i class="fas fa-trash"></i></span>
                    </div>
                </td>
            `;
      tableBody.appendChild(row);
    }
  };

  // Update pagination buttons based on the number of pages
  const updatePagination = () => {
    const paginationContainer = document.querySelector(
      ".home-product__pagination"
    );
    paginationContainer.innerHTML = ""; // Clear existing pagination buttons

    const totalPages = Math.ceil(matches.length / rowsPerPage);

    // Create previous button
    const prevButton = document.createElement("li");
    prevButton.classList.add("pagination");
    prevButton.innerHTML = `
            <a href="#" class="pagination-link">
                <i class="pagination-icon fas fa-angle-left"></i>
            </a>
        `;
    prevButton.addEventListener("click", () => goToPage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("li");
      pageButton.classList.add("pagination");
      if (i === currentPage) {
        pageButton.classList.add("pagination-active");
      }
      pageButton.innerHTML = `
                <a href="#" class="pagination-link">${i}</a>
            `;
      pageButton.addEventListener("click", () => goToPage(i));
      paginationContainer.appendChild(pageButton);
    }

    // Create next button
    const nextButton = document.createElement("li");
    nextButton.classList.add("pagination");
    nextButton.innerHTML = `
            <a href="#" class="pagination-link">
                <i class="pagination-icon fas fa-angle-right"></i>
            </a>
        `;
    nextButton.addEventListener("click", () => goToPage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
  };

  // Change the current page and update table and pagination
  const goToPage = (page) => {
    const totalPages = Math.ceil(matches.length / rowsPerPage);
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      updateTable();
      updatePagination();
    }
  };

  // Initialize the page by fetching data and populating the table
  fetchMatches();
});

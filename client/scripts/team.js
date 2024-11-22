const teamData = [
    { "teamName": "Manchester United", "teamLeader": "Bruno Fernandes", "nation": "England", "teamSize": 25 },
    { "teamName": "Real Madrid", "teamLeader": "Luka Modric", "nation": "Spain", "teamSize": 23 },
    { "teamName": "Barcelona", "teamLeader": "Marc-André ter Stegen", "nation": "Spain", "teamSize": 22 },
    { "teamName": "Paris Saint-Germain", "teamLeader": "Kylian Mbappé", "nation": "France", "teamSize": 24 },
    { "teamName": "Bayern Munich", "teamLeader": "Joshua Kimmich", "nation": "Germany", "teamSize": 25 },
    { "teamName": "Juventus", "teamLeader": "Leonardo Bonucci", "nation": "Italy", "teamSize": 23 },
    { "teamName": "Chelsea", "teamLeader": "Reece James", "nation": "England", "teamSize": 25 },
    { "teamName": "Arsenal", "teamLeader": "Martin Ødegaard", "nation": "England", "teamSize": 24 },
    { "teamName": "Liverpool", "teamLeader": "Jordan Henderson", "nation": "England", "teamSize": 25 },
    { "teamName": "Manchester City", "teamLeader": "Kevin De Bruyne", "nation": "England", "teamSize": 24 },
    { "teamName": "Inter Milan", "teamLeader": "Lautaro Martínez", "nation": "Italy", "teamSize": 23 },
    { "teamName": "AC Milan", "teamLeader": "Theo Hernández", "nation": "Italy", "teamSize": 22 },
    { "teamName": "Borussia Dortmund", "teamLeader": "Marco Reus", "nation": "Germany", "teamSize": 21 },
    { "teamName": "RB Leipzig", "teamLeader": "Will Orban", "nation": "Germany", "teamSize": 23 },
    { "teamName": "Tottenham Hotspur", "teamLeader": "Heung-min Son", "nation": "England", "teamSize": 25 },
    { "teamName": "Atletico Madrid", "teamLeader": "Koke", "nation": "Spain", "teamSize": 24 },
    { "teamName": "Napoli", "teamLeader": "Giovanni Di Lorenzo", "nation": "Italy", "teamSize": 23 },
    { "teamName": "Roma", "teamLeader": "Lorenzo Pellegrini", "nation": "Italy", "teamSize": 22 },
    { "teamName": "Ajax", "teamLeader": "Steven Bergwijn", "nation": "Netherlands", "teamSize": 22 },
    { "teamName": "Benfica", "teamLeader": "João Mário", "nation": "Portugal", "teamSize": 23 },
    { "teamName": "Porto", "teamLeader": "Pepe", "nation": "Portugal", "teamSize": 24 },
    { "teamName": "Sporting CP", "teamLeader": "Sebastián Coates", "nation": "Portugal", "teamSize": 23 },
    { "teamName": "Sevilla", "teamLeader": "Jesús Navas", "nation": "Spain", "teamSize": 22 },
    { "teamName": "Villarreal", "teamLeader": "Raúl Albiol", "nation": "Spain", "teamSize": 21 },
    { "teamName": "Lazio", "teamLeader": "Ciro Immobile", "nation": "Italy", "teamSize": 22 },
    { "teamName": "Marseille", "teamLeader": "Valentin Rongier", "nation": "France", "teamSize": 23 },
    { "teamName": "PSV Eindhoven", "teamLeader": "Luuk de Jong", "nation": "Netherlands", "teamSize": 21 },
    { "teamName": "Galatasaray", "teamLeader": "Fernando Muslera", "nation": "Turkey", "teamSize": 22 },
    { "teamName": "Celtic", "teamLeader": "Callum McGregor", "nation": "Scotland", "teamSize": 23 },
    { "teamName": "Fenerbahçe", "teamLeader": "Altay Bayındır", "nation": "Turkey", "teamSize": 22 },
    { "teamName": "Besiktas", "teamLeader": "Romain Saïss", "nation": "Turkey", "teamSize": 23 },
    { "teamName": "Leeds United", "teamLeader": "Liam Cooper", "nation": "England", "teamSize": 24 },
    { "teamName": "West Ham United", "teamLeader": "Declan Rice", "nation": "England", "teamSize": 24 },
    { "teamName": "Aston Villa", "teamLeader": "John McGinn", "nation": "England", "teamSize": 24 },
    { "teamName": "Eintracht Frankfurt", "teamLeader": "Kevin Trapp", "nation": "Germany", "teamSize": 23 },
    { "teamName": "Monaco", "teamLeader": "Wissam Ben Yedder", "nation": "France", "teamSize": 22 },
    { "teamName": "Lille", "teamLeader": "Benjamin André", "nation": "France", "teamSize": 23 },
    { "teamName": "Shakhtar Donetsk", "teamLeader": "Taras Stepanenko", "nation": "Ukraine", "teamSize": 24 },
    { "teamName": "Dynamo Kyiv", "teamLeader": "Vitaliy Buyalskyi", "nation": "Ukraine", "teamSize": 23 },
    { "teamName": "Zenit Saint Petersburg", "teamLeader": "Claudinho", "nation": "Russia", "teamSize": 24 },
    { "teamName": "Boca Juniors", "teamLeader": "Carlos Tevez", "nation": "Argentina", "teamSize": 23 },
    { "teamName": "River Plate", "teamLeader": "Martín Demichelis", "nation": "Argentina", "teamSize": 22 },
    { "teamName": "Flamengo", "teamLeader": "Gabigol", "nation": "Brazil", "teamSize": 24 },
    { "teamName": "Palmeiras", "teamLeader": "Felipe Melo", "nation": "Brazil", "teamSize": 23 },
    { "teamName": "São Paulo", "teamLeader": "Hernán Crespo", "nation": "Brazil", "teamSize": 25 },
    { "teamName": "Corinthians", "teamLeader": "Jô", "nation": "Brazil", "teamSize": 22 },
    { "teamName": "Vasco da Gama", "teamLeader": "Rafael Silva", "nation": "Brazil", "teamSize": 23 },
    { "teamName": "Atlético Mineiro", "teamLeader": "Guilherme Arana", "nation": "Brazil", "teamSize": 24 },
    { "teamName": "Fluminense", "teamLeader": "Fred", "nation": "Brazil", "teamSize": 23 },
    { "teamName": "Gremio", "teamLeader": "Geromel", "nation": "Brazil", "teamSize": 22 },
    { "teamName": "Independiente", "teamLeader": "Silvio Romero", "nation": "Argentina", "teamSize": 24 },
    { "teamName": "Club América", "teamLeader": "Guillermo Ochoa", "nation": "Mexico", "teamSize": 23 },
    { "teamName": "Chivas", "teamLeader": "José Juan Vázquez", "nation": "Mexico", "teamSize": 22 },
    { "teamName": "Monterrey", "teamLeader": "Víctor Vázquez", "nation": "Mexico", "teamSize": 24 },
    { "teamName": "Pumas UNAM", "teamLeader": "Andrés Gutiérrez", "nation": "Mexico", "teamSize": 22 },
    { "teamName": "Toluca", "teamLeader": "Rubens Sambueza", "nation": "Mexico", "teamSize": 23 },
    { "teamName": "Cruz Azul", "teamLeader": "José de Jesús Corona", "nation": "Mexico", "teamSize": 24 },
    { "teamName": "Santos Laguna", "teamLeader": "Jonathan Rodríguez", "nation": "Mexico", "teamSize": 22 },
    { "teamName": "Tigres UANL", "teamLeader": "Guido Pizarro", "nation": "Mexico", "teamSize": 23 },
    { "teamName": "Atlético Nacional", "teamLeader": "Alexander Mejía", "nation": "Colombia", "teamSize": 23 },
    { "teamName": "Millonarios", "teamLeader": "David Mackay", "nation": "Colombia", "teamSize": 22 },
    { "teamName": "Independiente Santa Fe", "teamLeader": "Duván Vergara", "nation": "Colombia", "teamSize": 24 },
    { "teamName": "Deportivo Cali", "teamLeader": "Teófilo Gutiérrez", "nation": "Colombia", "teamSize": 23 },
    { "teamName": "Atlético Junior", "teamLeader": "Luis Díaz", "nation": "Colombia", "teamSize": 22 },
    { "teamName": "La Equidad", "teamLeader": "Carlos Peralta", "nation": "Colombia", "teamSize": 22 },
    { "teamName": "Emelec", "teamLeader": "José Francisco Cevallos", "nation": "Ecuador", "teamSize": 22 },
    { "teamName": "Barcelona SC", "teamLeader": "Carlos Garcés", "nation": "Ecuador", "teamSize": 23 },
    { "teamName": "Universitario de Deportes", "teamLeader": "Raúl Ruidíaz", "nation": "Peru", "teamSize": 23 },
    { "teamName": "Alianza Lima", "teamLeader": "Jefferson Farfán", "nation": "Peru", "teamSize": 22 },
    { "teamName": "The Strongest", "teamLeader": "Raúl Castro", "nation": "Bolivia", "teamSize": 23 },
    { "teamName": "Bolivar", "teamLeader": "Juan Carlos Arce", "nation": "Bolivia", "teamSize": 22 },
    { "teamName": "Olimpia", "teamLeader": "Juan Carlos López", "nation": "Paraguay", "teamSize": 23 },
    { "teamName": "Libertad", "teamLeader": "Antonio Sanabria", "nation": "Paraguay", "teamSize": 22 },
    { "teamName": "Sao Paulo", "teamLeader": "Diego Souza", "nation": "Brazil", "teamSize": 22 }
];

let currentPage = 1;
const teamsPerPage = 8;
let filteredData = [...teamData];

let editingIndex = null;  

function editItem(index) {
    // First, clear the editing mode for any previously edited row
    if (editingIndex !== null) {
        saveEdit(editingIndex); // Save the previous row's data
    }
    
    // Set the row to editable
    const row = document.querySelector(`#teamTable tbody tr:nth-child(${index + 1})`);
    
    // Allow the entire row to be edited by turning on contenteditable
    const cells = row.querySelectorAll("td");
    cells.forEach(cell => {
        if (cell !== cells[cells.length - 1]) { // Exclude the 'Actions' column
            cell.setAttribute('contenteditable', 'true');
        }
    });

    // Set this row as the currently edited row
    editingIndex = index;
}

function saveEdit(index) {
    const row = document.querySelector(`#teamTable tbody tr:nth-child(${index + 1})`);
    const cells = row.querySelectorAll("td");
    
    const updatedValues = [
        cells[1].innerText.trim(),
        cells[2].innerText.trim(),
        cells[3].innerText.trim(),
        cells[4].innerText.trim()
    ];

    // Check for empty fields
    if (updatedValues.some(value => value === "")) {
        alert("All fields must be filled.");
        return;
    }

    // Update the data array with the new values
    teamData[(currentPage - 1) * teamsPerPage + index] = {
        teamName: updatedValues[0],
        teamLeader: updatedValues[1],
        nation: updatedValues[2],
        teamSize: updatedValues[3]
    };

    // Reset contenteditable to false
    cells.forEach(cell => {
        if (cell !== cells[cells.length - 1]) {
            cell.removeAttribute('contenteditable');
        }
    });

    renderTable(currentPage, filteredData);
    updatePagination(filteredData);
    editingIndex = null;
}

function handleBlur(index) {
    // Automatically save when the user clicks away (loses focus)
    saveEdit(index);
}

function handleEnter(index, e) {
    // Save when the user presses "Enter"
    if (e.key === 'Enter') {
        saveEdit(index);
    }
}

function renderTable(page, data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear old content

    const startIndex = (page - 1) * teamsPerPage;
    const pageTeams = data.slice(startIndex, startIndex + teamsPerPage);

    pageTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td contenteditable="false" onblur="saveEdit(${index})" onkeydown="handleEnter(${index}, event)">${team.teamName}</td>
            <td contenteditable="false" onblur="saveEdit(${index})" onkeydown="handleEnter(${index}, event)">${team.teamLeader}</td>
            <td contenteditable="false" onblur="saveEdit(${index})" onkeydown="handleEnter(${index}, event)">${team.nation}</td>
            <td contenteditable="false" onblur="saveEdit(${index})" onkeydown="handleEnter(${index}, event)">${team.teamSize}</td>
            <td>
                <div class="actions">
                    <span class="delete-icon" onclick="deleteItem(${startIndex + index})">
                        <img src="../assets/images/team/delete.svg" alt="Delete">
                    </span>
                    <span class="edit-icon" onclick="editItem(${index})">
                        <img src="../assets/images/team/edit.svg" alt="Edit">
                    </span>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getFieldColumn(field) {
    switch (field) {
        case 'teamName':
            return 2; // teamName is in the second column
        case 'teamLeader':
            return 3;
        case 'nation':
            return 4;
        case 'teamSize':
            return 5;
        default:
            return 1;
    }
}

// Existing deleteItem and pagination functions
function updatePagination(data) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Clear old pagination

    const totalPages = Math.ceil(data.length / teamsPerPage);

    // Previous page
    if (currentPage > 1) {
        pagination.innerHTML += `
            <li class="pagination">
                <a href="#" class="pagination-link" onclick="changePage(${currentPage - 1})">
                    <i class="pagination-icon fas fa-angle-left"></i>
                </a>
            </li>
        `;
    }

    // Page links
    if (currentPage > 2) {
        pagination.innerHTML += `
            <li class="pagination">
                <a href="#" class="pagination-link" onclick="changePage(1)">1</a>
            </li>
        `;
        if (currentPage > 3) {
            pagination.innerHTML += `<li class="pagination">...</li>`;
        }
    }

    // Nearby pages
    const pageNumbers = [];
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
        pageNumbers.push(i);
    }

    pageNumbers.forEach(num => {
        const isActive = currentPage === num ? 'pagination-active' : '';
        pagination.innerHTML += `
            <li class="pagination ${isActive}">
                <a href="#" class="pagination-link" onclick="changePage(${num})">${num}</a>
            </li>
        `;
    });

    // Last pages
    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
            pagination.innerHTML += `<li class="pagination">...</li>`;
        }
        pagination.innerHTML += `
            <li class="pagination">
                <a href="#" class="pagination-link" onclick="changePage(${totalPages})">${totalPages}</a>
            </li>
        `;
    }

    // Next page
    if (currentPage < totalPages) {
        pagination.innerHTML += `
            <li class="pagination">
                <a href="#" class="pagination-link" onclick="changePage(${currentPage + 1})">
                    <i class="pagination-icon fas fa-angle-right"></i>
                </a>
            </li>
        `;
    }
}

function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / teamsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    currentPage = page;
    renderTable(currentPage, filteredData);
    updatePagination(filteredData);
}

function setupSearch(data) {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filteredData = data.filter(item => item.teamName.toLowerCase().includes(query));
        currentPage = 1; // Reset to page 1
        renderTable(currentPage, filteredData);
        updatePagination(filteredData);
    });
}

function toggleEditMode(index) {
    const row = document.querySelectorAll('table tbody tr')[index];
    const teamNameCell = row.cells[1];

    const currentTeamName = teamNameCell.innerText;
    teamNameCell.innerHTML = `<input type="text" value="${currentTeamName}" class="edit-input">`;

    const input = teamNameCell.querySelector('.edit-input');
    input.focus();

    input.addEventListener('blur', () => {
        const newTeamName = input.value;
        if (newTeamName !== currentTeamName) {
            teamData[(currentPage - 1) * teamsPerPage + index].teamName = newTeamName;
            renderTable(currentPage);
        } else {
            renderTable(currentPage);
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

function deleteItem(index) {
    const actualIndex = (currentPage - 1) * teamsPerPage + index;
    teamData.splice(actualIndex, 1);
    filteredData = [...teamData];
    const totalPages = Math.ceil(filteredData.length / teamsPerPage);
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    renderTable(currentPage, filteredData);
    updatePagination(filteredData);
}

renderTable(currentPage, filteredData);
updatePagination(filteredData);
setupSearch(teamData);

// Static JSON data (embedded directly in JavaScript)
const data = [
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "UEFA Champions League", "image": "./assets/images/uefa.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "FIFA World Cup", "image": "./assets/images/fifa.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Premier League", "image": "./assets/images/premierleague.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "La Liga", "image": "./assets/images/laliga.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Serie A", "image": "./assets/images/seriea.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Bundesliga", "image": "./assets/images/bundesliga.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Ligue 1", "image": "./assets/images/ligue1.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Copa Libertadores", "image": "./assets/images/libertadores.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" },
    { "name": "Concacaf Nations League", "image": "./assets/images/Concacaf.png", "rulesLink": "#", "reportLink": "#" }
];

// Initialize columns and search functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeColumns(data);
    setupSearch(data);
});

/**
 * Initialize the tournament columns based on data.
 * @param {Array} data - Array of tournament objects.
 */
function initializeColumns(data) {
    const columns = document.querySelectorAll('.column');
    const maxItemsPerColumn = 7;

    // Clear existing content
    columns.forEach(column => column.innerHTML = '');

    let columnIndex = 0;

    data.forEach((item, index) => {
        if (index !== 0 && index % maxItemsPerColumn === 0) {
            columnIndex++;
        }

        if (columnIndex < columns.length) {
            const section = createTournamentSection(item);
            columns[columnIndex].appendChild(section);
        } else {
            console.log('Exceeded column limit. Consider adding pagination.');
        }
    });
}

/**
 * Create a tournament section element.
 * @param {Object} item - Tournament data object.
 * @returns {HTMLElement}
 */
function createTournamentSection(item) {
    const section = document.createElement('div');
    section.classList.add('section');

    section.innerHTML = `
        <div class="image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="section-1">
            <div class="name">
                <h3>${item.name}</h3>
            </div>
            <div class="link">
                <a href="${item.rulesLink}">Edit Rule</a>
                <a href="${item.reportLink}">Prepare match report</a>
            </div>
        </div>
    `;
    return section;
}

/**
 * Set up the search functionality.
 * @param {Array} data - Array of tournament objects.
 */
function setupSearch(data) {
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(query)
        );
        initializeColumns(filteredData);
    });
}

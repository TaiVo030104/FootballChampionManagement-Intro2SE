document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "https://footballchampionshipmanagement.onrender.com/api/v1/matches";
    const matchContainer = document.querySelector('.match-container');

    // Fetch dữ liệu từ API và hiển thị
    async function fetchAndDisplayMatches() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const matches = data.data.matches || [];

            matchContainer.innerHTML = ''; // Xóa nội dung cũ

            matches.forEach(match => {
                const matchCard = document.createElement('div');
                matchCard.classList.add('match-card');

                const score1 = match.score1 ?? '-';
                const score2 = match.score2 ?? '-';

                matchCard.innerHTML = `
                    <div class="team">
                        <span>${match.team1.teamname}</span>
                        <span class="score">${score1}</span>
                        <i class="trash-btn fas fa-trash"></i>
                    </div>
                    <div class="team">
                        <span>${match.team2.teamname}</span>
                        <span class="score">${score2}</span>
                        <a href="../pages/addMatch.html?id=${match.matchid}">
                            <i class="edit-btn fas fa-edit"></i>
                        </a>
                    </div>
                `;

                matchContainer.appendChild(matchCard);
            });
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    fetchAndDisplayMatches();
});

document.addEventListener("DOMContentLoaded", () => {
 
    const urlParams = new URLSearchParams(window.location.search);
    const matchId = urlParams.get("id");
  
 
    if (!matchId) {
      console.error("No match ID provided in the URL.");
      return;
    }
  

    fetch('https://footballchampionshipmanagement.onrender.com/api/v1/matches')
      .then(response => response.json())
      .then(data => {

        console.log("API Data:", data);
  
        const match = data.find(m => m.matchid == matchId);
  
        if (!match) {
          console.error(`No match found with ID ${matchId}`);
          return;
        }
  
        console.log("Filtered Match:", match);
  
        document.getElementById("teamA-input").value = match.team1.teamname; // Team A
        document.getElementById("teamB-input").value = match.team2.teamname; // Team B
        document.getElementById("round-info").textContent = match.roundcount; // Round
        document.getElementById("date-info").textContent = match.matchdate;   // Date
        document.getElementById("time-info").textContent = match.matchtime;   // Time
        document.getElementById("stage-info").textContent = match.fieldname;  // Stage
      })
      .catch(error => {
        console.error("Error fetching match data:", error);
      });

  
  

  const addButton = document.querySelector('.btn-add');
  const playerTableBody = document.getElementById('player-table-body');


  addButton.addEventListener('click', function() {
    
    const newRow = document.createElement('tr');
    

    newRow.innerHTML = `
      <td><input type="text" class="serial-number" /></td>
      <td><input type="text" class="player-name" /></td>
      <td><input type="text" class="team-name" /></td>
      <td><input type="text" class="role-type" /></td>
      <td><input type="text" class="time" /></td>
      <td><button class="btn-remove"><i class="trash-btn fas fa-trash"></i></button></td>
    `;

    // Append the new row to the table body
    playerTableBody.appendChild(newRow);

    // Add functionality to the "Remove" button in the new row
    const removeButton = newRow.querySelector('.btn-remove');
    removeButton.addEventListener('click', function() {
      playerTableBody.removeChild(newRow);
    });
  });

  // Save button event listener
  const saveButton = document.querySelector('.btn-save');
  saveButton.addEventListener('click', function() {
    const rows = document.querySelectorAll('#player-table-body tr');
    
    const goalData = [];
    rows.forEach(row => {
      const serialnumber = row.querySelector('.serial-number').value;
      const playername = row.querySelector('.player-name').value;
      const teamname = row.querySelector('.team-name').value;
      const goaltype = row.querySelector('.role-type').value;
      const goaltime = row.querySelector('.time').value;

      goalData.push({
        serialnumber,
        playername,
        teamname,
        goaltype,
        goaltime
      });
    });

    fetch(`https://footballchampionshipmanagement.onrender.com/api/v1/goals/${matchid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});

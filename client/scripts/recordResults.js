document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    alert(`Match ID: ${id}`);
    if (id) {
      // Fetch match data from the API
      fetch('https://footballchampionshipmanagement.onrender.com/api/v1/matches')
        .then(response => response.json())
        .then(data => {
   
          const match = data.find(m => m.matchid == id);
  
          if (match) {
  
            document.getElementById("teamA-input").value = match.team1.teamname;
            document.getElementById("teamB-input").value = match.team2.teamname;
            document.getElementById("round-info").textContent = match.roundcount;
            document.getElementById("date-info").textContent = match.matchdate;
            document.getElementById("time-info").textContent = match.matchtime;
            document.getElementById("stage-info").textContent = match.fieldname;
          } else {
            console.error(`No match found with id ${id}`);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      console.error("No `id` parameter found in the URL");
    }
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
      <td><button class="btn-remove">Remove</button></td>
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

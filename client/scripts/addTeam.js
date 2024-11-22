const TeamData = [
    {
      "teamName": "Golden Eagles",
      "teamLeader": "Đội tuyển Quốc gia Việt Nam",
      "nation": "Germany",
      "teamSize": 15
    },
    {
      "teamName": "Blue Sharks",
      "teamLeader": "John Doe",
      "nation": "USA",
      "teamSize": 12
    }
];

// Function to load existing team data into the form (e.g., pre-populate if editing an existing team)
function loadTeamData() {
    const savedTeams = JSON.parse(localStorage.getItem('teams')) || TeamData;  // Load from localStorage or fallback to TeamData array
    const team = savedTeams[0]; // Assuming you want to load the first team for editing (can be customized)

    document.querySelector('#team-name').value = team.teamName;
    document.querySelector('#team-leader').value = team.teamLeader;
    document.querySelector('#nation').value = team.nation;
    document.querySelector('#team-size').value = team.teamSize;
}

// Attach event listener to the SAVE button
document.querySelector('.btn-save').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get values from the input fields
    const teamName = document.querySelector('#team-name').value;
    const teamLeader = document.querySelector('#team-leader').value;
    const nation = document.querySelector('#nation').value;
    const teamSize = document.querySelector('#team-size').value;
  
    // Create a new team object from form data
    const newTeam = {
      teamName: teamName,
      teamLeader: teamLeader,
      nation: nation,
      teamSize: parseInt(teamSize) // Convert teamSize to an integer
    };
  
    // Add the new team to the TeamData array
    TeamData.push(newTeam);
  
    // Log the updated TeamData to the console
    console.log('Updated Team Data:', TeamData);
  
    // Optional: Save to localStorage or backend
    saveTeamData();
});

// Function to save the updated team data to localStorage
function saveTeamData() {
    localStorage.setItem('teams', JSON.stringify(TeamData)); // Save to localStorage
}

// Call the loadTeamData function on page load to pre-fill the form
document.addEventListener('DOMContentLoaded', loadTeamData);

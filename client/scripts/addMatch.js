document.addEventListener("DOMContentLoaded", function () {
  // Get the form elements
  const teamAInput = document.getElementById("team-a");
  const teamBInput = document.getElementById("team-b");
  const roundInput = document.getElementById("Round");
  const dateInput = document.getElementById("Date");
  const timeInput = document.getElementById("time");
  const stageInput = document.getElementById("Stage");

  const saveButton = document.querySelector(".btn-save");
  const cancelButton = document.querySelector(".btn-cancel");

  // When the Save button is clicked
  saveButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from the form fields
    const teamA = teamAInput.value;
    const teamB = teamBInput.value;
    const round = roundInput.value;
    const date = dateInput.value;
    const time = timeInput.value;
    const stage = stageInput.value;

    // Check if all required fields are filled
    if (!teamA || !teamB || !round || !date || !time || !stage) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare data to send to the API
    const matchData = {
      matchdate: date, // Date
      matchtime: time, // Time
      roundcount: round, // Round
      fieldname: stage, // Stage (Field Name)
      score1: null, // Assuming no score is entered
      score2: null, // Assuming no score is entered
      team_team1: 1, // Placeholder ID, should match your system's team IDs
      team_team2: 2, // Placeholder ID, should match your system's team IDs
      team1: {
        teamid: 1, // Placeholder ID for Team A
        teamname: teamA,
        fieldname: stage,
      },
      team2: {
        teamid: 2, // Placeholder ID for Team B
        teamname: teamB,
        fieldname: stage,
      },
    };

    // Send POST request to the API
    fetch("https://api.example.com/matches", {
      // Replace with the correct API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token from local storage
      },
      body: JSON.stringify(matchData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Match added successfully!");
          // Optionally, redirect to match page after success
          window.location.href = "../pages/match.html";
        } else {
          alert("Error adding match");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the match.");
      });
  });

  // When the Cancel button is clicked, redirect to the match page
  cancelButton.addEventListener("click", function () {
    window.location.href = "../pages/match.html"; // Redirect to the match page
  });
});

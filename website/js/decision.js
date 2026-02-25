/*
  Author: Nick Lockhart
  Date: October 21, 2025
  File: decision.js
  Description: Interactive haircut recommendation
*/

// Haircut Decision Tree
var app = document.getElementById("decisionTree");

if (app) {
  // Haircut data and starting setup
  var recommendations = {
    crew: "Crew Cut — clean, classic, and easy to maintain.",
    fade: "Fade Haircut — modern, sharp, and stylish.",
    curly: "Curly Top — show off your natural curls and volume.",
    textured: "Long Textured Style — relaxed and layered for straight hair."
  };

  var step = 1;
  var questionEl = document.createElement("h2");
  questionEl.className = "section-title";
  var buttonContainer = document.createElement("div");
  var resultEl = document.createElement("p");
  resultEl.id = "result";
  buttonContainer.className = "button-group";

  app.appendChild(questionEl);
  app.appendChild(buttonContainer);
  app.appendChild(resultEl);

  // Start the process
  startDecisionTree();

  // Function to restart
  function resetDecisionTree() {
    step = 1;
    resultEl.textContent = "";
    startDecisionTree();
  }

  // Main logic controller
  function startDecisionTree() {
    buttonContainer.innerHTML = "";
    if (step === 1) {
      questionEl.textContent = "Do you prefer short or long hair?";
      createButtons(["Short", "Long"], handleLength);
    } else if (step === 2) {
      questionEl.textContent = "Do you want a low-maintenance or styled look?";
      createButtons(["Low-Maintenance", "Styled"], handleMaintenance);
    } else if (step === 3) {
      questionEl.textContent = "Is your hair curly or straight?";
      createButtons(["Curly", "Straight"], handleTexture);
    }
  }

  // Create buttons
  function createButtons(options, callback) {
    buttonContainer.innerHTML = "";
    for (var i = 0; i < options.length; i++) {
      var btn = document.createElement("button");
      btn.textContent = options[i];
      btn.className = "optionBtn";
      btn.type = "button";
      btn.addEventListener("click", function() {
        callback(this.textContent);
      });
      buttonContainer.appendChild(btn);
    }
  }

  // Step 1: Length Decision Node
  function handleLength(choice) {
    var shortHair = (choice === "Short");
    var longHair = (choice === "Long");

    if (shortHair) {
      step = 2;
      startDecisionTree();
    } else if (longHair) {
      step = 3;
      startDecisionTree();
    }
  }

  // Step 2: Maintenance Decision Node
  function handleMaintenance(choice) {
    var lowMaintenance = (choice === "Low-Maintenance");
    var styled = (choice === "Styled");
    var validShortChoice = (step === 2 && (lowMaintenance || styled));

    if (validShortChoice && lowMaintenance) {
      resultEl.textContent = recommendations.crew;
    } else if (validShortChoice && styled) {
      resultEl.textContent = recommendations.fade;
    } else {
      resultEl.textContent = "Invalid choice. Please try again.";
    }
    showRestart();
  }

  // Step 3: Texture Decision Node
  function handleTexture(choice) {
    var curly = (choice === "Curly");
    var straight = (choice === "Straight");

    if (curly) {
      resultEl.textContent = recommendations.curly;
    } else if (straight) {
      resultEl.textContent = recommendations.textured;
    } else {
      resultEl.textContent = "Please select curly or straight.";
    }
    showRestart();
  }

  // Restart button
  function showRestart() {
    buttonContainer.innerHTML = "";
    var restartBtn = document.createElement("button");
    restartBtn.textContent = "Try Again";
    restartBtn.className = "restartBtn";
    restartBtn.type = "button";
    restartBtn.addEventListener("click", resetDecisionTree);
    buttonContainer.appendChild(restartBtn);
  }
}

// --------------------------
// Section 2: Dynamic Content with Loops
// --------------------------
var serviceList = document.getElementById("loop-output1");
if (serviceList) {
  serviceList.innerHTML = "<h3>Featured Services:</h3>";
  var services = ["Fade Haircut", "Crew Cut", "Buzz Cut", "Beard Trim"];
  for (var i = 0; i < services.length; i++) {
    serviceList.innerHTML += "<p>💈 " + services[i] + "</p>";
  }
}

var timeEl = document.getElementById("loop-output2");
if (timeEl) {
  var countdown = 3;
  var message = "<h3>Next Available Booking Countdown:</h3>";
  while (countdown >= 1) {
    message += "<p>⏳ " + countdown + " hour(s) remaining...</p>";
    countdown--;
  }
  message += "<p>✅ A chair is now open! Book your appointment.</p>";
  timeEl.innerHTML = message;
}

// Section 3: Looping Through a NodeList
var navItems = document.querySelectorAll(".explore-nav ul li");
if (navItems.length > 0) {
  for (var j = 0; j < navItems.length; j++) {
    navItems[j].style.fontWeight = "bold";
    navItems[j].style.color = "#1a2e1a";
    navItems[j].innerHTML = " 💈 " + navItems[j].innerHTML;
  }
}

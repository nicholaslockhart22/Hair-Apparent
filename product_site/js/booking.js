//  Author: Nick Lockhart
//  File: booking.js
//  Description: Booking logic + object constructor + validation + discounts

// ===============================
// PRICE LIST FOR HAIRCUT TYPES 
// ===============================
var SERVICE_PRICES = {
  standard: 25,
  fade: 30,
  buzz: 20
};

// ===============================
// BOOKING OBJECT CONSTRUCTOR
// ===============================
function Booking(name, service, day, time, beardTrim, isStudent, isMilitary) {
  this.name = name;
  this.service = service;
  this.day = day;
  this.time = time;
  this.beardTrim = beardTrim;
  this.isStudent = isStudent;
  this.isMilitary = isMilitary;

  this.calculateTotal = function() {
    var base = SERVICE_PRICES[this.service];
    var add = this.beardTrim ? 10 : 0;
    var total = base + add;

    if (this.isStudent || this.isMilitary) {
      total = total - total * 0.10;
    }
    return total;
  };

  this.confirmMessage = function() {
    var total = this.calculateTotal();
    var msg =
      "Thank you " + this.name +
      " for booking a " + this.service +
      " haircut on " + this.day +
      " at " + this.time + ".";

    if (this.beardTrim) {
      msg += " Includes a beard trim.";
    }
    if (this.isStudent || this.isMilitary) {
      msg += " A 10% discount was applied.";
    }

    msg += " Total: $" + total;
    return msg;
  };
}


// ===============================
// FORM ELEMENTS
// ===============================
var fullNameInput = document.getElementById("fullname");
var serviceInput = document.getElementById("service");
var dayInput = document.getElementById("day");
var timeInput = document.getElementById("time");
var helpEl = document.getElementById("help-message");
var msgEl = document.getElementById("confirmation-message");


// ===============================
// POP-UP MESSAGES (FOCUS EVENTS)
// ===============================
fullNameInput.addEventListener("focus", function() {
  helpEl.textContent = "Please enter your full name.";
});

serviceInput.addEventListener("focus", function() {
  helpEl.textContent = "Choose your haircut style.";
});

document.getElementById("beardTrim").addEventListener("focus", function() {
  helpEl.textContent = "Add a beard trim for $10.";
});

document.getElementById("studentDiscount").addEventListener("focus", function() {
  helpEl.textContent = "Students get 10% off!";
});

document.getElementById("militaryDiscount").addEventListener("focus", function() {
  helpEl.textContent = "Military discount: 10% off.";
});

dayInput.addEventListener("focus", function() {
  helpEl.textContent = "Pick a weekday for your appointment.";
});

timeInput.addEventListener("focus", function() {
  helpEl.textContent = "Choose a time between 9–5.";
});


// ===============================
// VALIDATION (BLUR EVENTS)
// ===============================

function showError(message) {
  msgEl.textContent = message;
  msgEl.classList.add("error");   // red styling
  msgEl.classList.remove("show"); // remove green fade-in class
  msgEl.style.display = "block";  
  msgEl.style.opacity = "1";      
  msgEl.style.transform = "translateY(0)";
}


fullNameInput.addEventListener("blur", function() {
  if (fullNameInput.value.trim() === "") {
    showError("Error: Name cannot be blank.");
  }
});

serviceInput.addEventListener("blur", function() {
  if (serviceInput.value === "") {
    showError("Error: You must choose a haircut.");
  }
});

dayInput.addEventListener("blur", function() {
  if (dayInput.value === "") {
    showError("Error: Please select a day.");
  }
});

timeInput.addEventListener("blur", function() {
  if (timeInput.value === "") {
    showError("Error: Please choose a time.");
  }
});
  


// ===============================
// BOOK BUTTON EVENT
// ===============================
document.getElementById("bookBtn").addEventListener("click", function() {

  var name = fullNameInput.value.trim();
  var service = serviceInput.value;
  var day = dayInput.value;
  var time = timeInput.value;
  var beardTrim = document.getElementById("beardTrim").checked;
  var isStudent = document.getElementById("studentDiscount").checked;
  var isMilitary = document.getElementById("militaryDiscount").checked;

  if (!name || !service || !day || !time) {
    showError("⚠️ Please fill out all fields before booking.");
    return;
  }

  var newBooking = new Booking(
    name, service, day, time, 
    beardTrim, isStudent, isMilitary
  );

  // SUCCESS MODE — GREEN MESSAGE
  msgEl.textContent = newBooking.confirmMessage();
  msgEl.classList.remove("error"); // remove red
  msgEl.classList.add("show");     // trigger fade-in
});

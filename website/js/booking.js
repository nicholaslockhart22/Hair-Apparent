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
if (fullNameInput) {
  fullNameInput.addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Please enter your full name.";
  });
}
if (serviceInput) {
  serviceInput.addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Choose your haircut style.";
  });
}
if (document.getElementById("beardTrim")) {
  document.getElementById("beardTrim").addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Add a beard trim for $10.";
  });
}
if (document.getElementById("studentDiscount")) {
  document.getElementById("studentDiscount").addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Students get 10% off!";
  });
}
if (document.getElementById("militaryDiscount")) {
  document.getElementById("militaryDiscount").addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Military discount: 10% off.";
  });
}
if (dayInput) {
  dayInput.addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Pick a weekday for your appointment.";
  });
}
if (timeInput) {
  timeInput.addEventListener("focus", function() {
    if (helpEl) helpEl.textContent = "Choose a time between 9–5.";
  });
}


// ===============================
// VALIDATION (BLUR EVENTS)
// ===============================
if (fullNameInput) {
  fullNameInput.addEventListener("blur", function() {
    if (fullNameInput.value.trim() === "" && msgEl) {
      msgEl.textContent = "Error: Name cannot be blank.";
    }
  });
}
if (serviceInput) {
  serviceInput.addEventListener("blur", function() {
    if (serviceInput.value === "" && msgEl) {
      msgEl.textContent = "Error: You must choose a haircut.";
    }
  });
}
if (dayInput) {
  dayInput.addEventListener("blur", function() {
    if (dayInput.value === "" && msgEl) {
      msgEl.textContent = "Error: Please select a day.";
    }
  });
}
if (timeInput) {
  timeInput.addEventListener("blur", function() {
    if (timeInput.value === "" && msgEl) {
      msgEl.textContent = "Error: Please choose a time.";
    }
  });
}

// ===============================
// BOOK BUTTON EVENT
// ===============================
if (document.getElementById("bookBtn")) {
  document.getElementById("bookBtn").addEventListener("click", function() {

    var name = fullNameInput.value.trim();
    var service = serviceInput.value;
    var day = dayInput.value;
    var time = timeInput.value;
    var beardTrim = document.getElementById("beardTrim").checked;
    var isStudent = document.getElementById("studentDiscount").checked;
    var isMilitary = document.getElementById("militaryDiscount").checked;

    if (!msgEl) return;
    if (!name || !service || !day || !time) {
      msgEl.textContent = "⚠️ Please fill out all fields before booking.";
      msgEl.classList.add("show");
      return;
    }

    var newBooking = new Booking(
      name, service, day, time,
      beardTrim, isStudent, isMilitary
    );

    msgEl.textContent = newBooking.confirmMessage();
    msgEl.classList.add("show");
  });
}

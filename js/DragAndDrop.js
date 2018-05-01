"use strict";

const DROP_KEY = "dropArea";
const MOTIF = "motif";
const WEAPON = "weapon";
const ATTACKER = "attacker";

function setupDropAreas() {

  $("[class*=submit]").addClass(DROP_KEY);
  $("[class*=" + DROP_KEY + "]").droppable({
    classes: {
      "ui-droppable-active": "active"
    },
    accept: function(d) {
      let accepted = null;
      let classList = $(this).prop("classList");

      for (let i = 0; i < classList.length; i++) {
        if (classList[i].startsWith(DROP_KEY)) {
          accepted = classList[i].slice(DROP_KEY.length + 1);
          break;
        }
      }

      if (accepted === null || accepted === "") {
        return true;
      } // accept all if no classes are specified.

      accepted = accepted.split("-");

      for (let i = 0; i < accepted.length; i++) {

        if (d.hasClass(accepted[i])) {
          return true;
        }
      }

      return false; // if we got here don't accept obj.
    },
    drop: function(event, ui) {
      if ($(this).is('[class*="submit"]')) {
        checkSubmission(this, ui.draggable);
      } else if ($(this).is('[data-responder]')) {
        $(this).switchClass("active", "success", 1000, "easeInOutQuad", function() {
          $(this).switchClass('success', "dropArea");
        });
        characterRespond(this, ui.draggable);
      }
    }
  });
}

function checkSubmission(validator, submission) {

  let validationType;

  if ($(validator).is("[id*=" + WEAPON + "]")) validationType = WEAPON;
  else if ($(validator).is("[id*=" + MOTIF + "]")) validationType = MOTIF;
  else if ($(validator).is("[id*=" + ATTACKER + "]")) validationType = ATTACKER;

  if (!validationType) {
    $(validator).switchClass("active success", "fail", 1000, "easeInOutQuad");
    return;
  }

  if ($(submission).is("[class*=" + validator.id + "]")) {
    $(validator).switchClass("active fail", "success", 1000, "easeInOutQuad");
  } else {
    $(validator).switchClass("active success", "fail", 1000, "easeInOutQuad");
  }
  $(validator).html("Submitted: " + submission.text());
}

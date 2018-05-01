"use strict";

// hide show portions of text.
const IF_OBJ_KEY = "if";
const CONDITION_KEY = "condition";
const RESULT_KEY = "result";
const SHOW_KEY = "show";
const HIDE_KEY = "hide";
const RANDOM_DISPLAY="randomDisplay";

let Magician = new JSMagician();

function setupMagicshow() {
  setupRandomDisplays();
  //setting up if Conditions.
  setupIfConditions();
  // setup notes
  setupNotes();
}

//NOTE:This only hides direct descendents.
function setupRandomDisplays(){
  $('.randomDisplay').each(function(){
    $(this).children().hide();
    let RandomIndex= Math.floor(Math.random() *(this.childElementCount));
    $(this).children().eq(RandomIndex).show();
  });
}

function setupIfConditions() {
  $('[class^=if]').each(function(index) {

    let condition = "";
    let result = "";
    let classList = $(this).prop("classList");

    for (let i = 0; i < classList.length; i++) {

      if (condition !== "" && result !== "") break;

      if (classList[i].startsWith(CONDITION_KEY)) {
        condition = classList[i];
        continue;
      } else if (classList[i].startsWith(RESULT_KEY)) {
        result = classList[i];
        continue;
      }
    }

    if (condition === "" || result === "") {
      console.log(`Invalid if statement. ${classList.value}`);
      return;
    }

    parseIF(condition, result, this);
  });
}

function parseIF(condition, result, obj) {
  let cond = condition.replace(CONDITION_KEY + "-", "");
  let res = result.replace(RESULT_KEY + "-", "");
  Magician.add(cond, res, obj);
}

function EvaluateIF(obj) {
  Magician.showTime(obj);
}

function RevertIF(obj) {
  Magician.revert(obj);
}

function JSMagician() {
  this.objects = new Map();
  this.add = function(condition, result, objToAffect) {
    if (this.objects.has(condition)) {
      let controller = this.objects.get(condition);
      if (result == HIDE_KEY) {
        controller.hide.push(objToAffect);
      } else if (result == SHOW_KEY) {
        controller.show.push(objToAffect);
        $(objToAffect).hide();
      }
      this.objects.set(condition, controller);
    } else {
      let controller = {};

      controller.show = [];
      controller.hide = [];

      if (result == HIDE_KEY) {
        controller.hide.push(objToAffect);
      } else if (result == SHOW_KEY) {
        controller.show.push(objToAffect);
        $(objToAffect).hide();
      }
      this.objects.set(condition, controller);
    }
  };
  this.remove = function(condition) {
    this.objects.delete(condition);
  }
  this.revert= function(condition){

        if (this.objects.has(condition)) {

          // go through all the lists  then add results..

          let show = this.objects.get(condition).show;
          let hide = this.objects.get(condition).hide;

          let assignResults = function(item) {

            if (controller === SHOW_KEY) {
              $(item).fadeIn('fast');
            }
            if (controller === HIDE_KEY) {
              $(item).fadeOut('slow');
            }
          }

          let controller = SHOW_KEY;
          hide.forEach(assignResults);

          controller = HIDE_KEY;
          show.forEach(assignResults);
        }
  }
  this.showTime = function(condition) {

    if (this.objects.has(condition)) {

      // go through all the lists  then add results..

      let show = this.objects.get(condition).show;
      let hide = this.objects.get(condition).hide;

      let assignResults = function(item) {

        if (controller === SHOW_KEY) {
          $(item).fadeIn('fast');
        }
        if (controller === HIDE_KEY) {
          $(item).fadeOut('slow');
        }
      }

      let controller = SHOW_KEY;
      show.forEach(assignResults);

      controller = HIDE_KEY;
      hide.forEach(assignResults);

    } else {
      return;
    }
  }
}

function initNotes() {
  $('[data-toggle="popover"]').popover();
}

function setupNotes() {
  $('[class^=note]').each(function(index) {

    let note = $(this);
    $(this).hide();
    let noteText = note.text();
    let noteContainerDiv = document.createElement('div');
    noteContainerDiv.id = "note" + index;
    $(this).wrap(noteContainerDiv);

    var noteType = $.grep(this.className.split(" "), function(v, i) {
      return v.indexOf('note') === 0;
    }).join();


    let $noteButton = $('<button/>').attr({
      type: "button",
    }).addClass("note");

    switch (noteType) {
      case 'note-game':
        {
          $noteButton.append("<i class='fas fa-gamepad'></i>");
          break;
        }
      case 'note-story':
        {
          $noteButton.append("<i class='fas fa-book'></i>");
          break;
        }
      default:
        {
          $noteButton.append("<i class='fas fa-bookmark'></i>");
        }

    }
    $($noteButton).attr("data-container", "body");
    $($noteButton).attr("data-toggle", "popover");
    $($noteButton).attr("data-placement", "left");
    $($noteButton).attr("data-content", noteText);

    $($noteButton).insertBefore(this);

  });

  initNotes();
}

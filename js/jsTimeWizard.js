"use strict";
const TIMER_OBJECT_KEY = "timer";
const REPLACE_KEY = "inOut";
const TRIGGERED_KEY = "triggered";
const TRIGGER_KEY = "trigger";
const TIMESCALE=1000*60;
let timeTracker;
let timerStart;
let stopCountingWhenWindowIsInactive = true;
let isTimerRunning=false;
playerTime = getTimeSpentOnSite();

function SetupTimeWizard() {
  setupGlobalTimer();
  // hide all timers, that will been shown later.
  $('[class*=timer]').not('.result-hide').hide();
  SetupTriggers();

  $('[class*=sequence]').each(function(index) {
    let timerChildren = $(this).children().filter('[class^=timer]').addClass(`seqElement`);
    let count = 0;

    if (!$(this).hasClass(TRIGGERED_KEY)) {
      let seqName = 'seq' + index;
      $(this).attr('id', seqName);

      runSequence(timerChildren, count);
    }
  });

  $('[class*=timer]:not(.seqElement)').each(function() {

    if ($(this).hasClass(TRIGGERED_KEY)) return true; // skip to next iteration

    let classList = $(this).prop("classList");
    let result = "";
    let timerAmount = null;

    for (let i = 0; i < classList.length; i++) {

      if (timerAmount !== null && result !== "") break;

      if (classList[i].startsWith(TIMER_OBJECT_KEY)) {
        timerAmount = classList[i].slice(6);
        continue;
      } else if (classList[i].startsWith(RESULT_KEY)) {
        result = classList[i].slice(7);
        continue;
      }
    }
    if (timerAmount === null || timerAmount === "") {
      timerAmount = 1000;
    }

    switch (result) {
      case SHOW_KEY:
        {
          $(this).delay(timerAmount).fadeIn(400);
          break;
        }
      case HIDE_KEY:
        {
          $(this).delay(timerAmount).fadeOut(400);
          break;
        }
      case REPLACE_KEY:
        {
          $(this).fadeIn(400).delay(timerAmount).fadeOut(400);
          break;
        }
    }
  });

}

function SetupTriggers() {
  $('[class^=trigger]').each(function() {
    setupTriggeredObj(this);
    $(this).on('click', function() {
      Trigger(this);
    });
  });
}

function setupTriggeredObj(obj) {
  let id = obj.getAttribute('data-sequence');
  let objToTrigger = $('#' + id);

  objToTrigger.addClass(TRIGGERED_KEY);

  return objToTrigger;
}

function Trigger(obj) {

  let objToTrigger = setupTriggeredObj(obj);

  if (objToTrigger === undefined) return;

  let timerChildren = $(objToTrigger).children().filter('[class^=timer]');

  if (objToTrigger.is('[class^="timer"]') && objToTrigger.hasClass(TRIGGERED_KEY)) {
    timerChildren.push(objToTrigger);
  }

  let count = 0;
  runSequence(timerChildren, count);
}

function runSequence(sequence, index) {

  if (sequence[index] === undefined) return;
  let classList = $(sequence[index]).prop("classList");
  let result = "";
  let timerAmount = null;

  for (let i = 0; i < classList.length; i++) {

    if (timerAmount !== null && result !== "") break;

    if (classList[i].startsWith(TIMER_OBJECT_KEY)) {
      timerAmount = classList[i].slice(TIMER_OBJECT_KEY.length+1);
      continue;
    } else if (classList[i].startsWith(RESULT_KEY)) {
      result = classList[i].slice(RESULT_KEY.length+1);
      continue;
    }
  }
  if (timerAmount === null || timerAmount === "") {
    timerAmount = 1000;
  }

  switch (result) {
    case SHOW_KEY:
      {
        $(sequence[index]).fadeIn().delay(timerAmount).queue(function(){
            let nextIndex = index + 1;
            runSequence(sequence, nextIndex);
             $( this ).dequeue();
        });
        break;
      }
    case HIDE_KEY:
      {
        $(sequence[index]).fadeOut().delay(timerAmount).queue(function(){
            let nextIndex = index + 1;
            runSequence(sequence, nextIndex);
             $( this ).dequeue();
        });
        break;
      }
    case REPLACE_KEY:
      {
        $(sequence[index]).fadeIn().delay(timerAmount).fadeOut( function() {
          let nextIndex = index + 1;
          runSequence(sequence, nextIndex);
        });
        break;
      }
  }
}

/**-------------------------**/
function getTimeSpentOnSite(){
    let ts = parseInt(localStorage.getItem('timeSpentOnSite'));
    ts = isNaN(ts) ? 0 : ts;
    return ts;
}

function startCounting(){
		timerStart = Date.now();
		timeTracker = setInterval(function(){
    		playerTime = parseInt(getTimeSpentOnSite()+(Date.now()-timerStart))/TIMESCALE;
    		localStorage.setItem('timeSpentOnSite',playerTime);
    		timerStart = parseInt(Date.now());
    		// Convert to minutes
        $('#playerTime').val(parseInt(playerTime/TIMESCALE));
		},TIMESCALE);
}

function setupGlobalTimer(){

  if( stopCountingWhenWindowIsInactive ){
      let hidden,visibilityChange,visibilityState;

      if( typeof document.hidden !== "undefined" ){
          hidden = "hidden",
          visibilityChange = "visibilitychange",
          visibilityState = "visibilityState";
      }else if ( typeof document.msHidden !== "undefined" ){
          hidden = "msHidden",
          visibilityChange = "msvisibilitychange",
          visibilityState = "msVisibilityState";
      }
      let documentIsHidden = document[hidden];

      document.addEventListener(visibilityChange, function() {
          if(documentIsHidden != document[hidden]) {
              if( document[hidden] ){
                  // Window is inactive
                  clearInterval(timeTracker);
              }else{
                  // Window is active
                  if (isTimerRunning)
                  startCounting();
              }
              documentIsHidden = document[hidden];
          }
      });
  }
}

function resetGlobalTimer(){
  playerTime=0;
  localStorage.setItem('timeSpentOnSite',0);
}

function playGlobalTimer(){
  isTimerRunning= true;
  startCounting();
}

function pauseGlobalTimer(){
  isTimerRunning=false;
  clearInterval(timeTracker);
}

function stopGlobalTimer(){
  isTimerRunning= false;
  clearInterval(timeTracker);
  resetGlobalTimer();
}

"use strict";

const NPC_KEY = "npc";
const NPC_RESPONSE_ALL = "all";
const NPC_RESPONSE_INSTRUCTOR = "instructor";
const NPC_RESPONSE_RESPONSE = "response";
const DEF_KEY = "Default";
const RESPONDER_KEY = "responder";
const INSTRUCTION_KEY = "Instruction";
const INSTRUCTOR_KEY = "Instructor";
const CHAR_DETECTIVE = "detective";
const ON_APPROACH = "OnApproach";
const TIME_BASED = "TimeBased";

function setupNPCS() {
  $(`.${NPC_KEY}`).each(function(i, el) {

    let npcName = $(el).data(NPC_KEY);

    if (!npcName) {
      $(el).hide();
      console.log('Please define NPC name');
      return;
    }

    let NPCType = $(el).data('npc-type');

    if (!NPCType) NPCType = 'all';

    switch (NPCType) {
      case NPC_RESPONSE_ALL:
        {
          $(el).addClass('response');
          $(el).addClass('instruction');
          el.setAttribute("data-responder", npcName);
          el.setAttribute("data-instructor", npcName);
          break;
        }
      case NPC_RESPONSE_INSTRUCTOR:
        {
          $(el).addClass('instruction');
          el.setAttribute("data-instructor", npcName);
          break;
        }
      case NPC_RESPONSE_RESPONSE:
        {
          $(el).addClass('response');
          el.setAttribute("data-responder", npcName);
          break;
        }
    }

  });

  updateCharactersResponseState();
}

function updateCharactersResponseState() {
  $('.npc').each(function(i, el) {
    let npcName = $(el).data(NPC_KEY);
    if (npcName === undefined) return;

    let data;

    switch (npcName) {
      case CHAR_DETECTIVE:
        {
          data = detectiveResponse;
          break;
        }
    }

    if (!data) return;

    let timeResponse = "";
    let completenessResponse = "";

    if (data.hasOwnProperty(TIME_BASED)) {
      let timeKeys = Object.keys(data[TIME_BASED]);
      let key_to_use = closest(playerTime, timeKeys, true);
      timeResponse = data[TIME_BASED][key_to_use];
    }

    if (data.hasOwnProperty(ON_APPROACH)) {
      let approachKeys = Object.keys(data[ON_APPROACH]);
      let characterSense = (playerProgress + (playerTime / GameLength) * 100) / 2;
      let key_to_use = closest(characterSense, approachKeys, true);
      completenessResponse = data[ON_APPROACH][key_to_use];
      if (completenessResponse) completenessResponse += "<br />";
    }

    if (timeResponse || completenessResponse) {
      $(el).html(npcName.toUpperCase() + "<br />" + completenessResponse + timeResponse);
      if ($(el).is(":hidden")) $(el).fadeIn();
    } else {
      $(el).hide();
    }
  });
}

function updateInstructions() {
  $('.instruction').each(function(i, el) {

    let instructor = $(el).data(INSTRUCTOR_KEY.toLowerCase());

    if (instructor === undefined) instructor = INSTRUCTION_KEY;

    let instruction;

    switch (instructor) {
      case CHAR_DETECTIVE:
        {
          let responseKeys = Object.keys(detectiveResponse[INSTRUCTION_KEY]);
          instruction = detectiveResponse[INSTRUCTION_KEY][closest(playerProgress, responseKeys)];
          break;
        }
      default:
        console.log("No Instructor defined.");
    }

    if (instruction) {
      $(el).html(instructor.toUpperCase() + "<br />" + ((instruction.constructor === Array) ? instruction.join("<br />") : instruction));
      if ($(el).is(":hidden")) $(el).fadeIn();
    } else {
      $(el).hide();
    }
  });
}

function characterRespond(character, trigger) {
  let responder = $(character).data(RESPONDER_KEY);

  if (responder === undefined || responder === null) return;

  let data = {};

  switch (responder) {
    case CHAR_DETECTIVE:
      {
        data = detectiveResponse;
        break;
      }
    default:
      return;
  }

  let itemVal = $(trigger).data("item-value"); // based on data and type.
  let itemType = toTitleCase($(trigger).data("item-type"));

  let Relavence = $(trigger).data("relavence");

  let Category = $(trigger).data("category");

  if (Relavence === null || Relavence === undefined) Relavence = 0;

  let response;
  let infoResponse;

  if (itemType in data && data[itemType]) {
    response = data[itemType][itemVal];
  }

  if ((Category !== null && Category !== undefined) && data.hasOwnProperty(Category)) {

    let dataInfo = data[Category];

    switch (Category) {
      case 'Info':
        {
          if (Relavence !== 0) {
            let possibleResponses = dataInfo[Object.keys(dataInfo)[Relavence > 0 ? 1 : 0]];
            infoResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
          }
          break;
        }
      case 'Disagree':
        {
          let possibleResponses = dataInfo;
          infoResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
          break;
        }

    }
  }

  if (response === undefined) {
    response = data[DEF_KEY][itemType];
    if (response === undefined) {
      response = data[DEF_KEY][DEF_KEY];
    }
  }

  if (response.constructor === Array) response = response[Math.floor(Math.random() * response.length)];

  if (infoResponse !== undefined) {
    response = infoResponse + "<br/>" + (response === undefined ? "" : response);
  }

  $('p[data-responder=' + responder + '].response').hide().html(responder.toUpperCase() + "<br />" + response).fadeIn('slow');

}
/// HELPER STUFF
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function closest(num, arr, maxNum = false) {
  let mid;
  let lo = 0;
  let hi = arr.length - 1;

  if (num >= arr[hi]) return arr[hi];
  if (num <= arr[lo]) return arr[lo];

  while (hi - lo > 1) {
    mid = Math.floor((lo + hi) / 2);
    if (arr[mid] < num) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (num - arr[lo] <= arr[hi] - num) {
    return arr[lo];
  }

  if (maxNum && arr[hi] != num) return arr[lo];

  return arr[hi];
}

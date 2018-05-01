"use strict";

const P_PROGRESS_KEY = "playerProgress";
const P_TIME_KEY = "playerTime";
const P_COMPLETENESS_KEY = "playerCompleteness";

// main
$(function() {
  setupMagicshow();
  setupInventory();
  SetupTimeWizard();
  setupNPCS();
  setupDropAreas();
  updateInstructions();
  prepDebug();
  prepProgressButtons();
  PrepMemoryCards();
  $('[data-toggle="tooltip"]').tooltip();
});

function prepProgressButtons() {
  $("[class*=playerProgress]").on("click", function() {

    let progress = $(this).data('playerprogress');

    if (progress !== undefined) {
      playerProgress = progress;
      Cookies.set(P_PROGRESS_KEY, playerProgress);
      EvaluateIF(P_PROGRESS_KEY + "-" + playerProgress);
      return;
    }
    ProgressIncrement($(this).data('increment'));
  });
}

function ProgressIncrement(amount, revertPrev = false) {
  if (amount !== undefined) {
    if (revertPrev && playerProgress >= 0) RevertIF(P_PROGRESS_KEY + "-" + playerProgress);
    playerProgress += amount;

    if (playerProgress < 0) playerProgress = 0;
    Cookies.set(P_PROGRESS_KEY, playerProgress);

    EvaluateIF(P_PROGRESS_KEY + "-" + playerProgress);
    updateInstructions();
    return;
  }
}

function CompletenessIncrement(amount, revertPrev = false) {
  if (amount !== undefined) {

    if (revertPrev && playerCompleteness >= 0) RevertIF(P_COMPLETENESS_KEY + "-" + playerCompleteness);
    playerCompleteness += amount;

    if (playerCompleteness < 0) playerCompleteness = 0;
    Cookies.set(P_COMPLETENESS_KEY, playerCompleteness);
    EvaluateIF(P_COMPLETENESS_KEY + "-" + playerCompleteness);
    updateCharactersResponseState();
    return;
  }
}

function PlayerTimeIncrement(amount, revertPrev = false) {
  if (amount !== undefined) {
    if (revertPrev && playerTime >= 0) RevertIF(P_TIME_KEY + "-" + playerTime);
    playerTime += parseInt(amount);
    if (playerTime < 0) playerTime = 0;
    Cookies.set(P_TIME_KEY, playerTime);
    EvaluateIF(P_TIME_KEY + "-" + playerTime);
    updateCharactersResponseState();
    return;
  }
}

function prepDebug() {

  if (playerProgress < 0) playerProgress = 0;

  if (playerCompleteness < 0) playerCompleteness = 0;

  if (playerTime < 0) playerTime = 0;
  /// initVariables
  $('#playerProgress').val(playerProgress);
  $('#playerCompleteness').val(playerCompleteness);
  $('#playerTime').val(playerTime);

  $('#resetGlobalTimer').on('click',function(e){
    e.preventDefault();
    resetGlobalTimer();
  });

  $('#stopGlobalTimer').on('click',function(e){
    e.preventDefault();
    stopGlobalTimer();
  });

  $('#playGlobalTimer').on('click',function(e){
    e.preventDefault();
    playGlobalTimer();
  });

  $('.quantity-right-plus').each(function() {
    $(this).on('click', function(e) {
      e.preventDefault();

      let target = $(this).data('target');
      if (target === undefined) return;
      // Get the field name
      var quantity = parseInt($('#' + target).val());

      if (quantity === undefined) quantity = 0;
      $('#' + target).val(quantity + 1);

      switch (target) {
        case P_PROGRESS_KEY:
          {
            ProgressIncrement(1, true);
            break;
          }
        case P_COMPLETENESS_KEY:
          {
            CompletenessIncrement(1, true);
            break;
          }
        case P_TIME_KEY:
          {
            PlayerTimeIncrement(1, true);
            break;
          }
      }
      // Increment
    });
  });

  $('.quantity-left-minus').each(function() {

    $(this).on('click', function(e) {
      e.preventDefault();

      let target = $(this).data('target');
      if (target === undefined) return;
      // Get the field name
      var quantity = parseInt($('#' + target).val());

      if (quantity === undefined) quantity = 0;
      if (quantity > 0) {
        $('#' + target).val(quantity - 1);
      }
      switch (target) {
        case P_PROGRESS_KEY:
          {
            ProgressIncrement(-1, true);
            break;
          }
        case P_COMPLETENESS_KEY:
          {
            CompletenessIncrement(-1, true);
            break;
          }
        case P_TIME_KEY:
          {
            PlayerTimeIncrement(-1, true);
            break;
          }
      }
      // Increment
    });
  });
}

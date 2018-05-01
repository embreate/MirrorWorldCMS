---
layout: null
---
let MEMORIES_CONTAINER = "memories-container";

$(function() {
    $('.row').sortable({
    items:".card",
    connectWith: "connectedSortable",
    dropOnEmpty: true,
    stop: function(){
      // move placeholder to bottom of parent.
        $('.card-placeholder').each(function(id,val){
          let parent = $(val).parent();
          $(val).appendTo(parent);
        });
    },
  }).disableSelection();
    PrepMemoryCards();
    // create placeholders. Needs a hidden placeholder otherwise you can not drag to an empty list.
    let hidden = $("<div>").addClass("card card-inverse m-2 card-placeholder");
    $(".connectedSortable,.memories-container").append(hidden);
    $('.card-placeholder').css("visibility","hidden").height(200);
});

function PrepMemoryCards() {

  let holder = $("." + MEMORIES_CONTAINER);

  if (!holder || !allMemories) {return;}

  // sort memories
  allMemories.sort(function(a, b) {
    let date1 = new Date(a['Date'] + " " + a['Time']);
    let date2 = new Date(b['Date'] + " " + b['Time']);
    return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
  });

  // place cards
  for (var i = 0; i < allMemories.length; i++) {
    $(holder).append(createMemoryCard(allMemories[i]));
  }
}

function createMemoryCard(item) {
  let card = $("<div>").addClass("card card-inverse m-2");
  let imageSrc= "{{site.baseurl}}";
  imageSrc+=item['Image']===""?"/assets/blank-16x9-576x324.jpg":item['Image'];
  $(card).append($("<img>").addClass("card-img").attr("src",imageSrc));
  let textDisplay = $("<div>").addClass("card-img-overlay");
  $(textDisplay).append($("<h4>").text(item['Label']).addClass("card-title"));
  $(textDisplay).append($("<p>").text(item['Description']).addClass("card-text"));
  $(card).append(textDisplay);
  return card;
}

"use strict"; // Modern js stuff.

// KEY INVENTORY CLASSES
const INVENTORY_KEY = "Inventory";
const OBJECT_KEY = "obj"; // specifies the object to add
const GLOBAL_KEY = "global";
const LOCAL_KEY = "local"; //specifies if it gets added to the global array
const MEM_KEY = "memory";
const ADD_KEY = "add";
const REMOVE_KEY = "remove";

let allItemsMap = new Map();
let allMemoriesMap = new Map();

let includeDummyMemories = true;

function setupInventory() {
  createItemsMap();
  createItemFormulas();
  loadInventoryFromCookies();

  $("#clearInventory").click(function() {
    clearInventory();
  });

  $("#clearMemories").click(function() {
    clearInventory(true);
  });

  $("#resetInventory").click(function() {
    resetInventory();
  });

  $("#resetMemories").click(function() {
    resetInventory(true);
  });

  $('#allInventory').append(Array.from(allItemsMap).map(([key, value]) => createListItemDraggable(key, "item").addClass('debug')));
  $('#allAvailableMemories').append(Array.from(allMemoriesMap).map(([key, value]) => createListItemDraggable(key, MEM_KEY).addClass('debug')));

  /// setup on the inventory listeners
  $(`.${OBJECT_KEY}`).not(".ui-draggable").on("click", function() {
    let classList = $(this).prop("classList");
    let isGlobal = classList.contains(GLOBAL_KEY);
    let shouldRemove = classList.contains(REMOVE_KEY);

    let item = "";

    for (let i = 0; i < classList.length; i++) {
      if (classList[i] != OBJECT_KEY && classList[i] != GLOBAL_KEY && classList[i] != ADD_KEY && classList[i] != REMOVE_KEY) {
        item = classList[i];
        break;
      }
    }

    if (item == "") {
      item = $(this).text();
      console.log(`${item}: For more control please define object. `);
    }
    if (shouldRemove) {
      removeFromInventory(item);
    } else {
      addToInventory(item, isGlobal, this);
    }
  });

  $(`.${MEM_KEY}`).not(".ui-draggable").on("click", function() {
    let classList = $(this).prop("classList");
    let shouldRemove = classList.contains(REMOVE_KEY);

    let memory = "";

    for (let i = 0; i < classList.length; i++) {
      if (classList[i] != MEM_KEY && classList[i] != ADD_KEY && classList[i] != REMOVE_KEY) {
        memory = classList[i];
        break;
      }
    }

    if (memory === "") {
      memory = $(this).text();
      console.log(`${memory}: For more control please define memory tag. `);
    }

    if (shouldRemove) {
      removeFromInventory(memory, true);
    } else {
      addToMemories(memory);
    }

  });
}

function createItemsMap() {
  for (let i = 0; i < allItems.length; i++) {
    if (!allItems[i].Id) continue;
    allItemsMap.set(allItems[i].Id, allItems[i]);
  }
  for (let i = 0; i < allMemories.length; i++) {
    if (!allMemories[i].Id) continue;
    allMemoriesMap.set(allMemories[i].Id, allMemories[i]);
  }


}

function createItemFormulas() {
  for (let i = 0; i < allItems.length; i++) {
    if (!allItems[i].Id || !allItems[i].Creatable) continue;
    Alchemist.add(allItems[i].Creatable, allItems[i].Id);
  }

  for (let i = 0; i < allMemories.length; i++) {
    if (!allMemories[i].Id || !allMemories[i].Creatable) continue;
    Alchemist.add(allMemories[i].Creatable, allMemories[i].Id);
  }
}

function createListItemDraggable(item, type) {

  let itemDef = type === MEM_KEY ? allMemoriesMap.get(item) : allItemsMap.get(item);

  return $("<li>").text(itemDef === undefined ? item : itemDef.Label)
    .addClass(type)
    .attr("data-item-type", type)
    .attr("data-Relavence", itemDef === undefined ? 0 : (itemDef.hasOwnProperty("Relavence") ? itemDef["Relavence"] : 0))
    .attr("data-Category", itemDef === undefined ? null : (itemDef.hasOwnProperty("Category") ? itemDef["Category"] : null))
    .attr("data-Type", itemDef === undefined ? null : (itemDef.hasOwnProperty("Type") ? itemDef["Type"] : null))
    .attr("data-Owner", itemDef === undefined ? null : (itemDef.hasOwnProperty("Owner") ? itemDef["Owner"] : null))
    .attr("data-Tags", itemDef === undefined ? null : (itemDef.hasOwnProperty("Tags") ? itemDef["Tags"] : null))
    .attr("data-toggle", "tooltip")
    .attr("data-placement", "right")
    .attr("data-item-value", itemDef === undefined ? item : itemDef.Id)
    .draggable({
      revert: true,
      stack: ".inventoryHolder li",
      start: function() {
        let $par = $(this).closest('.inventoryHolder');
        $($par).css('z-index', 9999);
        $(this).tooltip('dispose');
      },
      stop: function() {
        $(this).delay(500).removeClass('itemMerged', 1000);
        $(this).delay(500).removeClass('itemMergedFailed', 1000);

        let $par = $(this).closest('.inventoryHolder');
        $($par).css('z-index', "");
        $(this).tooltip({
          title: itemDef === undefined ? item.toString() : itemDef.Description ? itemDef.Description : "",
          delay: {
            show: 1500,
            hide: 0
          },
          container: 'body',
        });
      }
    })
    .droppable({
      accept: `.${type}`,
      classes: {
        "ui-droppable-active": "possibleDrop"
      },
      drop: function(event, ui) {
        let itemA = $(this).data("item-value");
        let itemB = $(ui.draggable).data("item-value");

        let result = Alchemist.combine(itemA, itemB);

        if (result !== undefined) {
          if (type === MEM_KEY) {
            if (addToMemories(result)) {
              ui.draggable.addClass('itemMerged', 1000);
              $(this).addClass('itemMerged', 1000, function() {
                $(this).delay(1000).removeClass('itemMerged', 500);
              });
            }
          } else {
            $(ui.draggable).fadeOut(500);
            $(this).fadeOut(500, function() {
              ReplaceItem(itemA, result, true);
              removeFromInventory(itemB);
            });
          }
        } else {
          ui.draggable.addClass('itemMergedFailed', 1000);
          $(this).addClass('itemMergedFailed', 1000, function() {
            $(this).delay(1500).removeClass('itemMergedFailed', 500);
          });
        }
      }
    })
    .tooltip({
      title: itemDef === undefined ? item.toString() : itemDef.Description ? itemDef.Description : "",
      delay: {
        show: 500,
        hide: 0
      },
      container: 'body',
    });
}

// wrapper function we can use it when using map=>
let createDraggableListItem = function(type) {
  return function(x) {
    return createListItemDraggable(x, type);
  };
};

function loadInventoryFromCookies(type = "both") {

  if (type === INVENTORY_KEY || type === "both") {
    if (Cookies.get(INVENTORY_KEY) != undefined) {
      if (includeDummyMemories && Cookies.get("dummyDataItem") != undefined) {
        globalInventory = globalInventory.concat(JSON.parse(Cookies.get(INVENTORY_KEY)));
        Cookies.set("dummyDataItem", true);
      } else
        globalInventory = JSON.parse(Cookies.get(INVENTORY_KEY));
    } else {
      globalInventory = org_globalInventory.slice(0);
    }
    globalInventory.forEach(function(item) {
      EvaluateIF(item);
    });

    console.log(`Inventory loaded: ${globalInventory}`);

    $('#inventory').append(globalInventory.map(createDraggableListItem("item")));
    $('#clearInventory').prop('disabled', globalInventory.length <= 0);
  }
  if (type === MEM_KEY || type === "both") {
    if (Cookies.get(MEM_KEY) != undefined) {
      if (includeDummyMemories && Cookies.get("dummyDataMem") != undefined) {
        memoryInventory.concat(JSON.parse(Cookies.get(MEM_KEY)));
        Cookies.set("dummyDataMem", true);
      } else
        memoryInventory = JSON.parse(Cookies.get(MEM_KEY));
    } else {
      memoryInventory = org_memoryInventory.slice(0);
    }

    memoryInventory.forEach(function(item) {
      EvaluateIF(item);
    });

    console.log(`memories loaded: ${memoryInventory}`);

    $('#memoryInventory').append(memoryInventory.map(createDraggableListItem("memory")));

    $('#clearMemories').prop('disabled', memoryInventory.length <= 0);

  }

}

function addToInventory(inventoryItem, isGlobal, parent = null) {
  console.log(`adding to inventory: ${inventoryItem}; isGlobal:${isGlobal}`);

  // check if  the item is defined in the items array.

  let itemDef = allItemsMap.get(inventoryItem);

  if (itemDef === undefined) {
    console.log(`${inventoryItem} was not defined in the items.yml. Please define item there for more control.`);
  }

  let hasItem = checkInventory(inventoryItem, GLOBAL_KEY);

  if (hasItem) {
    console.log(`Can not add ${inventoryItem}. Inventory already contains item.`);
    return false;
  }
  if (isGlobal) {
    globalInventory.push(inventoryItem);
    Cookies.set(INVENTORY_KEY, globalInventory);

  } else {
    localInventory.push(inventoryItem);
  }

  let $item = createListItemDraggable(inventoryItem, "item");
  $($item).appendTo('#inventory');

  /*
    let x, y = 0;
    x = $($item).offset().left;
    y = $($item).offset().top;

    // animation stuff.

    let fakeItemDef = allItemsMap.get(inventoryItem);
    let $fake = $("<li>").addClass('fakeItem').text(fakeItemDef === undefined ? inventoryItem : itemDef.Label).appendTo($(parent).parent());
  */
  /*$($fake).animate({
    opacity: 100,
    left: x,
    top: y,
  });
  */




  $('#clearInventory').prop('disabled', globalInventory.length <= 0);

  EvaluateIF(inventoryItem);

  return true;
}

function ReplaceItem(itemToReplace, newItem, isGlobal) {

  let itemDef = allItemsMap.get(newItem);

  if (itemDef === undefined) {
    console.log(`${newItem} was not defined in the items.yml. Please define item there for more control.`);
  }

  var index = isGlobal ? globalInventory.indexOf(itemToReplace) : localInventory.indexOf(itemToReplace);

  let hasItem = checkInventory(itemToReplace, GLOBAL_KEY);

  if (isGlobal) {

    globalInventory[index] = newItem;
    Cookies.set(INVENTORY_KEY, globalInventory);

  } else {
    localInventory[index] = newItem;
  }

  let container = $("li[data-item-value='" + itemToReplace + "']");
  $(container).text(itemDef === undefined ? newItem : itemDef.Label);
  $(container).attr("data-item-value", itemDef === undefined ? newItem : itemDef.Id).tooltip('update');

  $('#clearInventory').prop('disabled', globalInventory.length <= 0);

  EvaluateIF(newItem);
}

function addToMemories(memoryItem) {
  console.log(`adding to memories: ${memoryItem};`);

  let hasItem = checkMemories(memoryItem);

  if (hasItem) {
    console.log(`Can not add ${memoryItem}. Memories already contains memory.`);
    return false;
  }

  memoryInventory.push(memoryItem);
  Cookies.set(MEM_KEY, memoryInventory);



  let $item = createListItemDraggable(memoryItem, "memory").hide();
  $($item).appendTo('#memoryInventory').fadeIn(1000);


  $('#clearMemories').prop('disabled', memoryInventory.length <= 0);
  EvaluateIF(memoryItem);

  return true;
}

function checkMemories(memoryItem) {
  return contains.call(memoryInventory, memoryItem);
}

function checkInventory(inventoryItem, inventoryType = LOCAL_KEY) {

  return contains.call(inventoryType === LOCAL_KEY ? localInventory : globalInventory, inventoryItem);
}

function removeFromInventory(inventoryItem, isMemory = false) {

  if (!isMemory) {

    if (Cookies.get(INVENTORY_KEY) == undefined &&
      globalInventory.length <= 0 &&
      localInventory.length <= 0) return;

    console.log(`removing from inventory: ${inventoryItem}`);
    localInventory = remove(localInventory, inventoryItem);
    globalInventory = remove(globalInventory, inventoryItem);
    Cookies.set(INVENTORY_KEY, globalInventory);

    $('#inventory li').remove();
    $('body>.tooltip').remove();
    $('#inventory').append(globalInventory.map(createDraggableListItem("item")));
  } else {
    if (memoryInventory.length <= 0) return;
    console.log(`removing from memories: ${inventoryItem}`);
    memoryInventory = remove(memoryInventory, inventoryItem);
    Cookies.set(MEM_KEY, memoryInventory);

    $('#memoryInventory li').remove();
    $('body>.tooltip').remove();
    $('#memoryInventory').append(globalInventory.map(createDraggableListItem("memory")));
  }

  $('#clearMemories').prop('disabled', memoryInventory.length <= 0);
  $('#clearInventory').prop('disabled', globalInventory.length <= 0);

}

function clearInventory(isMemory = false) {

  if (!isMemory) {

    if (Cookies.get(INVENTORY_KEY) == undefined &&
      globalInventory.length <= 0 &&
      localInventory.length <= 0) return;

    console.log("clearing inventory...");
    Cookies.remove(INVENTORY_KEY);

    Cookies.remove("dummyDataItem");
    globalInventory.length = 0;
    localInventory.length = 0;
    $('#inventory li').remove();
  } else {
    if (Cookies.get(MEM_KEY) == undefined &&
      memoryInventory.length <= 0) return;
    console.log("clearing memories...");
    Cookies.remove(MEM_KEY);
    Cookies.remove("dummyDataMem");
    memoryInventory.length = 0;
    $('#memoryInventory li').remove();
  }

  $('#clearMemories').prop('disabled', memoryInventory.length <= 0);
  $('#clearInventory').prop('disabled', globalInventory.length <= 0);
}

function resetInventory(isMemory = false) {

  clearInventory(isMemory);

  if (isMemory) Cookies.remove("dummyDataMem");
  else Cookies.remove("dummyDataItem");

  loadInventoryFromCookies(isMemory ? MEM_KEY : INVENTORY_KEY);
}
/// helper method
function removeAll(array, element) {
  return array.filter(e => e !== element);
}

function remove(array, element) {
  var index = array.indexOf(element);
  if (index >= -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  } else {
    return array;
  }
}

let contains = function(needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  let findNaN = needle !== needle;
  let findIndex;

  if (!findNaN && typeof Array.prototype.indexOf === 'function') {
    findIndex = Array.prototype.indexOf;
  } else {
    findIndex = function(needle) {
      let i = -1,
        index = -1;

      for (i = 0; i < this.length; i++) {
        let item = this[i];

        if ((findNaN && item !== item) || item === needle) {
          index = i;
          break;
        }
      }

      return index;
    };
  }

  return findIndex.call(this, needle) > -1;
};

---
title: Documentation
layout: page
permalink: /documentation/
---

<div class="documentation" markdown="1">
<div class="content" markdown="1">

<section markdown="1">
## Key words

* TOC
{:toc}
</section>
------------------------
<section markdown="1">
### Inventory

| Variables         | Mandatory | Description|                           
|----------------|:---------:| -----------|                          
| .obj              | Y         | Indicates that we need to do an inventory action.|
| .global           | N         | If present obj will be added to global inventory, instead of local(page specific) inventory. |
| .add              | N         | Default behaviour. Can be omitted.  |
| .remove           | N         | If present obj will be removed from inventory (no need to specify which inventory its located in.)|
{:.table .table-bordered .table-striped}

__Examples__

```markdown

//Adds OBJECTNAME to local inventory.
//It presumes that any tag that isn't a key variable is will be the name of the object.
[Something](#){:.obj .OBJECTNAME .add }

//Adds Something to local inventory.
//If there is no name specified. It will grab the text.
[Something](#){:.obj .add }

//Adds Knife to global inventory
[Knife](#){:.obj .add .global}

//Remove knife from inventory
[Lamb](#lamb){:.obj .Knife .remove}

```
</section>
--------------------------------------------------------------------------------
<section markdown="1">
### Memories
-----------------------------------------------------------------------

Variables | Mandatory | Description
--------- | :-------: | --------------------------------------------------------------------------------------------------
.memory   |     Y     | Indicates that we need to do an memory action.
.add      |     N     | Default behaviour. Can be omitted.
.remove   |     N     | If present memory will be removed from inventory (no need to specify which inventory its located in.)|
{:.table .table-bordered .table-striped}

**Examples**

```markdown

//Adds OBJECTNAME to memories.
//It presumes that any tag that isn't a key variable is will be the name of the object.
[Something](#){:.memory .OBJECTNAME .add }

//Adds Something to memories.
//If there is no name specified. It will grab the text.
[Something](#){:.memory .add }

//Adds Knife to memories
[Knife](#){:.memory}

//Remove knife from memories.
[Lamb](#lamb){:.memory .Knife .remove}
```
</section>
--------------------------------------------------------------------------------
<section markdown="1">
### Player Progress
-----------------------------------------------------------------------

Variables | Mandatory | Description
--------- | :-------: | --------------------------------------------------------------------------------------------------
.playerProgress   |     Y     | Indicates that we are doing playerProgress action.
data-playerProgress      |     N     | Default behaviour. set the player progress
.data-increment   |     N     | Increase/Decrease playerProgress|
{:.table .table-bordered .table-striped}
**Examples**

```markdown

// Set playerProgress to 5
[SetProgress](#){:.playerProgress data-playerProgress="5" }

// Increase playerProgress by 1.
[IncrementProgress](#){:.playerProgress data-increment="1" }

// decrease playerProgress by 3.
[DecrementProgress](#){:.playerProgress data-increment="-3" }

```
</section>
--------------------------------------------------------------------------------

<section markdown="1">
### Conditions

| Variables         | Mandatory | Description|                           
| ----------------  |:---------:| -----------|                          
| .if               | Y         | Indicates that this is an if statement.
| .condition-inventoryItem      | Y         | If Item is in inventory |
| .condition-playerProgress-lvNumber      | Y         | If player has progressed to level |
| .result-resultAction          | Y         | Results  |
{:.table .table-bordered .table-striped}

Possible Conditions:
* InventoryItemId
* playerProgress-lvNumber
* playerTime-min
* playerCompleteness-percent

Possible Result Actions:
* show
* hide

__Examples__

```markdown
//Show "Sheep Appears!" only if there is knife in the inventory
[Sheep Appears!](#cut-lamb){:.if .condition-Knife .result-show }

//Hide "Now you see me.." only if there are glasses in the inventory
[Now you see me!](#cut-lamb){:.if .condition-glasses .result-hide}

//Show if player's level is 9001
[Over 9000](#cut-lamb){:.if .condition-playerProgress-9001 .result-show}

// Show if the player has completed 10 %
[10 % complete](#cut-lamb){:.if .condition-playerCompleteness-10 .result-show}

```
</section>
---------------------
<section markdown="1">
### Timer

| Variables         | Mandatory | Description|                           
| ----------------  |:---------:| -----------|                          
| .timer-number     | Y         | Indicates that this is a timer. (in milliseconds). If no number is specified, default is 1000(1 sec).|
| .result-resultAction          | Y         | Results  |
| .trigger |Y | When an with this class is clicked it will trigger the corresponding sequence or timer |
{:.table .table-bordered .table-striped}

Possible Result Actions:
* show // one time effect
* hide // one time effect
* inOut // repeatable effect

If objects are within a sequence class. timers will go off in sequence.

__Examples__

```html
// 'Red' will appear 1 sec after the page loads.
Red
{:.timer-1000 .result-show }
// 'Blue' will disappear 1.5 secs after the page loads
Blue
{:.timer-1500 .result-hide}
// 'Green' will fade in and out after 1.5 secs after the page loads.
Green
{:.timer-1500 .result-inOut}

///when the page loads this will a sequence of numbers fading in/out in order.
<div markdown="1" class="sequence">
  1
  {:.timer-1000 .result-inOut }
  2
  {:.timer-1500 .result-inOut}
  3
  {:.timer-1500 .result-inOut}
</div>

// This sequence will be triggered.
<div markdown="1" class="sequence" id="alphabet">
  a
  {:.timer-1000 .result-inOut }
  b
  {:.timer-1500 .result-inOut}
  c
  {:.timer-1500 .result-inOut}
</div>

//'I know my alphabet' will trigger the sequence with the id alphabet on click.
I know my alphabet
{:.trigger data-sequence="alphabet"}
```
</section>
--------------------------------------------------------------------------------
### __NPC__
<section markdown="1">
#### Interactions

Variables            | Mandatory | Description
-------------------- | :-------: | -------------------------------------------------
.dropArea            |     Y     | Indicates that it accepts draggable objects(item, memory)|
.dropArea-TYPE       |     N     | Indicates that it accepts draggable objects of a particular type.|
data-responder="responder" | Y | Indicates how the drop Area will respond. |
{:.table .table-bordered .table-striped}

**Examples**

```html
/// allows you to drop any draggable objects to this area. we Will use the detective's responses.
<div markdown="1" class="dropArea" data-responder="detective">

![Portrait of the Detective](assets/memories-00-intro/detectives-face-on-mirror-phone.jpg)
Instructions: Drag and drop a memory to illicit a response from the sergeant.
</div>

/// allows you to drop draggable objects of type memory to this area.
<div markdown="1" class="dropArea-memory">

![Portrait of the Detective](assets/memories-00-intro/detectives-face-on-mirror-phone.jpg)
Instructions: Drag and drop a memory to illicit a response from the sergeant.
</div>

/// allows you to drop draggable objects of type memory or item to this area.
<div markdown="1" class="dropArea-memory-item">

![Portrait of the Detective](assets/memories-00-intro/detectives-face-on-mirror-phone.jpg)
Instructions: Drag and drop a memory to illicit a response from the sergeant.
</div>

```
</section >
--------------------------------------------------------------------------------
<section markdown="1">

#### NPC dialogue

Variables            | Mandatory | Description
-------------------- | :-------: | -------------------------------------------------
.npc                 |     Y     | Indicates that this is an npc|
data-npc="name"      |     Y     | Indicates the npc name |
data-npc-type=""      |     N     | Indicates how npc will respond. Default type is all. |
{:.table .table-bordered .table-striped}

Types of npc responses

- response : responds to player's dragging an memory or item.
- instructor: shows instructions based on player's progress
- all: all of the above.

**Examples**

```html
///When the player does an action. The Detective's line will change. But not to instruction.
{:.dialogue .response data-responder="detective"}
detective <br>Took you long enough. I need you to do your thing with the man the paramedics are working on.

```
</section>

-------------------------
<section markdown="1">
### Random Display

* __.randomDisplay__
    - Will display one of its children randomly.
    - Note: It will only randomly select between direct descendents(child elements).  

**Examples**
```html
/// This div is a container. It will randomly select between 1,2,3
<div class="randomDisplay">
  <p> 1 </p>
  <p> 2 </p>
  <p> 3 </p>
</div>

// It also works with markdown.
// But be careful it as selects direct children of the container.
// When in doubt separate items with new lines.
<div class="randomDisplay" markdown="1">
[The Child](#child)

[Anarchist Dick](anarchist-dick)

[Journalist](#journalist)
</div>
```
</section>
---------------------
<section markdown="1">
### Comments

* __.note__
    - allows you to add in a note easily. Which can be toggled on/off.
</section>
---------------------
<section markdown="1">
### In progress
</section>
</div>
</div>

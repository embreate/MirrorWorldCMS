# Key words

--------------------------------------------------------------------------------

## Inventory Items

Variables | Mandatory | Description
--------- | :-------: | --------------------------------------------------------------------------------------------------
.obj      |     Y     | Indicates that we need to do an inventory action.
.global   |     N     | If present obj will be added to global inventory, instead of local(page specific) inventory.
.add      |     N     | Default behaviour. Can be omitted.
.remove   |     N     | If present obj will be removed from inventory (no need to specify which inventory its located in.)

**Examples**

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
--------------------------------------------------------------------------------

## Memories

Variables | Mandatory | Description
--------- | :-------: | --------------------------------------------------------------------------------------------------
.memory   |     Y     | Indicates that we need to do an memory action.
.add      |     N     | Default behaviour. Can be omitted.
.remove   |     N     | If present memory will be removed from inventory (no need to specify which inventory its located in.)

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

--------------------------------------------------------------------------------

## Conditions

Variables                | Mandatory | Description
------------------------ | :-------: | ---------------------------------------
.if                      |     Y     | Indicates that this is an if statement.
.condition-item |     Y     | Checks if player has item in their inventory(or in their memories.)
.result-resultAction     |     Y     | Results

Possible Result Actions:

- show
- hide

**Examples**

```markdown
//Show "Sheep Appears!" only if there is knife in the inventory
[Sheep Appears!](#cut-lamb){:.if .condition-Knife .result-show }

//Hide "Now you see me.." only if there are glasses in the inventory
[Now you see me!](#cut-lamb){:.if .condition-glasses .result-hide}
```

--------------------------------------------------------------------------------
## Comments

- **.note**

  - allows you to add in a note easily. Which can be toggled on/off.

--------------------------------------------------------------------------------

## Timer

Variables            | Mandatory | Description
-------------------- | :-------: | -------------------------------------------------
.timer-number        |     Y     | Indicates that this is a timer. (in milliseconds)
.result-resultAction |     Y     | Results

Possible Result Actions:

- show // one time effect
- hide // one time effect
- inOut // repeatable effect

If objects are within a sequence class. timers will go off in sequence.

**Examples**

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
<div markdown="1" class="sequence triggered" id="alphabet">
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

-------

* __.dropArea__

Variables            | Mandatory | Description
-------------------- | :-------: | -------------------------------------------------
.dropArea            |     Y     | Indicates that it accepts draggable objects(item, memory)
.dropArea-TYPE       |     N     | Indicates that it accepts draggable objects of a particular type.
data-responder="responder" | Y | Indicates how the drop Area will respond.

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

--------------------------------------------------------------------------------

# In progress
- Merging of items.

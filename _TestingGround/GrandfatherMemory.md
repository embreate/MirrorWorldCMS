---
layout: memory
title:  "Slaughtering an Animal with his Grandfather"
catergories: #["",""]
---

<section markdown="1" id ="start" class="memorySection">
Raff is nine years old in the barn with his grandfather. A tiny sheep is led into the room by a rope. Raff is only 10 and begins to cry when his grandfather hands him the knife.

this is a memory
{:.memory .memoryTag}
Remove Memory
{:.memory .remove .memoryTag}

[Memory Appears!](#cut-lamb){:.if .condition-memoryTag .result-hide }

[Lamb](#lamb){:.obj .Knife .remove}

[Picture](#picture)
[Barn Doors]({% link _TestingGround/BarnDoor2.md %})

[Knife](#start){:.obj .global}
</section>
------------------------------------
<section markdown="1" class="memorySection">
### Timer

### Hover Over Lamb

Granddad explains why god gave us the animals to eat.

“There will come a time when knowing how to live off the land will come in handy.”
Hinting that he believes that a societal collapse is looming. Grandad is a prepper.

“Now get on with it.”

Young Raf pleads with his Grandad, “I don’t want to, please Papa.”
</section>
------------------------------------
<section markdown="1" class="memorySection">

As you approach, the lamb screams.
[Sheep Appears!](#cut-lamb){:.if .condition-Knife .result-show }
[Watch this sheep disappear!](#other-scene){:.if .condition-Knife .result-hide}

</section>{:#lamb}
------------------------------------
<section markdown="1" class="memorySection">
{:#cut-lamb}
This triggers a montage of scenes related to the butchering of the animal. Players can’t interact with these scenes but they hint at future moments players will need to resolve and aspects to the butchers story.

<div markdown="1" class="sequence triggered" id="something">
  1
  {:.timer-1000 .result-hide }
  2
  {:.timer-1500 .result-show}
  3
  {:.timer-1500 .result-inOut}
</div>

[Barn](#)
<div markdown="1" class="sequence">
  a
  {:.timer-1000 .result-hide }
  b
  {:.timer-1500 .result-show}
  c
  {:.timer-1500 .result-inOut}
</div>

His war buddy bleeding out in a ditch 3.
{:.timer-1500 .result-inOut}

[Trigger](#cut-lamb){:.trigger data-sequence="something2"}

Something that wasn't there before.
{:.timer-1000 .result-inOut #something2}

{:.note}
Players are brought back to the barn and see the goat hanging by a rope bleeding out of its neck. Grandad is satisfied, hopefully his grandchild will not turn out like his son. Next memory: The Butcher listening to a story from his boss at an empty Meat Shop.
</section>


------------------------------------
<section markdown="1" class="memorySection">
{:#picture}
You're looking at a picture of mom and dad
Grandad notices you looking at the picture he will talk about his feelings of his son (he is very angry at him).

[Back](#start)
</section>

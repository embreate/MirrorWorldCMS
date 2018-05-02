---
title: Slaughtering an Animal with Grandfather
perspective: The Butcher
world-date: 2019-07-13 13:55:00 -04:00
characters:
- The Butcher
- Grandfather
location: Grandfathers Barn
MemoryId: slaughteringlamb
Memory Label: Slaughting Lamb
layout: memory
---

{:#start}
<section markdown="1">
You're in a barn. Looking down you see you're in the body of a young boy. A tiny sheep is led into the room with a rope by an older man (Raf's grandfather). Looking up at him you watch as he pulls a knife out of his pocket and hands it to you. The boy begins to cry.

{:.dialogue} 
GRANDPA <br>God gave us the animals to eat.

{:.note-story}
His grandfather shares a lot of the characteristics of his boss at the Butchery (overbearing, gruff, disciplining). His grandfather didn’t want Raf to turn out like his father who he blames for his wife's (Raf’s grandmother) poor health. So his grandfather see’s in Raf an opportunity to raise a son up right. Through this scene Raff absorbs the sense of burden that he and his father have been to his grandparents. 
{:.note-game}
Over the course of time (1 month) Raff resolved the scene in various ways, eventually building up the courage to butcher the pig. The easiest thing to do is kill the lamb. But players will learn through exploration that they can unlock other memories by trying the harder option; defying Grandad. 

[Timer: After 5 Seconds](#time)
[Approach Lamb](#lamb-approach){:.obj .Knife .remove}
[Grab Knife](#){:.obj .add .global}
[Look at Picture](#picture)
[Run to Barn Doors](#run-for-doors-caught)

</section>
------------------------------------
{:#time}
<section markdown="1">

{:.dialogue} 
GRANDPA <br>There will come a time when knowing how to live off the land will do you well.

{:.note-story}
Hinting that he believes that a societal collapse is looming. Grandad is a prepper.

{:.dialogue} 
GRANDPA <br>Now get on with it.

{:.dialogue} 
YOUNG RAF (pleading) <br>“I don’t want to, please Papa.”

[<< Back](#start)

</section>
------------------------------------
{:#lamb-approach}
<section markdown="1">

Grandpa holds the lamb in place. 

[Cut Lamb](#cut-lamb){:.if .condition-Knife .result-show }
[Pet Lamb](#start){:.if .condition-Knife .result-hide}
[Cut Rope](#cut-rope){:.if .condition-Knife .result-show }
</section>
------------------------------------
{:#pet-lamb}
<section markdown="1">
You reach your tiny hands towards the lamb. It jump back. You place your hand on the side of the lambs neck and stroke down. 

{:.dialogue}
YOUNG RAF <br>It's OK buddy. 

You pet the lamb. The lamb is calmer. 

{:.dialogue}
GRANDPA <br>That's the idea. Much easy to slaughter the little fellar when it's relaxed.   

{:.dialogue}
GRANDPA <br>Don't get too attached now. 

[Pet Again](#pet-lamb)
[Grab Knife](#){:.obj .add .global}
[Cut Lamb](#cut-lamb){:.if .condition-Knife .result-show }
[Cut Rope](#cut-rope){:.if .condition-Knife .result-show }

{:.note-game}
We could allow players to pet the lamb multiple times, getting slightly different feedback from Grandpa and the lamb.
</section>
------------------------------------
{:#cut-lamb}
<section markdown="1">

Grandpa encourages Young Raf as he moves forward, the knife is held loosely in his hands. 

{:.dialogue} 
GRANDPA <br>Insert dialogue

Young Raf puts the knife to the lamb's throat, his grandpa hold the animal still. The animal stares wide eyed directly at you as it tries to wrestle free. The knife pierces the animals skin. 

{:.dialogue} 
GRANDPA <br>Quick now, boy. The thing is squirming like a bugger.

[Slice Neck](#slice-neck)
[Cut Rope](#cut-rope)
[Run Away](#run-for-doors-caught)
</section>
------------------------------------
{:#slice-neck}
<section markdown="1">
Young Raf commits. He slides the blade across the lambs neck. A second later blood flows down the animals neck. The look of shock on the lambs face as the life twitches out of its body triggers a memory.

[Memory](#memory-war-buddy)

</section>
------------------------------------
{:#cut-rope}
<section markdown="1">

You slice the rope with the knife and cut your grandad in the process. 

{:.dialogue} 
GRANDPA <br>Heavens mercy! 

The lamb escapes. And Grandpa runs after it. 

[Run to Barn Doors]()
[Hold still](#start)

[<< Back](#start)
</section>
------------------------------------
{:#picture}
<section markdown="1">
You're looking at a picture of mom and dad. Grandad notices you looking at the picture he will talk about his feelings of his son (he is very angry at him).

{:.dialogue} 
GRANDPA <br>Insert dialogue

[<< Back](#start)
</section>
------------------------------------
{:#memory-war-buddy}
<section markdown="1">

His war buddy bleeding out in a ditch.

[<< Back](#memory-attacking-journalist)
</section>
------------------------------------
{:#memory-attacking-journalist}
<section markdown="1">

His war buddy bleeding out in a ditch.

[<< Back](#memory-lamb-dead)
</section>
------------------------------------
{:#memory-lamb-dead}
<section markdown="1">

You find yourself back at the barn and see the goat hanging by a rope bleeding out of its neck. Grandad is satisfied, hopefully his grandchild will not turn out like his son. Next memory: The Butcher listening to a story from his boss at an empty Meat Shop.

[]({{site.baseurl}})
</section>
------------------------------------
{:#run-for-doors-caught}
<section markdown="1">


[]({{site.baseurl}})
</section>
------------------------------------
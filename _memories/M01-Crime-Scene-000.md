---
layout: memory
perspective: The Protagonist
title: "The Crime Scene"
world-date: 2041-11-13T01:50:00 -500
characters: ["The Protagonist"]
location: Protagonists Apartment
catergories: #["",""]

---
{:#start}
<section markdown="1">

You are at the crime scene inside of an abandoned factory. There are police and paramedics on scene.

<div markdown="1" class="sequence" id="detectiveMeetup">

{:.timer-4000 .result-inOut .dialogue}
DETECTIVE <br>Took you long enough. I need you to do your thing with the man the paramedics are working on.  

{:.timer-5000 .result-inOut .dialogue}
DETECTIVE <br>Let's go now, hustle. That guy has only so long to live and I need to figure out what happened here.

{:.timer-4000 .result-inOut .dialogue}
DETECTIVE <br>You're not having one of your episodes, are you? You remember why you're hear right?

</div>

{:.note-game}
At anytime players can walk towards the bloody bodies.

[Walk Towards Bodies](#options)

</section>
------------------------------------
{:#options}
<section markdown="1" >

You take a closer look. Looks like a bloodbath.

[Talk to Detective]({{site.baseurl}}/memories/M01-Crime-Scene-001-The-Detective/)

[Talk to Paramedic](#paramedic)

[Talk to Cop](#cop)

[Walk to Computer Terminal](#mirror-world-terminal)

[Fill Out Case Report]({{site.baseurl}}/memories/M01-Crime-Scene-Case-Report/)

[Inspect the Butcher](#butcher)

[Inspect the Journalist](#journalist)

[Inspect the Senators Daughter](#senators-daughter)

[Inspect the Anarchist Dick](#anarchist-dick)

</section>
------------------------------------
{:#paramedic}
<section markdown="1">

The paramedic tells you The Butcher doesn't have much time to live.

[Back](#start)

</section>
------------------------------------
{:#cop}
<section markdown="1">

The cop comments on the murder scene. Says something about how distgusted he is that they got a child involved.

[Back](#start)

</section>
------------------------------------
{:#mirror-world-terminal}
<section markdown="1">

Upon investigating the Mirror World terminal you see that the wharehouse Mirror is corrupted.

[Back](#start)

</section>
------------------------------------
{:#journalist}
<section markdown="1">

The woman lies on the floor. Her hands our bounds. A cable is connected to the back of her head.

[Back](#start)
</section>
------------------------------------
{:#senators-daughter}
<section markdown="1">

The child was stabbed in the chest and strangled by the chord coming out from the back of her neck.

[Back](#start)
</section>
------------------------------------
{:#anarchist-dick}
<section markdown="1">

The man's neck was broken which would have taken a large amount of force.

[Back](#start)
</section>
------------------------------------
{:#butcher}
<section markdown="1">

![]({{site.baseurl}}/assets/crime-scene/helix-S01-E01.jpg)

You see a stocky man on the ground. Paramedics are working on him.

{:.dialogue}
PARAMEDIC <br>He doesn't have much time to live.

{:.note-game}
Players need the brain to body connector from their toolkit to enter the butcher.  

[Jack Into Man](/memories/M01-Butcher-Entering/){:.if .condition-jack-kit .result-show }
[Back](#start)

</section>
------------------------------------

---
title: Fly To Crime Scene
perspective: The Protagonist
world-date: 2041-11-13 01:40:00 -05:00
characters:
- The Protagonist
- Detective
location: City
layout: memory
---

{:#start}
<section markdown="1"> 
![]({{site.baseurl}}/assets/fly-to-crime-scene/drone-cockpit.jpg)

The Detective appears on the screen in front of you. 

{:.dialogue}
DETECTIVE <br>I'd give you access to the Mirror but it's down, the tech thinks it's been hacked. So I'm sending over some of the crime scene photo's. Familiarise yourself with the scene.  

The words MESSAGE INCOMING replace the detective on the screen. 

Then DATA RECEIVED, UNPACKING. 

After a beat you see four bloody bodies strewn about a floor, connected to glowing red wires, blood splattered everywhere. 

[Look Out Window](#window)
[View Crime Scene Photo's](#screen)

</section>
------------------------------------
{:#window}
<section markdown="1"> 

{:.add-copy-below}
Add a description of the city at night. 

{:.dialogue}
DETECTIVE <br>Tells you to focus on the task at hand, you'll be ariving soon. Makes a reference to your condition, maybe asks you if you're taking your meds.     

[View Crime Scene Photo's](#screen)

</section>
------------------------------------
{:#screen}
<section markdown="1"> 

{:.add-copy-below}
We could use a description of the crime scene. 

Inside of an abandoned wharehouse you see four bodies on the ground.  

{:.dialogue}
DETECTIVE <br>Scan the images and save the victims faces to your memory. Pay close attention to the dark skinned man. 

[Inspect Dark Skinned Male](#butcher){:.if .condition-butcher .result-hide }
[Inspect White Male](#anarchist-dick){:.if .condition-anarchist-dick .result-hide }
[Inspect Chinese Female](#journalist){:.if .condition-journalist .result-hide }
[Inspect Brown Skinned Female](#senators-daughter){:.if .condition-senators-daughter .result-hide }

{:.note-game}
Game Play: once you've stored the people at the murder site you will arrive at the crime scene. 

<div markdown="1">
<div markdown="1">
[You've Arrived at Crime Scene]({{site.baseurl}}/memories/M01-Crime-Scene-000/)
</div>{:.if .condition-senators-daughter .result-show }
</div>{:.if .condition-butcher .result-show }

</section>
------------------------------------
{:#butcher}
<section markdown="1"> 

{:.add-copy-below}
Description of the butcher. Paremedics are working on him. 

{:.dialogue}
DETECTIVE <br>This is your target, you'll be jacking into him. The paramedics are doing their best to keep him alive but he's not going to make it. He's our best bet to find out what happened here.  

[Zoom Out](#screen)
[Save to Memory](#butcher){:.memory .butcher .global}

</section>
------------------------------------
{:#anarchist-dick}
<section markdown="1"> 

{:.add-copy-below}
Description of Anarchist Dick.

{:.dialogue}
DETECTIVE <br>This is Anarchist Dick, was an AI gr, but left to start up a cult.    

[Zoom Out](#screen)
[Save to Memory](#anarchist-dick){:.memory .anarchist-dick .global}

</section>
------------------------------------
{:#journalist}
<section markdown="1"> 

![]({{site.baseurl}}/assets/fly-to-crime-scene/photo-journalist.jpg)

{:.add-copy-below}
Description of Journalist.

[Zoom Out](#screen)
[Save to Memory](#journalist){:.memory .journalist .global}

</section>
------------------------------------
{:#senators-daughter}
<section markdown="1"> 

{:.add-copy-below}
Description of the Senators Daughter.

[Zoom Out](#screen)
[Save to Memory](#senators-daughter){:.memory .senators-daughter .global}

</section>
------------------------------------
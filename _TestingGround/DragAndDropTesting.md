---
layout: memory
perspective: The Protagonist
title: "The Detective"
world-date: 2041-11-13T01:55:00 -500
characters: ["The Protagonist"]
location: Warehouse
catergories: #["",""]
---

[Detective GDoc](https://docs.google.com/document/d/1nW-jZX7d6i9uM_ZpIvzqjjK5mVNn_KalmAfzo3RqG98/edit)

<section markdown="1">

![Portrait of the Detective]({{site.baseurl}}/assets/protagonist-apartment/detectives-face-on-mirror-phone.jpg)

<div markdown="1" class="dropArea" data-responder="detective">
Instructions: Drag a memory/item to illicit a response from the detective.
</div>

---

{:.dialogue .npc data-npc="detective"}
detective <br>Took you long enough. I need you to do your thing with the man the paramedics are working on.  

---

[SetProgress](#){:.playerProgress data-playerProgress="5" }
[IncrementProgress](#){:.playerProgress data-increment="1" }
[DecrementProgress](#){:.playerProgress data-increment="-1" }

[Do not show this on level 5. ](#cut-lamb){:.if .condition-playerProgress-5 .result-hide}

[10 mins have past](#cut-lamb){:.if .condition-playerTime-10 .result-show}

[10 % complete](#cut-lamb){:.if .condition-playerCompleteness-10 .result-show}

[Back](/memories/M01-Crime-Scene-000/)
</section>

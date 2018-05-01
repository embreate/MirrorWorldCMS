---
title: Memories
permalink: "/memories/"
layout: page
---

<div>
  <h1>{{page.title}}</h1>

  {% assign milestones = "2000,2010,2020,2030,2040" | split: ","%}
  <nav>
    {% for milestone in milestones %}<a class="btn btn-primary" href="#{{milestone}}">{{milestone}}</a>{% endfor %}
  </nav>

  {% assign memories = site.memories | sort: 'world-date' %}
  {% assign milestoneIndex = 0 | plus: 0 %}

  {% for milestone in milestones %}
    {% assign milestoneYear = milestone | plus: 0 %}
    <h2 id="">{{milestone}}</h2>
    {% for memory in memories %}
      {% assign memoryYear = memory.world-date | date: "%Y" | plus: 0 %}
      {% assign nextMilestone = milestoneYear | plus: 10 %}
      {% if milestoneYear > memoryYear %}
      {% elsif nextMilestone <= memoryYear %}
      {% else %}
        <div class="row mb-1">
          <div class="col-sm-1 pr-0">
            <img class="img-fluid" src="{{site.baseurl}}/assets/blank-16x9-576x324.jpg" />
          </div>
          <div class="col-sm-5">
            <a href="{{site.baseurl}}{{ memory.url }}">
              {{ memory.title }}
            </a>
          </div>
          <div class="col-sm-3">
              <i class="fas fa-eye"></i> {{ memory.perspective }}
              <br>
              <i class="fas fa-meh"></i>
              {% for character in memory.characters %}
                {% if character != memory.perspective %}
                  {{ character }}{% if forloop.last != true %},{% endif %}
                {% endif %}
              {% endfor %}
          </div>
          <div class="col-sm-3">
              <i class="fas fa-calendar-alt"></i> {{ memory.world-date | date: "%Y" }}
              <br>
              <i class="fas fa-clock"></i> {{ memory.world-date | date: "%I:%M%p" }}
              <br>
              <i class="fas fa-building"></i> {{ memory.location }}
          </div>
        </div>
      {% endif %}
    {% endfor %}
  {% endfor %}
</div>

---
layout: null
---
/* This file will get parsed an by Liquid/Jekyll.
 * Converting yml files found in the _data folder
 * allowing easier access for js.
 */
 // jsonify: simple way of converting to json format.
let globalInventory =  {{site.data.gameVariables.GlobalInventory |jsonify}};
let localInventory = {{site.data.gameVariables.LocalInventory | jsonify}};
let memoryInventory = {{site.data.gameVariables.MemoryInventory| jsonify}};

let org_globalInventory= globalInventory.slice(0);
let org_localInventory= localInventory.slice(0);
let org_memoryInventory= memoryInventory.slice(0);

let detectiveResponse = {{ site.data.detective | jsonify }};
let allItems = {{ site.data.items | jsonify }};

//  more control over converting to json.
let allMemories = [
  {%-for memory in site.data.memories-%}
  {%-capture ID -%}{{ memory.Id }}ID{%-endcapture-%}
    {%-if ID != "ID"-%}
      { "Id": "{{ memory.Id }}",
        "Label": "{{ memory.Label }}",
        "Description": "{{ memory.Description }}",
        "Type": "{{ memory.Type }}",
        "Owner": "{{ memory.Owner }}",
        "Relavence": "{{ memory.Relavence }}",
        "Category": "{{ memory.Categories }}",
        "Tags": "{{ memory.Tags }}",
        "Creatable": "{{ memory.Creatable }}",
        "Date": "{{memory.Date }}",
        "Time": "{{memory.Time }}",
        "Image":"{{memory.Image-Src}}"}
        {%-unless forloop.last-%},{%-endunless-%}
    {%-endif-%}
  {%-endfor-%}
];

{%-if page.layout == 'memory'-%}
let playerProgress={{site.data.gameVariables.PlayerProgress| jsonify}};

  if (Cookies.get("playerProgress") != undefined) {
     playerProgress= parseInt(Cookies.get("playerProgress"));
  }

let GameLength ={{site.data.gameVariables.GameLength| jsonify}};
let playerTime = 0;
if (Cookies.get("playerTime") != undefined) {
   playerTime= parseInt(Cookies.get("playerTime"));
}

let playerCompleteness= 0;
if (Cookies.get("playerCompleteness") != undefined) {
   playerCompleteness= parseInt(Cookies.get("playerCompleteness"));
}
{%-endif-%}

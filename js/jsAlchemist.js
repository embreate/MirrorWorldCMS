"use strict";

let Alchemist = new jsAlchemist();

function jsAlchemist() {
  this.combinations = new Map();
  this.add = function(formula, result) {

    if (!formula || !result) return;
    // split the forumula
    let form = formula.replace(/\s/g, '');
    let formulas = form.split(',');

    for (let i = 0; i < formulas.length; i++) {
      let items = formulas[i].split('+');

      if (items.length !== 2) {
        console.log(`Invalid forumula for ${result}: ${formulas[i]}`);
        continue;
      }

      for (let j = 0; j < items.length; j++) {
        if (!this.combinations.has(items[j])) this.combinations.set(items[j], new Map());
        let combos = this.combinations.get(items[j]);
        combos.set(items[1 - j], result);
      }
    }
  };
  this.combine = function(itemA, itemB) {

    let formulas = this.combinations.get(itemA);

    if (formulas !== undefined) return formulas.get(itemB);

    else return undefined;

  }
}

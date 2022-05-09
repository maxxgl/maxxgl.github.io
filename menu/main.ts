// run with `tsc -w --strict menu/main.ts`
class Ingredient {
  name: string;
  calories: number;
  protein: number;
  servingAmount: number;
  servingUnit?: string;

  constructor(
    name: string,
    calories: number,
    protein: number,
    servingAmount: number,
    servingUnit: string = ""
  ) {
    this.name = name;
    this.calories = calories;
    this.protein = protein;
    this.servingAmount = servingAmount;
    this.servingUnit = servingUnit;
  }
}

type RecipeEntryList = [quantity: number, item: Ingredient | MenuItem][];

class MenuItem extends Ingredient {
  ingredients: RecipeEntryList;
  time: string;

  constructor(name: string, recipe: RecipeEntryList, time: string = '00:00') {
    let calories = 0;
    let protein = 0;

    for (const item of recipe) {
      calories += Math.round(item[1].calories * item[0]);
      protein += Math.round(item[1].protein * item[0]);
    }

    super(name, calories, protein, 1);
    this.ingredients = recipe;
    this.time = time;
  }
}






// Food -------------------------------------------------------------------------------------------
const base = {
  muffin:       new Ingredient("Blueberry Muffin", 610,  8,    1),
  acai:         new Ingredient("Acai Bowl",        230,  4,    1),
  fruit:        new Ingredient("Frozen Berries",    80,  1, 0.75,   "cup"),
  icecream:     new Ingredient("Ice Cream",        170,  3, 0.67,   "cup"),
  protein:      new Ingredient("Protein Powder",   150, 21,    2, "scoop"),
  egg:          new Ingredient("Egg",               70,  6,    1),
  butter:       new Ingredient("Butter",           100,  0,    1,  "tbsp"),
  bread:        new Ingredient("Bread",             70,  2,    1, "slice"),
  ham:          new Ingredient("Ham",               70,  9,    2,    "oz"),
  cheese:       new Ingredient("Cheese",           110,  7, 0.33,   "cup"),
  ketchup:      new Ingredient("Ketchup",           20,  0,    1,  "tbsp"),
  oj:           new Ingredient("Orange Juice",     120,  2,    8,    "oz"),
  chicken:      new Ingredient("Chicken Tender",   100, 23,    4,    'oz'),
  tomato:       new Ingredient("Cherry Tomatoes",   50,  1,    1,   'cup'),
  springMix:    new Ingredient("Spring Mix",        20,  2,    2,   'cup'),
  mustard:      new Ingredient("Mustard",            5,  0,    1,   'tsp'),
  pickle:       new Ingredient("Pickle",             0,  0,    1),
  tortilla:     new Ingredient("Tortilla",         210,  5,    1),
  rice:         new Ingredient("Rice",             210,  8, 0.75,   'cup'),
  brocolli:     new Ingredient("Brocolli",          30,  3,    1,   'cup'),
  riceKrispie:  new Ingredient("Rice Krispie",      90,  0,    1),
  rxBar:        new Ingredient("RX Bar",           210,  12,   1),
  apple:        new Ingredient("Apple",            100,  0,    1),
} as const;

const items = {
  smoothie: new MenuItem("Smoothie", [
    [1, base.fruit],
    [1, base.protein],
    [1, base.icecream]
  ]),
  eggSandwich: new MenuItem("Egg Sandwich", [
    [0.2, base.butter],
    [2, base.bread],
    [2, base.egg],
    [0.5, base.ham],
    [0.5, base.cheese],
    [1, base.ketchup]
  ]),
  wrap: new MenuItem("Wrap", [
    [1, base.tortilla],
    [.8, base.chicken],
    [1, base.mustard],
    [1, base.springMix],
    [.5, base.tomato],
    [1, base.pickle],
  ]),
  slop: new MenuItem("Slop", [
    [2, base.rice],
    [1.5, base.chicken],
    [2, base.brocolli],
  ]),
} as const;

const food = { ...items, ...base };

const mealPlan = new MenuItem('Meal Plan', [
    new MenuItem('Pre-Run', [
      [1, food.smoothie],
      [0.5, food.muffin],
    ], '08:30'),
    new MenuItem('Breakfast', [
      [1, food.eggSandwich],
      [1, food.oj],
    ], '10:30'),
    new MenuItem('Lunch', [[2, food.wrap]], "13:00"),
    new MenuItem('Dinner', [[1, food.slop]], '15:00'),
    new MenuItem('Pre-BJJ', [[1, food.riceKrispie]], '17:30'),
    new MenuItem('Post-BJJ', [
      [1, food.rxBar],
      [1, food.apple],
    ], '19:30'),
    new MenuItem('Supper', [[1, food.slop]], '20:00'),
    new MenuItem('Midnight Snack', [[1, food.slop]], '23:00'),
  ].map(meal => [1, meal])
);










// HTML -------------------------------------------------------------------------------------------
let html = document.getElementById("app");
if (!html) {
  throw Error('Element not found')
}

const menuItemIngredients = (recipe: RecipeEntryList) => recipe.reduce<string>((prev, curr) => {
  return prev += `
    <div class="item">
      <div>${curr[0] * curr[1].servingAmount} ${curr[1].servingUnit}</div>
      <div>${curr[1].name}</div>
      <div>${Math.round(curr[1].calories * curr[0])}</div>
      <div>${Math.round(curr[1].protein * curr[0])}</div>
    </div>
  `;
}, ``);







for (const [q, meal] of mealPlan.ingredients) {
  let contents = ``;
  if (!(meal instanceof MenuItem)) {
    throw Error('this should be a meal')
  }

  for (const entry of meal.ingredients) {
    const { name, calories, protein } = entry[1];

    if (entry[1] instanceof MenuItem) {
      const details = menuItemIngredients(entry[1].ingredients);

      contents += `
        <details>
          <summary class="item">
            <div>${entry[0] * entry[1].servingAmount} ${entry[1].servingUnit}</div>
            <div>${name}<span class="dots">&nbsp;&bull;&bull;&bull;</span></div>
            <div>${Math.round(calories * entry[0])}</div>
            <div>${Math.round(protein * entry[0])}</div>
          </summary>
          <div class="details">
            ${details}
          </div>
        </details>
      `;
    } else {
      contents += `
        <div class="item">
          <div>${entry[0] * entry[1].servingAmount}${entry[1].servingUnit}</div>
          <div>${name}</div>
          <div>${Math.round(calories * entry[0])}</div>
          <div>${Math.round(protein * entry[0])}</div>
        </div>
      `;
    }
  }

  html.insertAdjacentHTML("beforeend", `
    <div class="meal">
      <div class="item header">
        <h2>${meal.name}<small><small>&nbsp;${meal.time}</small></small></h2>
        <div>${meal.calories}</div>
        <div>${meal.protein}</div>
      </div>
      ${contents}
    </div>
  `);
}




// Total ------------------------------------------------------------------------------------------
html.insertAdjacentHTML("beforeend", `
  <div class="meal legend">
    <div class="item total">
      <div>Total</div>
      <div></div>
      <div>${mealPlan.calories}</div>
      <div>${mealPlan.protein}</div>
    </div>
  </div>
`);

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// run with `tsc -w --strict menu/main.ts`
var Ingredient = /** @class */ (function () {
    function Ingredient(name, calories, protein, servingAmount, servingUnit) {
        if (servingUnit === void 0) { servingUnit = ""; }
        this.name = name;
        this.calories = calories;
        this.protein = protein;
        this.servingAmount = servingAmount;
        this.servingUnit = servingUnit;
    }
    return Ingredient;
}());
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem(name, recipe, time) {
        if (time === void 0) { time = '00:00'; }
        var _this = this;
        var calories = 0;
        var protein = 0;
        for (var _i = 0, recipe_1 = recipe; _i < recipe_1.length; _i++) {
            var item = recipe_1[_i];
            calories += Math.round(item[1].calories * item[0]);
            protein += Math.round(item[1].protein * item[0]);
        }
        _this = _super.call(this, name, calories, protein, 1) || this;
        _this.ingredients = recipe;
        _this.time = time;
        return _this;
    }
    return MenuItem;
}(Ingredient));
// Food -------------------------------------------------------------------------------------------
var base = {
    muffin: new Ingredient("Blueberry Muffin", 610, 8, 1),
    acai: new Ingredient("Acai Bowl", 230, 4, 1),
    fruit: new Ingredient("Frozen Berries", 80, 1, 0.75, "cup"),
    icecream: new Ingredient("Ice Cream", 170, 3, 0.67, "cup"),
    protein: new Ingredient("Protein Powder", 150, 21, 2, "scoop"),
    egg: new Ingredient("Egg", 70, 6, 1),
    butter: new Ingredient("Butter", 100, 0, 1, "tbsp"),
    bread: new Ingredient("Bread", 70, 2, 1, "slice"),
    ham: new Ingredient("Ham", 70, 9, 2, "oz"),
    cheese: new Ingredient("Cheese", 110, 7, 0.33, "cup"),
    ketchup: new Ingredient("Ketchup", 20, 0, 1, "tbsp"),
    oj: new Ingredient("Orange Juice", 120, 2, 8, "oz"),
    chicken: new Ingredient("Chicken Tender", 100, 23, 4, 'oz'),
    tomato: new Ingredient("Cherry Tomatoes", 50, 1, 1, 'cup'),
    springMix: new Ingredient("Spring Mix", 20, 2, 2, 'cup'),
    mustard: new Ingredient("Mustard", 5, 0, 1, 'tsp'),
    pickle: new Ingredient("Pickle", 0, 0, 1),
    tortilla: new Ingredient("Tortilla", 210, 5, 1),
    rice: new Ingredient("Rice", 210, 8, .75, 'cup'),
    brocolli: new Ingredient("Brocolli", 30, 3, 1, 'cup'),
    riceKrispie: new Ingredient("Rice Krispie", 90, 0, 1),
    rxBar: new Ingredient("RX Bar", 210, 12, 1),
    apple: new Ingredient("Apple", 100, 0, 1)
};
var items = {
    smoothie: new MenuItem("Smoothie", [
        [1, base.fruit],
        [1, base.protein],
        [1, base.icecream]
    ]),
    eggSandwich: new MenuItem("Egg Sandwich", [
        [0.2, base.butter],
        [2, base.bread],
        [1, base.egg],
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
    ])
};
var food = __assign(__assign({}, items), base);
var mealPlan = new MenuItem('Meal Plan', [
    new MenuItem('Pre-Run', [
        [1, food.smoothie],
        [0.5, food.muffin],
    ], '08:30'),
    new MenuItem('Breakfast', [
        [2, food.eggSandwich],
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
].map(function (meal) { return [1, meal]; }));
// HTML -------------------------------------------------------------------------------------------
var html = document.getElementById("app");
if (!html) {
    throw Error('Element not found');
}
var menuItemIngredients = function (recipe) { return recipe.reduce(function (prev, curr) {
    return prev += "\n    <div class=\"item\">\n      <div>".concat(curr[0] * curr[1].servingAmount, " ").concat(curr[1].servingUnit, "</div>\n      <div>").concat(curr[1].name, "</div>\n      <div>").concat(Math.round(curr[1].calories * curr[0]), "</div>\n      <div>").concat(Math.round(curr[1].protein * curr[0]), "</div>\n    </div>\n  ");
}, ""); };
for (var _i = 0, _a = mealPlan.ingredients; _i < _a.length; _i++) {
    var _b = _a[_i], q = _b[0], meal = _b[1];
    var contents = "";
    if (!(meal instanceof MenuItem)) {
        throw Error('this should be a meal');
    }
    for (var _c = 0, _d = meal.ingredients; _c < _d.length; _c++) {
        var entry = _d[_c];
        var _e = entry[1], name_1 = _e.name, calories = _e.calories, protein = _e.protein;
        if (entry[1] instanceof MenuItem) {
            var details = menuItemIngredients(entry[1].ingredients);
            contents += "\n        <details>\n          <summary class=\"item\">\n            <div>".concat(entry[0] * entry[1].servingAmount, " ").concat(entry[1].servingUnit, "</div>\n            <div>").concat(name_1, "<span class=\"dots\">&nbsp;&bull;&bull;&bull;</span></div>\n            <div>").concat(Math.round(calories * entry[0]), "</div>\n            <div>").concat(Math.round(protein * entry[0]), "</div>\n          </summary>\n          <div class=\"details\">\n            ").concat(details, "\n          </div>\n        </details>\n      ");
        }
        else {
            contents += "\n        <div class=\"item\">\n          <div>".concat(entry[0] * entry[1].servingAmount).concat(entry[1].servingUnit, "</div>\n          <div>").concat(name_1, "</div>\n          <div>").concat(Math.round(calories * entry[0]), "</div>\n          <div>").concat(Math.round(protein * entry[0]), "</div>\n        </div>\n      ");
        }
    }
    html.insertAdjacentHTML("beforeend", "\n    <div class=\"meal\">\n      <div class=\"item header\">\n        <h2>".concat(meal.name, "<small><small>&nbsp;").concat(meal.time, "</small></small></h2>\n        <div>").concat(meal.calories, "</div>\n        <div>").concat(meal.protein, "</div>\n      </div>\n      ").concat(contents, "\n    </div>\n  "));
}
// Total ------------------------------------------------------------------------------------------
html.insertAdjacentHTML("beforeend", "\n  <div class=\"meal legend\">\n    <div class=\"item total\">\n      <div>Total</div>\n      <div></div>\n      <div>".concat(mealPlan.calories, "</div>\n      <div>").concat(mealPlan.protein, "</div>\n    </div>\n  </div>\n"));

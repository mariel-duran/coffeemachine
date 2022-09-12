// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const coffeeMachine = {
    Water: 400,
    Milk: 540,
    Beans: 120,
    Cups: 9,
    Money: 550,
    coffeeOptions: {
        // coffee type : water, milk, beans, price
        "espresso": [250, 0, 16, 4],
        "latte": [350, 75, 20, 7],
        "cappuccino": [200, 100, 12, 6]
    }
};

const buy = function () {
    let options = ["espresso", "latte", "cappuccino"]
    let userOption = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino; To go back, say 'back': ");
    if (userOption === "back"){
        return
    }
    userOption = Number(userOption) - 1;
    if (confirmProduction(options[userOption]) !== "enough") {
        return console.log(`Sorry, not enough ${confirmProduction(options[userOption])}`)
    }
    console.log("I have enough resources, making you a coffee!")
    let supplies = ["Water", "Milk", "Beans"];
    for (let i = 0; i < 3; i++) {
        coffeeMachine[supplies[i]] -= coffeeMachine.coffeeOptions[options[userOption]][i];
    }
    coffeeMachine.Money += coffeeMachine.coffeeOptions[options[userOption]][3];
    coffeeMachine.Cups -= 1;
}

// function to check whether the machine has enough resources to produce 1 cup of the desired coffee.
// Returns true if machine has enough resources and false if it doesn't.
const confirmProduction = function (coffeeType) {
    let supplies = ["Water", "Milk", "Beans"];
    let missing = [];

    if (coffeeMachine.Cups === 0) {
        return "cups";
    }
    for (let i = 0; i < 3; i++) {
        if ((coffeeMachine[supplies[i]] / coffeeMachine.coffeeOptions[coffeeType][i]) < 1) {
            missing.push(supplies[i]);
        }
    }
    if (missing.length >= 1){
        return missing;
    }
    return "enough"
}

const fill = function () {
    let mlWater = Number(input("Write how many ml of water you want to add: "));
    coffeeMachine.Water += mlWater;
    let mlMilk = Number(input("Write how many ml of milk you want to add: "));
    coffeeMachine.Milk += mlMilk;
    let gBeans = Number(input("Write how many grams of coffee beans you want to add: "));
    coffeeMachine.Beans += gBeans;
    let cups = Number(input("Write how many disposable cups you want to add: "));
    coffeeMachine.Cups += cups;
}

const machineStatus = function () {
    console.log(`
    The coffee machine has:
    ${coffeeMachine.Water} ml of water
    ${coffeeMachine.Milk} ml of milk
    ${coffeeMachine.Beans} g of coffee beans
    ${coffeeMachine.Cups} disposable cups
    ${coffeeMachine.Money} of money`)
}

const take = function () {
    console.log(`I gave you $${coffeeMachine.Money}`);
    coffeeMachine.Money = 0;
}

while (true) {
    let actions = ["buy", "fill", "take", "remaining"];
    let action = input("Write action (buy, fill, take, remaining, exit): ");
    if (action === "exit") {
        console.log("Thanks for using our machine. Come back soon!")
        break;
    }
    if (actions.includes(action)) {
        switch (action) {
            case "buy":
                buy();
                break;
            case "fill":
                fill();
                break;
            case "take":
                take();
                break;
            case "remaining":
                machineStatus();
                break;
        }
    }
}

import { TextGameEngine } from "./TextGameEngine.js";

const tge = new TextGameEngine();
tge.setStyles(["cb'red'"]);
tge.init();

await main();

async function main()
{
	tge.clear();
	tge.print("Welcome to the Text Game Engine");
	tge.print("Text Game Engine is a simple way to create text game");
	tge.print("Wiki: https://github.com/MixelTe/TextGameEngine/wiki");
	tge.print("Select language to continue:");
	const chosen = await tge.choose(["English", "Russian"]);
	if (chosen == 0)
	{
		tge.print("Select next topic:");
		const chosen = await tge.choose(["Engine features", "Game example"]);
		if (chosen == 0) await features_en();
		else await game_en();
	}
	else
	{
		tge.print("Выберите следующую тему:");
		const chosen = await tge.choose(["Возможности движка", "Пример игры"]);
		if (chosen == 0) await features_ru();
		else await game_ru();
	}
}
async function features_en()
{

}
async function features_ru()
{

}


async function game_en()
{
	tge.clear();
	tge.print("Welcome to the Text game!");
	tge.print("Enter character name:");
	const name = await tge.text(2);
	tge.print(`${name} enters the dungeon.`);
	await tge.wait(1);
	tge.print(`${name} noticed something!`);
	await tge.wait(1);
	tge.print("It's a door!");
	tge.print("There is a question on the door:");
	let answer = 0;
	let mistakes = 0;
	tge.print("What is 2+2?", true);
	answer = await tge.num();
	while (answer != 4)
	{
		if (mistakes >= 3)
		{
			tge.print(`You hear: "I'm kind today, so I'll open this door for you"`, true);
			break
		}
		tge.clear(mistakes == 0 ? 2 : 3);
		mistakes += 1;
		tge.print('You hear: "&0Wrong answer!&c". Try again.', true);
		tge.print("What is 2+2?");
		answer = await tge.num();
	}
	tge.print(`The door opened and ${name} entered the room.`);
	await tge.wait();
	tge.clear();

	tge.print("You are in the room.");
	tge.print("There is a table in the center of the room.");
	await tge.wait(2);
	tge.print("There are three potions of different colors on the table");
	tge.print(`What potion will you drink?`, true);
	const potionsF = ["^red^Red", "^blue^Blue", "^green^Green"];
	const potions = ["red", "blue", "green"];
	const potionI = await tge.choose(potionsF);
	tge.print(`${name} drinks ${potions[potionI]} potion`, true);
	await tge.wait();
	if (Math.random() >= 0.5) tge.print(`${name} opened eyes in the bed.`);
	else tge.print(`${name} went home happy.`);
	await tge.wait();
	tge.clear();

	tge.print("You are at home.");
	tge.print(`${name} goes to the kitchen.`);
	await tge.wait(2);
	tge.print(`${name} poured tea, and puts sugar.`);
	tge.print(`How many sugar cubes will you put in?`);
	const sugar = await tge.num(0, 5);
	tge.print(`${name} puts ${sugar} sugar cubes.`);
	await tge.wait(2);
	tge.print(`${name} sat down on the sofa and turned on the TV.`);
	tge.print(`Which channel should he turns on?`);
	const chanel = await tge.num(1, 15);
	tge.print(`${name} turned on channel ${chanel} and began to calmly drink tea.`);


	tge.print();
	tge.print();
	tge.print("The End!");
	tge.print();
	await tge.choose(["Exit game"]);
}
async function game_ru()
{
	tge.clear();
	tge.print("Welcome to the Text game!");
	tge.print("Enter character name:");
	const name = await tge.text(2);
	tge.print(`${name} enters the dungeon.`);
	await tge.wait(1);
	tge.print(`${name} noticed something!`);
	await tge.wait(1);
	tge.print("It's a door!");
	tge.print("There is a question on the door:");
	let answer = 0;
	let mistakes = 0;
	tge.print("What is 2+2?", true);
	answer = await tge.num();
	while (answer != 4)
	{
		if (mistakes >= 3)
		{
			tge.print(`You hear: "I'm kind today, so I'll open this door for you"`, true);
			break
		}
		tge.clear(mistakes == 0 ? 2 : 3);
		mistakes += 1;
		tge.print('You hear: "&0Wrong answer!&c". Try again.', true);
		tge.print("What is 2+2?");
		answer = await tge.num();
	}
	tge.print(`The door opened and ${name} entered the room.`);
	await tge.wait();
	tge.clear();

	tge.print("You are in the room.");
	tge.print("There is a table in the center of the room.");
	await tge.wait(2);
	tge.print("There are three potions of different colors on the table");
	tge.print(`What potion will you drink?`, true);
	const potionsF = ["^red^Red", "^blue^Blue", "^green^Green"];
	const potions = ["red", "blue", "green"];
	const potionI = await tge.choose(potionsF);
	tge.print(`${name} drinks ${potions[potionI]} potion`, true);
	await tge.wait();
	if (Math.random() >= 0.5) tge.print(`${name} opened eyes in the bed.`);
	else tge.print(`${name} went home happy.`);
	await tge.wait();
	tge.clear();

	tge.print("You are at home.");
	tge.print(`${name} goes to the kitchen.`);
	await tge.wait(2);
	tge.print(`${name} poured tea, and puts sugar.`);
	tge.print(`How many sugar cubes will you put in?`);
	const sugar = await tge.num(0, 5);
	tge.print(`${name} puts ${sugar} sugar cubes.`);
	await tge.wait(2);
	tge.print(`${name} sat down on the sofa and turned on the TV.`);
	tge.print(`Which channel should he turns on?`);
	const chanel = await tge.num(1, 15);
	tge.print(`${name} turned on channel ${chanel} and began to calmly drink tea.`);


	tge.print();
	tge.print();
	tge.print("The End!");
	tge.print();
	await tge.choose(["Exit game"]);
}
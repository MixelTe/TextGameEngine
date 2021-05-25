import { TextGameEngine, Titles } from "./TextGameEngine.js";

const tge = new TextGameEngine();
const titles = new Titles("Text Game");
tge.setStyles(["cb'red'"]);
tge.init(titles);

main();

async function main()
{
	console.log("Start main func");
	tge.clear();
	tge.print("Hello, it's a cool game!");
	tge.print("Enter character name:");
	const name = await tge.text(2);
	// const name = "Harry";
	tge.print(`${name} enters the dungeon.`);
	await tge.wait(1);
	tge.print(`${name} noticed something!`);
	await tge.wait(1);
	tge.print("It's a door!");
	tge.print("There is a question on the door:");
	if (!false)
	{
		let answer = 0;
		let firstMistake = true;
		tge.print("What is 2+2?", true);
		answer = await tge.num();
		while (answer != 4)
		{
			tge.clear(firstMistake ? 2 : 3);
			firstMistake = false;
			tge.print('You hear: "&0Wrong answer!&c". Try again.', true);
			tge.print("What is 2+2?");
			answer = await tge.num();
		}
	}
	else
	{
		tge.print("What is 2+2?", true);
		const answer = await tge.num(2, 20);
		if (answer != 4) tge.print(`You hear: "Wrong answer! But I'm kind today"`);
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
	tge.print(`${name} is hungry.`);
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
	await tge.choose(["Play again"]);
	setTimeout(main, 100);
	console.log("End main func");
}

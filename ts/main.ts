import { TextGameEngine, Titles } from "./TextGameEngine.js";

const tge = new TextGameEngine();
const titles = new Titles("Text Game");
const gameEl = tge.init(titles);
document.body.appendChild(gameEl);
main();

async function main()
{
	console.log("Start main func");
	tge.clear();
	tge.print("Hello, it's a cool game!");
	tge.print("Enter character name:");
	const name = await tge.text();
	// const name = "Harry";
	tge.print(`${name} enter the dungeon.`);
	await tge.wait(2);
	tge.print(`${name} notice something!`);
	await tge.wait(2);
	tge.print("It's a door!");
	tge.print("There is a question on the door:");
	if (!true)
	{
		let answer = 0;
		while (answer != 4)
		{
			tge.print("What is 2+2?", true);
			let answer = await tge.num();
			if (answer == 4) break;
			tge.clear(1);
			tge.print('You hear: "Wrong answer!". Try again.');
		}
	}
	else
	{
		const answer = await tge.num();
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
	const potions = ["Red", "Blue", "Green"];
	const potionI = await tge.choose(potions);
	tge.print(`${name} drinks ${potions[potionI].toLowerCase()} potion`, true);
	await tge.wait();
	if (Math.random() >= 0.5) tge.print(`${name} opened eyes in the bed.`);
	else tge.print(`${name} went home happy.`);
	await tge.wait();
	tge.clear();

	tge.print("You are at home.");
	tge.print(`${name} are hungry.`);
	tge.print(`${name} goes to the kitchen.`);
	await tge.wait(2);
	tge.print(`${name} poured tea, and puts sugar.`);
	tge.print(`How many sugar cubes will you put in?`);
	const sugar = await tge.num(0, 5);
	tge.print(`${name} puts ${sugar} sugar cubes.`);
	await tge.wait(2);
	tge.print(`${name} sat down on the sofa and turned on the TV.`);
	tge.print(`Which channel should he turn on?`);
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
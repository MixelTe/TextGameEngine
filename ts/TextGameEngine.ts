/** Engine for text games*/
export class TextGameEngine
{
	private linesHolder: HTMLDivElement = document.createElement("div");
	private waitDiv: HTMLDivElement = document.createElement("div");
	private lines: Line[] = [];

	/**
	 * Creates all elements
	 * @returns Main HTMLDivElement of game
	 */
	public init(titles = new Titles()): HTMLDivElement
	{
		const mainDiv = document.createElement("div");

		return mainDiv;
	}
	/**
	 * Print text to console
	 * @param newParagraph Add space after previous text
	 */
	public print(text: string = "", newParagraph = false)
	{
		const line = new LineText(text, newParagraph);
		this.lines.push(line)
		this.linesHolder.appendChild(line.mainEl);
	}
	/**
	 * Ask user for a number
	 * @param min Min number, null - no limit
	 * @param max Max number, null - no limit
	 * @param useSelect Use select if there are less then 16 int options
	 */
	public async num(min: number | null = null, max: number | null = null, useSelect = true)
	{
		if (useSelect && typeof max == "number" && typeof min == "number" && max - min < 16)
		{
			min = Math.ceil(min);
			max = Math.floor(max);
			const options = [];
			for (let i = min; i <= max; i++) options.push(i);
			const line = new LineChoose(options);
			this.addLine(line);
			const result = await line.ask();
			return options[result];
		}
		else
		{
			const line = new LineGetNum(min, max);
			this.addLine(line);
			const result = await line.ask();
			return result;
		}
	}
	/**
	 * Ask user for a text
	 * @param max Max text length, -1 - infinite
	 * @param min Min text length
	 */
	public async text(max = -1, min = 0, trimSpaces = true, allowSpaces = true)
	{
		const line = new LineGetText(min, max, trimSpaces, allowSpaces);
		this.addLine(line);
		const result = await line.ask();
		return result;
	}
	/**
	 * Ask the user to choose one of the options
	 * @returns Index of chosen option
	 */
	public async choose(options: string[], everyAtNewLine = false)
	{
		const line = new LineChoose(options);
		this.addLine(line);
		const result = await line.ask();
		return result;
	}
	/**
	 * @param seconds Seconds to wait, -1 - until user tap continue button
	 */
	public async wait(seconds = -1)
	{
		if (seconds < 0)
		{
			this.waitDiv.classList.add("wait-inf");
			let promiseResolve: () => void;
			const onClick = () =>
			{
				this.waitDiv.classList.remove("wait-inf");
				this.waitDiv.removeEventListener("click", onClick);
				promiseResolve();
			}
			return new Promise<void>((resolve, reject) =>
			{
				promiseResolve = resolve;
				this.waitDiv.addEventListener("click", onClick);
			});
		}
		else if (seconds > 0)
		{
			this.waitDiv.classList.add("wait-time");
			let promiseResolve: () => void;
			const onTime = () =>
			{
				this.waitDiv.classList.remove("wait-time");
				promiseResolve();
			}
			return new Promise<void>((resolve, reject) =>
			{
				promiseResolve = resolve;
				setTimeout(onTime, seconds * 1000);
			});
		}
	}
	/**
	 * @param lineCount Line count to remove, -1 to remove all lines
	 */
	public clear(lineCount = -1)
	{
		const count = lineCount >= 0 ? lineCount : this.lines.length;
		for (let i = 0; i < count; i++) {
			const line = this.lines.pop();
			if (line == undefined) break;

			line.rejectPromise();
			this.linesHolder.removeChild(line.mainEl);
		}
	}

	private addLine(line: Line)
	{
		this.linesHolder.appendChild(line.mainEl);
		this.lines.push(line);
	}
}

/**
 * All texts used in TextGameEngine
 */
export class Titles
{
	/**
	 * All texts used in TextGameEngine
	 *
	 * @param titles Titles in order: title, tapToCon
	 */
	constructor(...titles: string[])
	{
		const len = titles.length;
		if (len > 0) this.title = titles[0];
		if (len > 1) this.tapToCon = titles[1];
	}

	/**Title of game*/
	public title = "Text Game Engine";
	/**Text "Tap to continue" when called TextGameEngine.wait with -1*/
	public tapToCon = "Tap to continue";
}

class Line
{
	public mainEl: HTMLDivElement = document.createElement("div");
	private resolve: ((result: any) => void) | undefined = undefined;
	private reject: ((reason?: any) => void) | undefined = undefined;

	public ask(): Promise<any>
	{
		return <Promise<any>>this.createPromise();
	}
	public rejectPromise()
	{
		if (this.reject != null && this.resolve != null)
        {
            this.reject("Line removed before resolve");
            this.reject = undefined;
            this.resolve = undefined;
        }
	}
	protected setPromiseResult(result: any)
	{
		if (this.resolve != null)
        {
            this.resolve(result);
            this.reject = undefined;
            this.resolve = undefined;
        }
	}
	protected createPromise()
	{
        return new Promise<any>((resolve, reject) =>
        {
            this.resolve = resolve;
            this.reject = reject;
        });
	}
}
class LineText extends Line
{
	constructor(text: string, newParagraph: boolean)
	{
		super();
	}
}
class LineGetNum extends Line
{
	constructor(min: number | null, max: number | null)
	{
		super();
	}

	public ask(): Promise<number>
	{
		return <Promise<number>>this.createPromise();
	}
}
class LineGetText extends Line
{
	constructor(min: number, max: number, trimSpaces: boolean, allowSpaces: boolean)
	{
		super();
	}

	public ask(): Promise<string>
	{
		return <Promise<string>>this.createPromise();
	}
}
class LineChoose extends Line
{
	constructor(options: (string | number)[])
	{
		super();
	}

	public ask(): Promise<number>
	{
		return <Promise<number>>this.createPromise();
	}
}
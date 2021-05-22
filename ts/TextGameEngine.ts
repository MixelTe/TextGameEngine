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

	}
	/**
	 * Ask user for a number
	 * @param min Min number, null - no limit
	 * @param max Max number, null - no limit
	 * @param useSelect Use select if there are less then 16 int options
	 */
	public async num(min: number | null = null, max: number | null = null, useSelect = true)
	{

	}
	/**
	 * Ask user for a text
	 * @param max Max text length, -1 - infinite
	 * @param min Min text length
	 */
	public async text(max = -1, min = 0, trimSpaces = true, allowSpaces = true)
	{

	}
	/**
	 * Ask the user to choose one of the options
	 * @returns Index of chosen option
	 */
	public async choose(options: string[], everyAtNewLine = false)
	{

	}
	/**
	 * @param seconds Seconds to wait, -1 - until user tap continue button
	 */
	public async wait(seconds = -1)
	{

	}
	/**
	 * @param lineCount Line count to remove, -1 to remove all lines
	 */
	public clear(lineCount = -1)
	{

	}

	private async addLine(line: Line)
	{

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
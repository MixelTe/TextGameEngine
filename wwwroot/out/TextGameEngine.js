/** Engine for text games*/
export class TextGameEngine {
    constructor() {
        this.linesHolder = Div("TextGameEngine-lines");
        this.waitDiv = Div("TextGameEngine-wait");
        this.mainDiv = Div("TextGameEngine-window");
        this.styles = new TextStyles();
        this.lines = [];
    }
    /**
     * Creates all elements
     * @param appendToBody append main HTMLDivElement to body
     * @returns Main HTMLDivElement of game
     */
    init(titles = new Titles(), appendToBody = true) {
        log("TextGameEngine: init");
        const themeDiv = Div("TextGameEngine-theme");
        this.mainDiv = Div("TextGameEngine-window", [
            Div("TextGameEngine-main", [
                Div("TextGameEngine-header", [
                    this.createSourceCodeEl(),
                    Div("TextGameEngine-version", [this.styles.style(titles.version)]),
                    Div("TextGameEngine-title", [this.styles.style(titles.title)]),
                    themeDiv,
                ]),
                Div("TextGameEngine-console", [
                    Div("TextGameEngine-console-space"),
                    this.linesHolder,
                ]),
                this.waitDiv,
            ]),
        ]);
        themeDiv.appendChild(this.createThemeSwitch());
        this.waitDiv.appendChild(Div("TextGameEngine-wait-text", [this.styles.style(titles.tapToCon)]));
        for (let i = 0; i < 3; i++)
            this.waitDiv.appendChild(Div("TextGameEngine-wait-bubble"));
        if (appendToBody)
            document.body.appendChild(this.mainDiv);
        return this.mainDiv;
    }
    createThemeSwitch() {
        const label = document.createElement("label");
        label.classList.add("TextGameEngine-switch");
        const input = document.createElement("input");
        input.type = "checkbox";
        const span = document.createElement("span");
        span.classList.add("TextGameEngine-slider");
        label.appendChild(input);
        label.appendChild(span);
        let nightTheme = localStorage.getItem("nightTheme") != "true";
        const setTheme = () => {
            input.checked = nightTheme;
            nightTheme = !nightTheme;
            if (nightTheme) {
                localStorage.setItem("nightTheme", "true");
                this.mainDiv.classList.remove("theme-light");
                this.mainDiv.classList.add("theme-dark");
            }
            else {
                localStorage.setItem("nightTheme", "false");
                this.mainDiv.classList.add("theme-light");
                this.mainDiv.classList.remove("theme-dark");
            }
        };
        input.addEventListener("change", setTheme);
        setTheme();
        return label;
    }
    createSourceCodeEl() {
        const sourceCode = document.createElement("img");
        sourceCode.classList.add("TextGameEngine-sourceCode");
        sourceCode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEyRTk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTE3OEEyRjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTJDOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTJEOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+FYrpWAAABrNJREFUeNrkW2ls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";
        sourceCode.addEventListener("click", () => {
            open("https://github.com/MixelTe/TextGameEngine", "_blank");
        });
        return sourceCode;
    }
    /**
     * Set styles that wil be used with &number&
     * @param useStyles Set to false to disable text formating
     */
    setStyles(styles, useStyles = true) {
        this.styles.setStyles(styles);
        this.styles.useStyles = useStyles;
    }
    /**
     * Print text to console
     * @param newParagraph Add space after previous text
     */
    print(text = "", newParagraph = false) {
        log("TextGameEngine: print:", text, "newParagraph:", newParagraph);
        const line = new LineText(text, newParagraph, this.styles);
        this.addLine(line);
    }
    /**
     * Ask player for a number
     * @param min Min number, null - no limit
     * @param max Max number, null - no limit
     * @param useChoose Use choose if there are less then 16 int options
     */
    async num(min = null, max = null, useChoose = true) {
        if (useChoose && typeof max == "number" && typeof min == "number" && max - min < 16) {
            min = Math.ceil(min);
            max = Math.floor(max);
            log("TextGameEngine: num (select)", "min:", min, "max:", max);
            const options = [];
            for (let i = min; i <= max; i++)
                options.push(i);
            const line = new LineChoose(options, false, true, this.styles);
            this.addLine(line);
            const result = await line.ask();
            return options[result];
        }
        else {
            log("TextGameEngine: num: min:", min, "max:", max);
            const line = new LineGetNum(min, max);
            this.addLine(line);
            const result = await line.ask();
            return result;
        }
    }
    /**
     * Ask player for a text
     * @param min Min text length
     * @param max Max text length, -1 - no limit
     */
    async text(min = 0, max = -1, allowSpaces = true, trimSpaces = true) {
        log("TextGameEngine: text: max:", max, "min:", min, "trimSpaces:", trimSpaces, "allowSpaces:", allowSpaces);
        const line = new LineGetText(min, max, trimSpaces, allowSpaces);
        this.addLine(line);
        const result = await line.ask();
        return result;
    }
    /**
     * Ask the player to choose one of the options
     * @param removeNotChosen Remove not chosen options after choice
     * @returns Index of chosen option
     */
    async choose(options, everyAtNewLine = false, removeNotChosen = false) {
        log("TextGameEngine: choose: newLine:", everyAtNewLine, "options:", options);
        const line = new LineChoose(options, everyAtNewLine, removeNotChosen, this.styles);
        this.addLine(line);
        const result = await line.ask();
        return result;
    }
    /**
     * @param seconds Seconds to wait, -1 - until player tap continue button
     */
    async wait(seconds = -1) {
        if (seconds < 0) {
            log("TextGameEngine: wait-inf");
            this.waitDiv.classList.add("TextGameEngine-wait-inf");
            let promiseResolve;
            const onClick = () => {
                this.waitDiv.classList.remove("TextGameEngine-wait-inf");
                window.removeEventListener("click", onClick);
                this.mainDiv.removeEventListener("keypress", onKeypress);
                log("TextGameEngine: wait-inf-%cresolve%c", "color:lime", "");
                promiseResolve();
            };
            const onKeypress = (e) => {
                if (e.key == "Enter")
                    onClick();
            };
            return new Promise((resolve, reject) => {
                promiseResolve = resolve;
                window.addEventListener("keypress", onKeypress);
                this.waitDiv.addEventListener("click", onClick);
            });
        }
        else if (seconds > 0) {
            log(`TextGameEngine: wait - %c${seconds}%csec`, "color:#9881f6", "");
            this.waitDiv.classList.add("TextGameEngine-wait-time");
            let promiseResolve;
            const onTime = () => {
                this.waitDiv.classList.remove("TextGameEngine-wait-time");
                log(`TextGameEngine: wait - %c${seconds}%csec-%cresolve%c`, "color:#9881f6", "", "color:lime", "");
                promiseResolve();
            };
            return new Promise((resolve, reject) => {
                promiseResolve = resolve;
                setTimeout(onTime, seconds * 1000);
            });
        }
    }
    /**
     * @param lineCount Line count to remove, -1 to remove all lines
     */
    clear(lineCount = -1) {
        const count = lineCount >= 0 ? lineCount : this.lines.length;
        log(`TextGameEngine: clear - %c${count}%c (%c${lineCount}%c)`, "color:#9881f6", "", "color:#9881f6", "");
        for (let i = 0; i < count; i++) {
            const line = this.lines.pop();
            if (line == undefined) {
                log(`TextGameEngine: clear - %cUnexpected break!%c`, "color: red", "");
                break;
            }
            line.rejectPromise();
            this.linesHolder.removeChild(line.mainEl);
        }
    }
    addLine(line) {
        this.linesHolder.appendChild(line.mainEl);
        this.lines.push(line);
        this.linesHolder.parentElement?.scroll(0, this.linesHolder.clientHeight);
        line.focus();
    }
}
/**
 * All texts used in TextGameEngine
 */
export class Titles {
    /**
     * All texts used in TextGameEngine
     *
     * @param titles Titles in order: title, tapToCon
     */
    constructor(...titles) {
        /**Title of game*/
        this.title = "Text Game Engine";
        /**Text "Tap to continue" when called TextGameEngine.wait with -1*/
        this.tapToCon = "Tap here to continue";
        /**Engine version. Assign an empty string to remove version tag.*/
        this.version = "Version: 1.2"; //1.2
        const len = titles.length;
        if (len > 0)
            this.title = titles[0];
        if (len > 1)
            this.tapToCon = titles[1];
    }
}
class Line {
    constructor() {
        this.mainEl = Div("TextGameEngine-line");
        this.resolve = undefined;
        this.reject = undefined;
    }
    focus() { }
    ;
    ask() {
        return this.createPromise();
    }
    rejectPromise() {
        if (this.reject != null && this.resolve != null) {
            this.reject("TextGameEngine: Line removed before resolve");
            this.reject = undefined;
            this.resolve = undefined;
        }
    }
    setPromiseResult(result) {
        if (this.resolve != null) {
            log(`Line (${Object.getPrototypeOf(this).constructor.name}): setPromiseResult:`, result);
            this.resolve(result);
            this.reject = undefined;
            this.resolve = undefined;
        }
        else {
            log(`Line (${Object.getPrototypeOf(this).constructor.name}): %cUnexpected setPromiseResult!%c`, "color: red", "");
        }
    }
    createPromise() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
class LineText extends Line {
    constructor(text, newParagraph, styles) {
        super();
        const className = newParagraph ? "TextGameEngine-line-text-margin" : "TextGameEngine-line-text";
        this.mainEl.appendChild(Div(className, [styles.style(text)]));
    }
}
class LineGetNum extends Line {
    constructor(min, max) {
        super();
        const input = document.createElement("input");
        const okButton = document.createElement("button");
        const errorDiv = Div("TextGameEngine-line-error");
        this.mainEl.appendChild(Div([], [
            Div("TextGameEngine-line-arrowIn"), input, okButton, errorDiv,
        ]));
        input.type = "number";
        input.classList.add("TextGameEngine-line-input");
        okButton.classList.add("TextGameEngine-line-okButton");
        okButton.innerText = "OK";
        this.focus = () => { input.focus(); };
        input.addEventListener("keyup", (e) => {
            if (e.key == "Enter")
                okButton.click();
        });
        okButton.addEventListener("click", () => {
            if (isNaN(input.valueAsNumber)) {
                errorDiv.innerText = "";
                input.focus();
                return;
            }
            if (min != null && input.valueAsNumber < min) {
                errorDiv.innerText = `${input.valueAsNumber} < ${min}`;
                input.focus();
                return;
            }
            if (max != null && input.valueAsNumber > max) {
                errorDiv.innerText = `${input.valueAsNumber} > ${max}`;
                input.focus();
                return;
            }
            input.disabled = true;
            errorDiv.innerText = "";
            this.setPromiseResult(input.valueAsNumber);
        });
    }
    ask() {
        return this.createPromise();
    }
}
class LineGetText extends Line {
    constructor(min, max, trimSpaces, allowSpaces) {
        super();
        const input = document.createElement("input");
        const okButton = document.createElement("button");
        const errorDiv = Div("TextGameEngine-line-error");
        this.mainEl.appendChild(Div([], [
            Div("TextGameEngine-line-arrowIn"), input, okButton, errorDiv,
        ]));
        input.spellcheck = false;
        input.classList.add("TextGameEngine-line-input");
        okButton.classList.add("TextGameEngine-line-okButton");
        okButton.innerText = "OK";
        this.focus = () => { input.focus(); };
        input.addEventListener("input", () => {
            if (!allowSpaces)
                input.value = input.value.replaceAll(" ", "");
            if (max > 0)
                input.value = input.value.substring(0, max + 1);
        });
        input.addEventListener("change", () => {
            if (trimSpaces)
                input.value = input.value.trim();
        });
        input.addEventListener("keyup", (e) => {
            if (e.key == "Enter")
                okButton.click();
        });
        okButton.addEventListener("click", () => {
            if (input.value.length < min) {
                errorDiv.innerText = `${input.value.length} < ${min}`;
                input.focus();
                return;
            }
            input.disabled = true;
            errorDiv.innerText = "";
            this.setPromiseResult(input.value);
        });
    }
    ask() {
        return this.createPromise();
    }
}
class LineChoose extends Line {
    constructor(options, newLine, removeNotChosen, styles) {
        super();
        const optionsDiv = Div("TextGameEngine-line-choose");
        const optionEls = [];
        let chosen = false;
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const optionEl = Div("TextGameEngine-line-option", [styles.style(`${option}`)]);
            optionEls.push(optionEl);
            if (newLine)
                optionEls.push(Div("TextGameEngine-line-break"));
            optionEl.addEventListener("click", () => {
                if (chosen)
                    return;
                chosen = true;
                optionEls.forEach(el => {
                    if (el != optionEl) {
                        el.classList.add("TextGameEngine-line-option-disabled");
                        if (removeNotChosen)
                            optionsDiv.removeChild(el);
                    }
                });
                optionEl.classList.add("TextGameEngine-line-option-chosen");
                if (removeNotChosen)
                    optionEl.style.flex = "0 0 auto";
                this.setPromiseResult(i);
            });
        }
        optionEls.forEach(el => optionsDiv.appendChild(el));
        this.mainEl.appendChild(optionsDiv);
    }
    ask() {
        return this.createPromise();
    }
}
class TextStyles {
    constructor() {
        this.useStyles = true;
        this.styles = [];
    }
    style(text) {
        const mainDiv = Div();
        if (!this.useStyles) {
            mainDiv.innerText = text;
            return mainDiv;
        }
        const splited = this.splitText(text);
        const els = this.createHtml(splited);
        els.forEach(el => mainDiv.appendChild(el));
        return mainDiv;
    }
    removeFormatting(text) {
        const splited = this.splitText(text);
        let clearText = "";
        splited.forEach(part => clearText += part.text);
        return clearText;
    }
    setStyles(styles) {
        for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const textStyle = new StyledText();
            let color = "";
            let colorNow = false;
            for (let j = 0; j < style.length; j++) {
                const ch = style[j];
                if (colorNow) {
                    if (ch == "'")
                        colorNow = false;
                    else
                        color += ch;
                }
                else {
                    if (ch == "'")
                        colorNow = true;
                    else {
                        if (ch == "i")
                            textStyle.italic = true;
                        else if (ch == "b")
                            textStyle.bold = true;
                        else if (ch == "u")
                            textStyle.underline = true;
                        else if (ch == "c")
                            textStyle.clearPrev = true;
                        else
                            log(`TextStyles-setStyles: %cunexpected symbol: ${ch}`, "color: red");
                    }
                }
            }
            textStyle.color = color;
            this.styles[i] = textStyle;
        }
    }
    splitText(text) {
        const spSymbol = "&";
        const spSymbol2 = "^";
        const result = [];
        let styles = new StyledText();
        let textPart = "";
        let spSymb = false;
        let spSymb2 = false;
        let spText = "";
        let escapeCh = false;
        let link = 0;
        let linkText = ["", ""];
        let returnPoint = -1;
        const addPart = (text) => {
            const part = styles.copy();
            part.text = text;
            result.push(part);
        };
        const applyStyle = (styleI) => {
            const newStyles = this.styles[styleI];
            if (newStyles != undefined) {
                if (newStyles.clearPrev)
                    styles = this.styles[styleI];
                else {
                    styles.bold = styles.bold || newStyles.bold;
                    styles.italic = styles.italic || newStyles.italic;
                    styles.underline = styles.underline || newStyles.underline;
                    if (newStyles.color != "")
                        styles.color = newStyles.color;
                }
            }
        };
        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (spSymb) {
                const num = parseInt(ch, 10);
                if (textPart != "")
                    addPart(textPart);
                textPart = "";
                if (ch == "i")
                    styles.italic = true;
                else if (ch == "b")
                    styles.bold = true;
                else if (ch == "u")
                    styles.underline = true;
                else if (ch == "c")
                    styles = new StyledText();
                else if (!isNaN(num))
                    applyStyle(num);
                else {
                    textPart += spSymbol;
                    i -= 1;
                }
                ;
                spSymb = false;
            }
            else if (spSymb2) {
                if (ch == spSymbol2 && spText.length == 0) {
                    i -= 1;
                    spSymb2 = false;
                }
                if (escapeCh) {
                    spText += ch;
                    escapeCh = false;
                    continue;
                }
                if (ch == "\\")
                    escapeCh = true;
                else if (ch == spSymbol2) {
                    if (textPart != "")
                        addPart(textPart);
                    textPart = "";
                    const num = parseInt(spText, 10);
                    if (!isNaN(num))
                        applyStyle(num);
                    else
                        styles.color = spText;
                    spSymb2 = false;
                    spText = "";
                    returnPoint = -1;
                }
                else {
                    spText += ch;
                }
            }
            else if (link) {
                if (escapeCh) {
                    linkText[0] += ch;
                    escapeCh = false;
                    continue;
                }
                if (ch == "\\")
                    escapeCh = true;
                else if (link == 1) {
                    if (ch == ":")
                        link = 2;
                    else
                        linkText[0] += ch;
                }
                else if (link == 2) {
                    if (ch == "]") {
                        if (textPart != "")
                            addPart(textPart);
                        textPart = "";
                        styles.link = linkText[1];
                        addPart(linkText[0]);
                        styles.link = "";
                        linkText = ["", ""];
                        link = 0;
                        returnPoint = -1;
                    }
                    else
                        linkText[1] += ch;
                }
            }
            else {
                if (escapeCh) {
                    textPart += ch;
                    escapeCh = false;
                    continue;
                }
                if (ch == "\\")
                    escapeCh = true;
                else if (ch == "[") {
                    link = 1;
                    returnPoint = i;
                }
                else if (ch == spSymbol)
                    spSymb = true;
                else if (ch == spSymbol2) {
                    spSymb2 = true;
                    returnPoint = i;
                }
                else
                    textPart += ch;
            }
            if (returnPoint != -1 && i == text.length - 1) {
                i = returnPoint;
                textPart += text[i];
                returnPoint = -1;
                spSymb = false;
                spSymb2 = false;
                link = 0;
                linkText = ["", ""];
                spText = "";
            }
        }
        if (textPart != "")
            addPart(textPart);
        return result;
    }
    createHtml(parts) {
        const els = [];
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part.link == "") {
                const span = document.createElement("span");
                els.push(span);
                span.innerText = part.text;
                if (part.bold)
                    span.style.fontWeight = "bolder";
                if (part.italic)
                    span.style.fontStyle = "italic";
                if (part.underline)
                    span.style.textDecoration = "underline";
                if (part.color != "")
                    span.style.color = part.color;
            }
            else {
                const a = document.createElement("a");
                els.push(a);
                a.innerText = part.text;
                a.href = part.link;
                a.target = "_blank";
                a.title = part.link;
                a.classList.add("TextGameEngine-link");
            }
        }
        return els;
    }
}
class StyledText {
    constructor() {
        this.italic = false;
        this.bold = false;
        this.underline = false;
        this.color = "";
        this.text = "";
        this.clearPrev = false;
        this.link = "";
    }
    copy() {
        const newText = new StyledText();
        newText.italic = this.italic;
        newText.bold = this.bold;
        newText.underline = this.underline;
        newText.color = this.color;
        newText.text = this.text;
        newText.link = this.link;
        return newText;
    }
}
function Div(classes = [], children = [], text = "") {
    const div = document.createElement("div");
    if (typeof classes == "string")
        div.classList.add(classes);
    else
        classes.forEach(cls => div.classList.add(cls));
    div.innerText = text;
    children.forEach(child => div.appendChild(child));
    return div;
}
const DEBUG = false;
function log(...data) {
    if (DEBUG)
        console.log(...data);
}

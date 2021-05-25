# TextGameEngine
Engine for text games

## Text Formating
You can use special symbols in text to add colors and styles to your game.

### Special symbols:
Symbol       | Meaning
-------------|------------
&c           | Clear style
&b           | Bold style
&i           | Italic style
&u           | Underline style
&__digit__   | your style by this number (0-9) in _styles_
&&           | & symbol
^__color__^  | Color
^__number__^ | your style by this number in _styles_
^^           | ^ symbol

Set your own styles and colors:
```ts
TextGameEngine.setStyles(styles: string[], useStyles: boolean)
```
_useStyles_ - default true, set to false to disable text formatting

Strings in _styles_ can contain:
* c - Clear style
* b - Bold style
* i - Italic style
* u - Underline style
* color in single quotes

Style string examples:
* ui'red' - Underline, Italic, red
* 'blue'i - Italic, blue
* 'rgb(50, 220, 120)' - rgb(50, 220, 120) color
* cb'#ffff00' - Clear privious styles, bold, #ffff00 color

Text without formating:
```ts
TextGameEngine.print("Hello world!");
```
![Text without formating](docs/textWithoutFormating.png)

Text with formating:
```ts
TextGameEngine.setStyles(["'lightgreen'", "cu'red'"]);
TextGameEngine.print("&0He^yellow^&ullo&c &b&iworld&1!");
```
![Text with formating](docs/textWithFormating.png)

```ts
TextGameEngine.print("&0Hello &uworld!");
```
![Text with formating](docs/textWithFormating2.png)


## Change Colors
All colors are in the first lines of the css file.
``` css
/* TextGameEngine-styles.css */
.theme-light {
	--color-back--: antiquewhite;
	--color-input--: white;
	--color-main--: #b5f392;
	--color-text--: black;
	--color-choosen-option--: lightgreen;
}
.theme-dark {
	--color-back--: #0d1418;
	--color-input--: #0b2a3d;
	--color-main--: #0f9e38;
	--color-text--: white;
	--color-choosen-option--: darkgreen;
}
```

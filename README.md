# TextGameEngine
Engine for text games

## Text Formating
You can use special symbols in text to add colors and styles to your game.

### Special symbols:
Symbol      | Meaning
------------|------------
&c&         | Clear style
&b&         | Bold style
&i&         | Italic style
&u&         | Underline style
&color&     | Color
&&          | & symbol
&anyNumber& | your style with this number in _styles_

Set your own styles and colors:
```ts
TextGameEngine.setStyles(styles: string[], useStyles: boolean)
```
_useStyles_ - default true, set to false to disable text formating

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
![Text without formating](url)

Text with formating:
```ts
TextGameEngine.setStyles(["'lightgreen'", "cu'red'"]);
TextGameEngine.print("&0&He&yellow&llo &b&&i&world&1&!");
```

![Text with formating](url)

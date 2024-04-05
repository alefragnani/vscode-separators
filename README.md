[![](https://vsmarketplacebadges.dev/version-short/alefragnani.separators.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.separators)
[![](https://vsmarketplacebadges.dev/downloads-short/alefragnani.separators.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.separators)
[![](https://vsmarketplacebadges.dev/rating-short/alefragnani.separators.svg)](https://marketplace.visualstudio.com/items?itemName=alefragnani.separators)
[![](https://img.shields.io/github/actions/workflow/status/alefragnani/vscode-separators/main.yml?branch=master)](https://github.com/alefragnani/vscode-separators/actions?query=workflow%3ACI)

<p align="center">
  <br />
  <a title="Learn more about Separators" href="http://github.com/alefragnani/vscode-separators"><img src="https://raw.githubusercontent.com/alefragnani/vscode-separators/master/images/vscode-separators-logo-readme.png" alt="Separators Logo" width="70%" /></a>
</p>

# What's new in Separators 2.7

* Published to **Open VSX**
* Adds new option to draw separators above comments
* Adds new setting to define the minimum number of lines for symbols
* Adds new setting to choose separator's location
* Adds **Localization** support
* Adds **Web** support

## Support

**Separators** is an open source extension created for **Visual Studio Code**. While being free and open source, if you find it useful, please consider supporting it.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="GitHub Sponsors" href="https://github.com/sponsors/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-sponsor-rounded-small.png"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# Separators

It improves the readability of your source code, by drawing lines on top of each symbol. 

![Print](images/vscode-separators-print-readme.png)

Here are some of the features that **Separators** provides:

* Customize the separators appearance
* Each kind of symbol can have its own customization
* Select which symbols will have separators

## Language Support

The extension will automatically work with any language you have installed in VS Code. The only requirement is that the language itself does support `Go to Symbol`. 

To be sure your desired language will work on Separators, take a look at `Outline` view in VS Code. If it display contents, then Separators will work perfectly.

# Features

## Available commands

* `Separators: Toggle Visibility` 
* `Separators: Select Symbols` 

## Available settings

You can customize the appearance of each kind of Symbol. 

* List of symbols in which the separators will be drawn
```json
    // globally (user/workspace setting)
    "separators.enabledSymbols": [ 
        "Classes", 
        "Constructors",
        "Enums", 
        "Functions",
        "Interfaces", 
        "Methods",
        "Namespaces",
        "Structs"
    ],

    // per-language setting
    "[typescript]": {
        "separators.enabledSymbols": [
            "Enums",
            "Interfaces"
        ],
    }
```

* Controls whether callback/inline Functions should be ignored _(default is `false`)_
```json
    // globally (user/workspace setting)
    "separators.functions.ignoreCallbackInline": true

    // per-language setting
    "[javascript]": {
        "separators.functions.ignoreCallbackInline": true
    }
```
> For now, only **JavaScript**, **TypeScript** and **Lua** languages are supported. If you would like to see it on other languages, please open an issue providing details/samples

* Indicates the maximum depth (level) which the separators should be rendered _(default is `0`)_
```json
    "separators.maxDepth": 1

    // per-language setting
    "[javascript]": {
        "separators.maxDepth": 2
    }
```

* Specifies the minimum number of lines that a symbol must have to draw separators _(default is `0` - unlimited)_
```json
    "separators.minimumLineCount": 2

    // per-language setting
    "[javascript]": {
        "separators.minimumLineCount": 2
    }
```

* Defines the border width _(in `px`)_
```json
    "separators.classes.borderWidth": 1,
    "separators.constructors.borderWidth": 1, 
    "separators.enums.borderWidth": 1,
    "separators.functions.borderWidth": 1, 
    "separators.interfaces.borderWidth": 1,
    "separators.methods.borderWidth": 1, 
    "separators.namespaces.borderWidth": 1,
    "separators.structs.borderWidth": 1,
```

* Define how border style _(choose between `solid`, `dotted`, `dashed` or `double`)_
```json
    "separators.classes.borderStyle": "solid",
    "separators.constructors.borderStyle": "solid",
    "separators.enums.borderStyle": "solid",
    "separators.functions.borderStyle": "solid",
    "separators.interfaces.borderStyle": "solid",
    "separators.methods.borderStyle": "solid",
    "separators.namespaces.borderStyle": "solid",
    "separators.structs.borderStyle": "solid",
```

* Indicates the locations (relative to the symbols) where the separators will be drawn _(default `aboveTheSymbol`)

| Option                 | Behavior                                                   |
|------------------------|------------------------------------------------------------|
| `aboveTheSymbol`       | A single separator located above the symbol                |
| `aboveTheComment`      | A single separator located above the comment of the symbol |
| `belowTheSymbol`       | A single separator located below the symbol                |
| `surroundingTheSymbol` | A pair of separators located above and below the symbol    |

```json
   "separators.location": "aboveTheSymbol"
```

* Indicates the comment rules to draw separators above comments

Out of the box, the extension supports three _patterns_ of comments:
  * **Slash based comments**: Like those found in JavaScript, TypeScript, C, C++, C#, Java, etc
```javascript
   // this is a single line comment
   
   /* this is a multi line comment 
      this is a multi line comment */
```
  * **Pascal based comments**: Like those found in Pascal, Object Pascal, etc
```pascal
   // this is a single line comment
      
   { this is a multi line comment 
      this is a multi line comment }

   (* this is an old school multi line comment 
      this is an old school multi line comment *)
```
  * **Lua based comments**: Like those found in Lua
```lua
   -- this is a single line comment
   
   --[[ this is a multi line comment 
        this is a multi line comment ]]
```

If you want to add support for a custom language, you can add a new rule to the `separators.aboveComments.rules` setting. Here is an example for Lua:
```json
   "separators.aboveComments.rules": [
        {
            "name": "Lua",
            "languageIds": [
                "lua"
            ],
            "rules": {
                "singleLine": "^\\s*--",
                "multiLine": [
                    {
                        "start": "^\\s*\\-\\-\\[\\[",
                        "end": "\\]\\]\\s*$"
                    }
                ]
            }
        }
    ],
```

Or you can open a PR, an contribute to the built in rules in the extension. These are located in the `./rules.json` file

> Be aware that regex must be escaped, so `\\` is used instead of `\`

## Available colors

For more information about customizing colors in VSCode, see [Theme Color](https://code.visualstudio.com/api/references/theme-color).

* Choose the color of the border 
```json
    "workbench.colorCustomizations": {
      "separators.classes.borderColor": "#65EAB9",  
      "separators.constructors.borderColor": "#65EAB9",  
      "separators.enums.borderColor": "#65EAB9",  
      "separators.functions.borderColor": "#65EAB9",  
      "separators.interfaces.borderColor": "#65EAB9",  
      "separators.methods.borderColor": "#65EAB9",  
      "separators.namespaces.borderColor": "#65EAB9",  
      "separators.structs.borderColor": "#65EAB9",  
    }
```

# License

[GPL-3.0](LICENSE.md) &copy; Alessandro Fragnani
<p align="center">
  <br />
  <a title="Learn more about Separators" href="http://github.com/alefragnani/vscode-separators"><img src="images/vscode-separators-logo-readme.png" alt="Separators Logo" width="70%" /></a>
</p>

## Support

**Separators** is an open source extension created for **Visual Studio Code**. While being free and open source, if you find it useful, please consider supporting it.

<table align="center" width="60%" border="0">
  <tr>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=US&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Paypal" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=EP57F3B6FXKTU&lc=BR&item_name=Alessandro%20Fragnani&item_number=vscode%20extensions&currency_code=BRL&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donate_SM.gif"/></a>
    </td>
    <td>
      <a title="Patreon" href="https://www.patreon.com/alefragnani"><img src="https://raw.githubusercontent.com/alefragnani/oss-resources/master/images/button-become-a-patron-rounded-small.png"/></a>
    </td>
  </tr>
</table>

# Separators

It improves the readability of your source code, by drawing lines on top of each method. 

Here are some of the features that **Separators** provides:

* **Customize** the separators appearance

# Features

## Available commands

No new command, for now :smile: 

## Available settings

You can customize not only the appearance of the separators, but also which `Symbols` are recognized as "Methods"

* Defines the border width (in `px`)
    ```json
    "separators.methods.borderWidth": "1" 
    ```

* Define how border style
    ```json
    "separators.methods.borderStyle": "solid" // or "dotted", "dashed", "double"
    ```

* Choose which kind of symbols are recognized as `Methods`
    ```json
    "separators.methods.supportedKinds": [
                                          "Method",
                                          "Function",
                                          "Constructor"]
    ```

> Let's say you don't want `Contructors` to have separators, then you can just remove it from the list.

## Available colors

For more information about customizing colors in VSCode, see [Theme Color](https://code.visualstudio.com/api/references/theme-color).

* Choose the color of the border 
```json
    "workbench.colorCustomizations": {
      "separators.methods.borderColor": "#65EAB9",  
    }
```

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani
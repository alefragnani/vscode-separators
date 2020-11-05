<p align="center">
  <br />
  <a title="Learn more about Separators" href="http://github.com/alefragnani/vscode-separators"><img src="https://raw.githubusercontent.com/alefragnani/vscode-separators/master/images/vscode-separators-logo-readme.png" alt="Separators Logo" width="70%" /></a>
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

* `Separators: Toggle Visibility` 

## Available settings

You can customize the appearance of each kind of Symbol. 

* Defines the border width _(in `px`)_
    ```json
    "separators.methods.borderWidth": "1", 
    "separators.functions.borderWidth": "1", 
    "separators.constructors.borderWidth": "1", 
    ```

* Define how border style _(choose between `solid`, `dotted`, `dashed` or `double`)_
    ```json
    "separators.methods.borderStyle": "solid",
    "separators.functions.borderStyle": "solid",
    "separators.constructors.borderStyle": "solid",
    ```

## Available colors

For more information about customizing colors in VSCode, see [Theme Color](https://code.visualstudio.com/api/references/theme-color).

* Choose the color of the border 
```json
    "workbench.colorCustomizations": {
      "separators.methods.borderColor": "#65EAB9",  
      "separators.functions.borderColor": "#65EAB9",  
      "separators.constructors.borderColor": "#65EAB9",  
    }
```

# License

[MIT](LICENSE.md) &copy; Alessandro Fragnani
## Customizing Appearance

You can customize a few characteristics of the separator, beyond the colors.

Something like this in your settings:

```json
    "separators.constructors.borderStyle": "dashed",
    "separators.constructors.borderWidth": 2,
    "workbench.colorCustomizations": {
      ...
      "separators.constructors.borderColor": "#FF0000"
    }
```

Could end up with a separator like this:

![Customizing Constructor](customizingAppearanceConstructor.png)

> Tip: Some configurations supports language specific settings, like `separators.minimumLineCount`
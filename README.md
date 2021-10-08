## Obsidian nomnoml Diagram

![An example of nomnoml diagram](https://raw.githubusercontent.com/Daeik/obsidian-nomnoml-diagram/main/images/nomnoml-diagram-example.gif)

This [Obsidian](https://obsidian.md/) plugin lets you draw [nomnoml](https://www.nomnoml.com/) diagrams inside of Obsidian notes.


## Drawing a nomnoml diagram

To draw a nomnoml diagram inside of a note, you can simply use fenced code block syntax with `nomnoml` keyword. (Or use *[Nomnoml Diagram: New Diagram]* command to insert auto-generated fenced code block)

    ```nomnoml
    [Example] -> [Diagram]
    ```

nomnoml directives are also supported to set diagram styles per diagram.

(Default directive settings can be set in *[Plugin Options > Nomnoml Diagram]*.)


    ```nomnoml
    #background: #000000
    #arrowSize: 0.5

    [Example] -> [Diagram]
    ```

Please check nomnoml's [official website](https://www.nomnoml.com/) and [GitHub repository](https://github.com/skanaar/nomnoml) for the full syntax references and more examples!


## Notes

- All diagrams are generated as SVG(Scalable Vector Graphics)
- Obsidian's default "Export to PDF" includes generated SVG diagrams (And each text node is PDF annotatable!)
- Inserting diagrams will be less tedious once you set a hotkey for *[Nomnoml Diagram: New Diagram]* command. (Check *[Hotkeys]* in Obsidian Settings)


## Compatibility

- Supports Obsidian desktop and mobile
- Requires Obsidian v0.12.15 or above


## License

[MIT](./LICENSE)

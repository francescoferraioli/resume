This folder contains markdown files that will be parsed at build time and each file's parsed content will be available as a property (corresponding to the name of the file) in the `markdown` property in the context. They can then be rendered using the `markdown` partial.

## Example

`summary.md`
```
This is a summary about me

- I am good at programming
- And I like bullet points
```

Will be parsed at build time and available in the context at `markdown.summary`.

To be display in the resume with:

```
{{>partial partial="markdown" markdown=markdown.summary class="summary"}}
```

## Markdown Extensions

In order to fully support all the different html structures I need rendered on the page I had to extend the markdown language a bit.

To do this I introduced two new concepts to markdown:
- Renderer: A class that will take a line (or a list of lines) and produce an output to be rendered
- Block: A list of lines that have a corresponding renderer and an optional class.

### Block

Each line in the markdown file is parse seperately in order to create seperate elements to enable page breaks to occur automatically. However, in some cases, parsing a block of lines as opposed to them individually will produce a different output. As a result I introduce syntax for defining blocks:
A block is started with a line `md:start-block:${renderer}(.${class})?` and is ended with a line `md:end-block:${renderer}`.

It's important to note that obviously each block will be created as a single content and will therefore stay together through page breaks.


### Renderers

#### standard

This is the renderer that is used in most line and is the standard `md` to `html` renderer. A line in the md file will use the standard renderer by default.
Markdown is context aware and parsing it line by line will produce different results than parsing the lines as a markdown block.

For example:

```
- First Bullet
- Second Bullet
  - Sub Bullet 
```

Parsing this line by line `Sub Bullet` would be renderered as a sibling to First Bullet and Second Bullet but when rendered as a block `Sub Bullet` would be a child of `Second Bullet`.

To make it a block simply wrap it in an `md:start-block:standard` and `md:end-block:standard`
```
md:start-block:standard
- First Bullet
- Second Bullet
  - Sub Bullet 
md:end-block:standard
```

#### html

My markdown files also support using html, and this is done through the html renderer. This is useful for things like underlining text as markdown doesn't have a way to create underlined text.

```
<u>Underlined</u>
```

A line is considered to be html if it starts with the `<` character. As stated previously, the files are parse line by line so if you want to create a html output that spans multiple line you can do so with a html block:

```
md:start-block:html
<ul>
  <li>
    Test
  </li>
</ul>
md:end-block:html
```

Without it being a block each line would be parse individually and they wouldn't be any nesting.

#### spacer

The md files are also new line sensitive. What I mean by that is that a blank line actually tells the renderer to render a spacer with a height of 2mm.

#### columns

This renderer allows me to declare content that will be displayed horizontally rather than vertically through the use of flex-box.

Each content within a columns renderer block will be displayed horizontally instead of vertically. In most cases the columns renderer is enclosing multiple internal blocks. I mainly use columns to create multiple bullet point lists that are listed horizontally:

```
md:start-block:columns
md:start-block:standard
- List 1 Bullet 1
- List 1 Bullet 2
- List 1 Bullet 3
md:end-block:standard
md:start-block:standard
- List 2 Bullet 1
  - List 2 Bullet 1 Sub Bullet 1
- List 2 Bullet 2
md:end-block:standard
md:end-block:columns
```

A limitation to this is that a columns renderer cannot be nested inside another column renderer but I don't see any major valid use case for it so I didn't spend too much time trying to fix this limitation.

#### components

I have introduced the concept of a component within md. The component will be renderered as a handlebars partial. You can create the component in the md like the following:

```
md:start-block:component
{
  "name": "component-name",
  "props": {
    "prop1": "I am a prop",
    "prop2": "I am another prop"
  },
}
md:end-block:component
```

You then need to create a handlebars partial in `/src/partials/components` with the name `component-name` and it will have access to the `props` through the variable `props` (i.e. `props.prop1`).

You can add `"skipContentClass": true` as a sibling to `name` and `prop` if you want to espace the `content` class which adds padding. I do this for the `heading` component as I take care of the padding in the component itself.

### Other

#### Comments

The md parser will omit any line that starts with `!#` and this will allow you to add comments in your md files.

#### Force Page Break

You can force the JS that is creating the pages as runtime to force a page break by adding the following string in your md.

```
-----PAGE-BREAK------
```

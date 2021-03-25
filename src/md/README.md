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

Each line in the markdown file is parse seperately in order to create seperate elements to enable page breaks to occur automatically. However, in some cases markdown is context aware and parsing it line by line will produce different results than parsing the lines as a markdown block. As a result I introduce syntax for defining blocks:
A block is started with a line `md:start-block:${renderer}(.${class})?` and is ended with a line `md:end-block:${renderer}`. I will explain what I mean by renderer soon but for now if we want to create a markdown block we use the `standard` renderer. You can specify and optional css class to be assigned to the block.

```
md:start-block:standard
- First Bullet
- Second Bullet
  - Sub Bullet 
md:end-block:standard
```

Without the block, each line would be parse individually and `Sbu Bullet` would be renderered as a sibling to First Bullet and Second Bullet but when rendered as a block Sub Bullet would be a child of Second Bullet.

My markdown files also support using html, and this is done through the html renderer. This is useful for things like underlining text as markdown doesn't have a way to create underlined text.

```
<u>Underlined</u>
```

A line is considered to be html if it starts with the < character. As stated previously, the files are parse line by line so if you want to create a html output that spans multiple line you can do so with a html block:

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

It's important to note that obviously each block will be created as a single content and will therefore stay together through page breaks.

The md files are also new line sensitive. What I mean by that is that a blank line actually tells the renderer to render a spacer with a height of 2mm.

The final and probably most complicated renderer is the columns renderer. This renderer allows me to declare content that will be displayed horizontally rather than vertically through the use of flex-box.

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
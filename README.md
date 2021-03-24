Live at [francescoferraioli.github.io/resume](https://francescoferraioli.github.io/resume)

I started this repository because I was sick of depending on Microsoft Word for updating my resume. I can now simply update this code.

# Contents

## bin

Includes some handy scripts:

- `bin/build`
It will take the `src` and output the results in `docs` to be published on Github Pages.

- `bin/start`
It will open the browser and watch for changes in the `docs` folder.

- `bin/open`
It will open the output in your default browser.

- `bin/watch`
It will watch for changes in your `src` and `build` folders and run the build again.

For each entry in bin, there is an equivalent yarn script. eg: `yarn start === bin/start`

## build

Contains TypeScript files that are called by the `bin/build` script to undertake the build.

## docs

The output of running the build on the `src` directory. The contents of this folder are not updated manually, just by the build script. The output is composed on two files:
- `index.html`
- `index.css`
- `index.js`

## src

This contains handlebars (hbs) and SCSS files as wel as a single JS file. These files form the input to the build process to produce `index.html`, `index.css` and `index.js`.

The JS file is simply copied across and its sole purpose is simply to put the contents into pages at runtime.

Maybe move this in the markdown subfolder and link to it here?
hashhashhash markdown

It also contains markdown (md) files which will be loaded into the `context` under the `markdown` property and displayable through the `markdown` partial.

In order to fully support all the different html structures I need rendered on the page I had to extend the markdown language a bit.

Each line in the markdown file is parse seperately in order to create seperate elements to enable page breaks to occur automatically. However, in some cases markdown is context aware and parsing it line by line will produce different results than parsing the lines as a markdown block. As a result I introduce syntax for defining blocks:
A block is started with a line `md:start-block:${renderer}` and is ended with a line `md:end-block:${renderer}`. I will explain what I mean by renderer soon but for now if we want to create a markdown block we use the `standard` renderer.

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

The final and probably most complicated renderer is the column renderer. This renderer allows me to declare content that will be displayed horizontally rather than vertically through the use of flex-box.

Each content within a column renderer block will be displayed horizontally instead of vertically. In most cases the column renderer is enclosing multiple internal blocks. I mainly use columns to create multiple bullet point lists that are listed horizontally:

```
md:start-block:column
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
md:end-block:column
```

A limitation to this is that a column renderer cannot be nested inside another column renderer but I don't see any major valid use case for it so I didn't spend too much time trying to fix this limitation.

# Getting Started

## Seeing the result

Because the build artifacts are part of the repo (in order to be deployed on Github Pages), you can view the output just by running `bin/open`

## Development

1. Start by installing the dependencies:

```
yarn
```

2. Start your server and watch the files:

```
yarn start:watch
```

3. Edit the `hbs`, `scss` and `md` files in `src`. The `js` file should be left untouched.

4. Profit!

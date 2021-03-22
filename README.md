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

It also contains markdown (md) files which will be loaded into the `context` under the `markdown` property and displayable through the `markdown` partial.

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
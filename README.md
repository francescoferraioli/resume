I started this repository because I was over depending on Microsoft Word for updating my resume. I can now simply update this code.

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
It will watch for changes in your `src` and run the build again.

For each entry in bin, there is an equivalent yarn script. eg: `yarn start === bin/start`

## build

Contains TypeScript files that are called by the `bin/build` script to undertake the build.

## docs

The output of running the build on the `src` directory. The contents of this folder are not updated manually, just by the build script. The output is composed on two files:
- `index.html`
- `index.css`

## src

This contains handlebars (hbs) and SCSS files. These files form the input to the build process to produce `index.html` and `index.css`.

# Getting Started

## Seeing the result

Because the build artifacts are part of the repo (in order to be deployed on Github Pages), you can view the output just by running `bin/open`

## Development

Start by installing the dependencies:

```
yarn
```

Edit the `hbs` and `scss` files in `src`.

Build the `src` into `docs`:

```
bin/build
```

Open the output (if you haven't done so) or just refresh the page:

```
bin/open
```

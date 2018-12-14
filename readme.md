# Frontend Starter Kit

This project aims to simplifiy the process for frontend development. It provides the following tasks:

- Build a customized version of [Bootstrap](http://getbootstrap.com/)
- Include the free version of [FontAwesome](http://fortawesome.github.io/Font-Awesome/)
- Compress and minify all assets
- Lint your code with [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/)

## Installation

1. Clone this repo.
2. cd into the directory and run `yarn install`

## Technology used

- Webpack 4
- Yarn
- Imagemin
- PostCSS
- ES6 with Babel
- ESLint for JavaScript linting
- Stylelint for CSS linting

## Usage

There are five defined tasks. These tasks are described below:

### Compiling tasks

- `yarn dev` : Compiles your source code for development purposes
- `yarn watch` : Automatic recompilation of your source code
- `yarn build` : Compiles your source code for production

### Linting tasks

- `yarn stylelint` : Lint your SCSS with stylelint
- `yarn eslint` : Lint your Javascript with ESLint

> _Note: You can add more tasks by adding extra entries into the `scripts` attribute of the `package.json` file)_

## Directory structure

```bash
<path to this project>
├── dist
│   ├── index.html
│   ├── main.css
│   ├── main.js
│   └── public
│       └── sample-image.jpg
├── node_modules
├── src
│   ├── index.html
│   ├── public
│   │   └── sample-image.jpg
│   ├── js
│   │   └── main.js
│   └── scss
│       ├── _custom.scss
│       ├── _variables.scss
│       └── main.scss 
├── .browserslistrc (configuration file for Autoprefixer)
├── .eslintrc (configuration file for ESLint)
├── .gitignore 
├── .stylelintrc (configuration file for StyleLint)
├── package.json 
├── postcss.config.js
├── readme.md
├── webpack.config.js 
└── yarn.lock
```

> _Notes:_
> You can add more `*.js` files and/or folder in `src/js/`
>
> You can add more `*.scss` files and/or folder in `src/scss/`
>
> All files in `src/public/` will be copied to `dist/public/`. Images will also be compressed.

## Example

Bootstrap comes with many mixins. Here's a simple example to add a new button with a simple transition on hover:

```scss
.my-new-btn-color {
    @include button-variant(#CB793A, #CB793A);
    @include transition($transition-base);
}
```

would compile into:

```css
.my-new-btn-color{
    color:#fff;
    background-color:#cb793a;
    border-color:#cb793a;
    -webkit-transition:all .2s ease-in-out;
            transition:all .2s ease-in-out;
}
.my-new-btn-color:hover {
    color:#fff;
    background-color:#b0672f;
    border-color:#a6612c;
}
.my-new-btn-color.focus,
.my-new-btn-color:focus {
    -webkit-box-shadow:0 0 0 .2rem rgba(203,121,58,.5);
            box-shadow:0 0 0 .2rem rgba(203,121,58,.5);
}
.my-new-btn-color.disabled,
.my-new-btn-color:disabled {
    color:#fff;
    background-color:#cb793a;
    border-color:#cb793a;
}
.my-new-btn-color:not(:disabled):not(.disabled).active,
.my-new-btn-color:not(:disabled):not(.disabled):active,
.show > .my-new-btn-color.dropdown-toggle {
    color:#fff;
    background-color:#a6612c;
    border-color:#9c5b29;
}
.my-new-btn-color:not(:disabled):not(.disabled).active:focus,
.my-new-btn-color:not(:disabled):not(.disabled):active:focus,
.show > .my-new-btn-color.dropdown-toggle:focus {
    -webkit-box-shadow:0 0 0 .2rem rgba(203,121,58,.5);
            box-shadow:0 0 0 .2rem rgba(203,121,58,.5);
}
@media screen and (prefers-reduced-motion:reduce){
    .my-new-btn-color{
        -webkit-transition:none;
                transition:none;
    }
}
```

Breakpoint viewport sizes and media queries mixins:

```scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
) !default;

@include media-breakpoint-only(xs) { }
@include media-breakpoint-only(sm) { }
@include media-breakpoint-only(md) { }
@include media-breakpoint-only(lg) { }
@include media-breakpoint-only(xl) { }

.some-element {
    @include media-breakpoint-up(sm) {
        display: inline;
    }
    @include media-breakpoint-down(md) {
        display: block;
    }
}

```

would compile into:

```css
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { }
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) { }
// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) { }
// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) { }
// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { }

@media (min-width:576px) {
    .some-element {
        // Larger than sm: 576px
        display:inline;
    }
}
@media (max-width:991.98px) {
    .some-element {
        // Smaller than md: 992px
        display:block;
    }
}

```

> _Note: For more information and examples on Bootstrap mixins see [this Gist](https://gist.github.com/anschaef/d7552885c0e1f127cf8830d3bbf6e4b1) from Andreas Schaefer_
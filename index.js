const {writeToFile, css} = require('./lit-css')

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const breakpoints = {
    '': '0px',
    '-md': '768px',
    '-lg': '992'
}

// This can later come from rhythm
const spacing = {
    0: "0",
    8: "0.5rem",
    16: "1rem",
    32: "2rem",
    64: "4rem"
};

const columnStyles = (breakpoint) => (i) => `
  .span-${i}${breakpoint} {
    -ms-grid-column-span: ${i};
    grid-column-end: span ${i};
    display: initial;
  }
`

const startStyles = (breakpoint) => (i) => `
  .start-${i}${breakpoint} {
    -ms-grid-column: ${i};
    grid-column-start: ${i};
  }
`

const spanStyles = (breakpoint) => (i) => `
  .span-${i}${breakpoint} {
    -ms-grid-column-span: ${i};
    grid-column-end: span ${i};
    display: initial;
  }
`

const rowStyles = (breakpoint) => (i) => `
  .row-span-${i}${breakpoint} {
    -ms-grid-row-span: ${i};
    grid-row: span ${i};
  }
`


// doesn't care about iterating 
const collapseStyles = (breakpoint) => (i) => `
  .span-0${breakpoint} {
    display: none;
  }

  .row-span-0${breakpoint} {
    display: none;
  }
`

// gaps interate from gap object
const gapStyles = (breakpoint) => (spacing) => `
  .gap-${spacing}${breakpoint} {
      grid-gap: ${spacing}
  }
`

const gapColStyles = (breakpoint) => (spacing) => `
  .gap-col-${spacing}${breakpoint} {
      grid-column-gap: ${spacing}
  }
`

const gapRowStyles = (breakpoint) => (spacing) => `
  .gap-col-${spacing}${breakpoint} {
      grid-row-gap: ${spacing}
  }
`

// row for ms polyfill
const msGridRows = (i) => `
  .ms-row-${i} {
      -ms-grid-row: ${i}
  }
`

// not converted yet 
const msGridGapStyles = () => `
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    /* creates a margin from 5 to 25 in multiples of 5 */
    @each $pt, $ptSize in $spacing-points {
      .gap-#{$pt}#{$val} {
        margin-right: -#{$ptSize};
        margin-bottom: -#{$ptSize};
      }

      .gap-#{$pt}#{$val} > * {
        margin-right: #{$ptSize};
        margin-bottom: #{$ptSize};
      }
    }
  }
`


// doesn't care about breakpoints
const gridStyles = (i) => `
  .grid-${i} {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: ${'1fr '.repeat(i)};
    grid-template-columns: repeat(${i}, 1fr);
  }
`

const getIterableStyles = (arr, breakpoint, style) => arr
    .map(style(breakpoint))
    .join('');


const generatedCss =
    Object.keys(breakpoints)
        .map(breakpoint => css`
@media (min-width: ${breakpoints[breakpoint]}) {
    ${getIterableStyles(range, breakpoint, columnStyles)}
    ${getIterableStyles(range, breakpoint, startStyles)}
    ${getIterableStyles(range, breakpoint, spanStyles)}
    ${getIterableStyles(range, breakpoint, rowStyles)}
}
`
        )
        .join('')

// console.log(generatedCss)
writeToFile('main.css', generatedCss)
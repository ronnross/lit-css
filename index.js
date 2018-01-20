const fs = require('fs');


function writeToFile(fileName, contentToWrite) {
    fs.writeFile(fileName, contentToWrite, (err) => {
        if (err) throw err;
        console.log('File Created!');
    });
}

function css(template, ...expressions) {
    return template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
    })
}


/*

$spacing-points: (
  0: "0",
  8: "0.5rem",
  16: "1rem",
  32: "2rem",
  64: "4rem"
);
*/

// const grid = `
//   ${Array(endRange).fill(1).map(i => {
//     console.log(i)
//   })}
// `
// function generateSpanStyles(startRange, endRange) {
//   let acc = '';
//   for (step = startRange; step <= endRange; step++) {
//     acc += `.span-${step} {
//       grid-column-end: span ${step};
//       color: var(--color-blue2)
//     }
//     `
//   }
//   return acc;
// }

// const grid = css`
//   ${generateSpanStyles(startRange, endRange)}
// `
// const range = (max) => [...Array(max).keys()]

// const setUpGen = val => range(endRange).map(val)


// const grid =  css`
//   .span-${step} {
//     grid-column-end: span ${step}
//   }
// `



// console.log(grid)
// console.log(testing)


//todo
const collapseStyles = (breakpoint) => (i) => `
  .span-0${breakpoint} {
    display: none;
  }

  .row-span-0${breakpoint} {
    display: none;
  }
`

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
  .row-span-${i}${breakpoint} {
    -ms-grid-row-span: ${i};
    grid-row: span ${i};
  }
`

const rowStyles = (breakpoint) => (i) => `
  .row-span-${i}${breakpoint} {
    -ms-grid-row-span: ${i};
    grid-row: span ${i};
  }
`


const getIterableStyles = (arr, breakpoint, style) => arr
    .map(style(breakpoint))
    .join('');

const range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// const breakpoints = ['', '-md', '-lg'];
const breakpoints = {
    '': '0px',
    '-md': '768px',
    '-lg': '992'
}
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

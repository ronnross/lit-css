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

// add a render later for run-time

module.exports = {
    writeToFile: writeToFile,
    css: css
}
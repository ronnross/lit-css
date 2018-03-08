const fs = require('fs');

function writeToFile(fileName, contentToWrite) {
    fs.writeFile(fileName, contentToWrite, (err) => {
        if (err) throw err;
        console.log('File Created!');
    });
}

module.exports = {
    writeToFile,
}
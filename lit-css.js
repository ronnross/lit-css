function css(template, ...expressions) {
    return template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
    })
}

// add a render later for run-time

module.exports = {
    css,
}
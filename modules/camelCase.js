function camelCase(str) {
    return str.replace(/[^a-z0-9]/gi, ' ')
        .toLowerCase()
        .split(' ')
        .map((i, idx) => idx > 0 ? i = `${i.slice(0, 1).toUpperCase()}${i.slice(1)}` : i)
        .join('');
}

module.exports = camelCase;
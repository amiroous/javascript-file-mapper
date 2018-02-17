'use strict';

let fs = require('fs');
let mapStructure = require('./libs/file-mapper');
let defaultIgnored = require('./libs/utils/default-ignored');

module.exports = function structure (directory, ignoredFilesFolders, generatedFile) {

    generatedFile = generatedFile || './default-mapped-structure.json';

    let currentDir = directory || process.cwd();
    let toIgnore = ignoredFilesFolders ? ignoredFilesFolders : defaultIgnored;

    return new Promise( (resolve, reject) => {

        let mappedStructure = mapStructure(currentDir, toIgnore);

        fs.writeFile(generatedFile, JSON.stringify(mappedStructure), err => {
            if (err) {
                reject(err)
            } else {
                resolve(mappedStructure, console.log("Generated Map Successfully."))
            }
        });

    });
};

'use strict';

let fs = require('fs');
let joinPaths = require('./utils/join-paths');
let isIgnored = require('./utils/is-ignored');

module.exports = function fileMapper (dirToMap, dirsToIgnore) {

    let mappedStructure = fs.readdirSync(dirToMap);

    return mappedStructure.map( dir => {

        let dirPath = joinPaths(dirToMap, dir);
        let stats = fs.lstatSync(dirPath);

        if ( !isIgnored(dir, dirsToIgnore) ) {

            if ( stats.isDirectory() ) {
                // if is directory, continue mapping structure
                let newMapStructure = fileMapper(dirPath, dirsToIgnore);
                let folderMap = { name: dir, type: 'directory' };
                if (newMapStructure.length) {
                    folderMap.children = newMapStructure;
                }
                return folderMap;
            } else {
                // if is file, get information
                let filePath = dir.split('.');
                let fileExtension = '.' + filePath[filePath.length - 1];
                let fileName = dir.substring(0, (dir.length - fileExtension.length) );
                let fileMap = {
                    name: fileName,
                    extension: fileExtension,
                    type: 'file'
                };
                return fileMap;
            }

        }


    }).filter( x => x !== undefined); // Strip away undefined variables

};

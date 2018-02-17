'use strict';

let expect = require('chai').expect;
let joinPaths = require('../libs/utils/join-paths');
let structure = require('../index');


describe('Structure Map API Testing', function() {

    it('should return a valid object tree when a directory is passed', function () {
        let testDir = joinPaths(__dirname, 'directories/heroes/affm/');
        let mappedStructure = structure(testDir, null, './test/maps/generated-map.json');
        let realMap = require('./maps/real-map.json');

        return mappedStructure
            .then(function() {
                let generatedMap = require('./maps/generated-map.json');
                expect(generatedMap).to.deep.equal(realMap);
            });
    });


    it('should return an empty array when the directory is empty', function () {
        let testDir = joinPaths(__dirname, 'directories/heroes/empty-hero');
        let mappedStructure = structure(testDir, null, './test/maps/generated-map-empty.json');

        return mappedStructure
            .then(function() {
                let generatedMap = require('./maps/generated-map-empty.json');
                expect(generatedMap.length).to.equal(0);
            });
    });


    it('should ignore directories passed as arguments', function () {
        let testDir = joinPaths(__dirname, 'directories/heroes/ignore/');
        let mappedStructure = structure(testDir, ['folder-to-ignore'], './test/maps/generated-map-ignore-folder.json');

        return mappedStructure
            .then(function() {
                let generatedMap = require('./maps/generated-map-ignore-folder.json');
                expect(generatedMap.length).to.equal(0);
            });
    });


    it('should ignore files passed as arguments', function () {
        let testDir = joinPaths(__dirname, 'directories/heroes/ignore/');
        let mappedStructure = structure(testDir, ['file-to-ignore.txt'], './test/maps/generated-map-ignore-file.json');

        return mappedStructure
            .then(function() {
                let generatedMap = require('./maps/generated-map-ignore-file.json');
                expect(JSON.stringify(generatedMap)).to.not.contain("file-to-ignore");
            });
    });


    it('should get the correct name/extension when several dots in files or directories names', function () {
        let testDir = joinPaths(__dirname, 'directories/heroes/period-format/');
        let mappedStructure = structure(testDir, null, './test/maps/generated-map-period-format.json');

        return mappedStructure
            .then(function() {
                let generatedMap = require('./maps/generated-map-period-format.json');
                expect(JSON.stringify(generatedMap)).to.contain("map.foo").and.not.to.contain("map.foo.extension");
            });
    });


    it('should throw an error properly', function () {
        return structure('ThrowError')
            .then(
                function() {},
                function(error) {
                    expect(error).to.not.be.undefined;
                });
    });
});

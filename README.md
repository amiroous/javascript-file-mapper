# File Mapper Module
### Map directory file structure and generate a report as a JSON file

**The module will receive 3 arguments as config:**

* _PATH_TO_BE_MAPPED_ : Folder path to be mapped

* _IGNORE_FILES_FOLDERS_LIST_ : Array of filenames with extension and/or folder names to be excluded.

* _FILE_TO_GENERATE_ : Path and filename (with extension) which map report will be generated into it.

_If you don't have any ignore list but wanna specify generated file, you need to pass `null` as second argument._




## Usage:

##### Install _file-mapper_ Module

    - in `ems/turbotax/src/main/package.json` add following code as `devDependencies`
        - `"file-mapper": "git+https://github.intuit.com/TTcom/file-mapper.git#v1.0.1",` (check the latest release version)
    - Through terminal make sure you're in `ems/turbotax/src/main` and run `npm install`


##### Use it in JS File:

```javascript
let fileMapper = require('file-mapper');

fileMapper(_PATH_TO_BE_MAPPED_, _IGNORE_FILES_FOLDERS_LIST_, _FILE_TO_GENERATE_)
    .then(function(fileMap) {
        // Do what need to be done with fileMap object
        console.log(fileMap);
    });

```


##### Use it through Gruntfile:

```javascript
grunt.registerTask('ems-file-mapper', 'Generate a map structure of given folder', function(report) {
        let done = this.async();
        let fileMapper = require('file-mapper');
        let folderToMap = 'webapp/handlebars/';
        let excludes = JSON.parse(grunt.file.read('ems-file-mapper-exclusion.json')).excludes || {};
        report = report || 'ems-file-mapper-report.json';
        fileMapper(folderToMap, excludes, report).then(() => done());
    });
```
- Run `ems-file-mapper` manually or add it into other commands like `build`


##### Examples:
    - without any ignored folder list `fileMapper(__dirname + '/handlebars/');`
    - with ignored list `fileMapper(__dirname + '/handlebars/' , ['mktg-tests', 'ignorfile.iml']);`
    - with generated file path `fileMapper(__dirname + '/handlebars/' , ['mktg-tests'], __dirname +'/my-folder/report.json');` (my-folder should be existed)

---

#### Available Commands:
* `npm test`
Runs all the tests written in `test/map-structure.test.js` and report in terminal.

* `npm run bump`
Bump a new version (in package.json) and add related tag for release.
*Make sure before bumping new version, `git pull origin master` and after bumping `git push origin master`*

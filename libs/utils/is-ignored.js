'use strict';

module.exports = function isIgnored (fileName, ignoredDirectories) {
    return ignoredDirectories.some(dir => dir === fileName);
};

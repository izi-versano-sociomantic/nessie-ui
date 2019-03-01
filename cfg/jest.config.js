/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


module.exports = {
    // The jest <rootDir> is presumed to be wherever the config
    // file is, so here we put it back to the root folder.
    rootDir : '../',

    testMatch :
    [
        '<rootDir>/src/**/tests.{js,jsx}',
    ],
    transform : {
        '^.+\\.(js|jsx)?$' : 'babel-jest',
    },

    // We should specify that jest should load all dependencies
    // from the ROOT node_modules folder. If not, and you have
    // a dependency symlinked, there can potentially be two
    // versions of a module loaded (such as react).
    moduleDirectories :
    [
        '<rootDir>/node_modules',
        '<rootDir>/src',
    ],

    // Tell jest explicitly where to search for source files
    // and test files. Otherwise jest will parse any folders
    // including local npm caches etc.
    roots :
    [
        '<rootDir>/src',
    ],

    setupFiles :
    [
        // '<rootDir>/src/Testing/setupTestEnvironment.js',
    ],

    setupFilesAfterEnv :
    [
        'react-testing-library/cleanup-after-each',
    // ... other setup files ...
    ],

    moduleNameMapper : Object.assign(
        {},
        // Map module aliases to directories
        {
            'nessie-ui' : '<rootDir>/src/index',
            // 'componentDriver' : '<rootDir>/src/Testing/index',
        },
        // Mock assets
        {
            '\\.(html|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$' :
                '<rootDir>/src/Testing/mocks/fileMock.js',
            // '\\.(css|less|scss)$' : 'identity-obj-proxy',
            'createCssMap' :
                '<rootDir>/src/Testing/mocks/createCssMapMock.js',
        } /* eslint-disable-line comma-dangle */
    ),

    verbose : true,

    transformIgnorePatterns :
    [
        // 'node_modules/(?!flounder)',
    ],
};

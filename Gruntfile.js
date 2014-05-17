/*
 * grunt-mout
 * https://github.com/jmdobry/grunt-mout
 *
 * Copyright (c) 2014 Jason Dobry
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var tempPath = './.tmp/';

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'test/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: [tempPath]
		},

		// Configuration to be run (and then tested).
		mout: {
			'array-only': {
				options: {
					modules: [
						'mout/array'
					]
				},
				dest: tempPath + 'mout-array-only.js'
			},
			'time-only': {
				options: {
					modules: [
						'mout/time'
					]
				},
				dest: tempPath + 'mout-time-only.js'
			},
			'array-and-time': {
				options: {
					modules: [
						'mout/array',
						'mout/time'
					]
				},
				dest: tempPath + 'array-and-time.js'
			},
			'array-collection-object': {
				options: {
					modules: [
						'mout/array',
						'mout/collection',
						'mout/object'
					]
				},
				dest: tempPath + 'array-collection-object.js'
			}
		},

		simplemocha: {
			options: {
				globals: ['assert'],
				timeout: 3000,
				ignoreLeaks: false,
				//grep: '*-test',
				ui: 'bdd',
				reporter: 'spec'
			},

			dist: {
				src: [
					'test/**/*.js'
				]
			}
		}
	});

	grunt.loadTasks('tasks');
	grunt.registerTask('default', ['clean', 'jshint', 'mout', 'simplemocha']);
};

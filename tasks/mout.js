/*
 * grunt-mout
 * https://github.com/jmdobry/grunt-mout
 *
 * Copyright (c) 2014 Jason Dobry
 * Licensed under the MIT license.
 */
'use strict';

var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var difference = require('mout/array/difference');
var contains = require('mout/array/contains');
var reject = require('mout/array/reject');
var subModules = [
	// array
	'mout/array',
	'mout/array/append',
	'mout/array/collect',
	'mout/array/combine',
	'mout/array/compact',
	'mout/array/contains',
	'mout/array/difference',
	'mout/array/every',
	'mout/array/filter',
	'mout/array/find',
	'mout/array/findLast',
	'mout/array/findIndex',
	'mout/array/findLastIndex',
	'mout/array/flatten',
	'mout/array/forEach',
	'mout/array/indexOf',
	'mout/array/insert',
	'mout/array/intersection',
	'mout/array/invoke',
	'mout/array/join',
	'mout/array/lastIndexOf',
	'mout/array/map',
	'mout/array/max',
	'mout/array/min',
	'mout/array/pick',
	'mout/array/pluck',
	'mout/array/range',
	'mout/array/reduce',
	'mout/array/reduceRight',
	'mout/array/reject',
	'mout/array/remove',
	'mout/array/removeAll',
	'mout/array/shuffle',
	'mout/array/slice',
	'mout/array/some',
	'mout/array/sort',
	'mout/array/sortBy',
	'mout/array/split',
	'mout/array/toLookup',
	'mout/array/union',
	'mout/array/unique',
	'mout/array/xor',
	'mout/array/zip',
	// collection
	'mout/collection',
	'mout/collection/contains',
	'mout/collection/every',
	'mout/collection/filter',
	'mout/collection/find',
	'mout/collection/forEach',
	'mout/collection/map',
	'mout/collection/max',
	'mout/collection/min',
	'mout/collection/pluck',
	'mout/collection/reduce',
	'mout/collection/reject',
	'mout/collection/size',
	'mout/collection/some',
	// date
	'mout/date',
	'mout/date/dayOfTheYear',
	'mout/date/diff',
	'mout/date/isLeapYear',
	'mout/date/isSame',
	'mout/date/parseIso',
	'mout/date/quarter',
	'mout/date/startOf',
	'mout/date/strftime',
	'mout/date/timezoneAbbr',
	'mout/date/timezoneOffset',
	'mout/date/totalDaysInMonth',
	'mout/date/totalDaysInYear',
	'mout/date/weekOfTheYear',
	// function
	'mout/function',
	'mout/function/awaitDelay',
	'mout/function/bind',
	'mout/function/compose',
	'mout/function/constant',
	'mout/function/debounce',
	'mout/function/func',
	'mout/function/identity',
	'mout/function/partial',
	'mout/function/prop',
	'mout/function/series',
	'mout/function/throttle',
	'mout/function/timeout',
	'mout/function/times',
	// lang
	'mout/lang',
	'mout/lang/clone',
	'mout/lang/createObject',
	'mout/lang/ctorApply',
	'mout/lang/deepClone',
	'mout/lang/defaults',
	'mout/lang/inheritPrototype',
	'mout/lang/is',
	'mout/lang/isnt',
	'mout/lang/isArguments',
	'mout/lang/isArray',
	'mout/lang/isBoolean',
	'mout/lang/isDate',
	'mout/lang/isEmpty',
	'mout/lang/isFinite',
	'mout/lang/isFunction',
	'mout/lang/isKind',
	'mout/lang/isInteger',
	'mout/lang/isNaN',
	'mout/lang/isNull',
	'mout/lang/isNumber',
	'mout/lang/isObject',
	'mout/lang/isPlainObject',
	'mout/lang/isRegExp',
	'mout/lang/isString',
	'mout/lang/isUndefined',
	'mout/lang/kindOf',
	'mout/lang/toArray',
	'mout/lang/toNumber',
	'mout/lang/toString',
	// math
	'mout/math',
	'mout/math/ceil',
	'mout/math/clamp',
	'mout/math/countSteps',
	'mout/math/floor',
	'mout/math/inRange',
	'mout/math/isNear',
	'mout/math/lerp',
	'mout/math/loop',
	'mout/math/map',
	'mout/math/norm',
	'mout/math/round',
	// number
	'mout/number',
	'mout/number/abbreviate',
	'mout/number/currencyFormat',
	'mout/number/enforcePrecision',
	'mout/number/isNaN',
	'mout/number/MAX_INT',
	'mout/number/MAX_UINT',
	'mout/number/MIN_INT',
	'mout/number/nth',
	'mout/number/ordinal',
	'mout/number/pad',
	'mout/number/rol',
	'mout/number/ror',
	'mout/number/sign',
	'mout/number/toInt',
	'mout/number/toUInt',
	'mout/number/toUInt31',
	// object
	'mout/object',
	'mout/object/bindAll',
	'mout/object/contains',
	'mout/object/deepEquals',
	'mout/object/deepFillIn',
	'mout/object/deepMatches',
	'mout/object/deepMixIn',
	'mout/object/equals',
	'mout/object/every',
	'mout/object/fillIn',
	'mout/object/filter',
	'mout/object/find',
	'mout/object/forIn',
	'mout/object/forOwn',
	'mout/object/functions',
	'mout/object/get',
	'mout/object/has',
	'mout/object/hasOwn',
	'mout/object/keys',
	'mout/object/map',
	'mout/object/matches',
	'mout/object/merge',
	'mout/object/max',
	'mout/object/min',
	'mout/object/mixIn',
	'mout/object/namespace',
	'mout/object/pick',
	'mout/object/pluck',
	'mout/object/reduce',
	'mout/object/reject',
	'mout/object/values',
	'mout/object/set',
	'mout/object/size',
	'mout/object/some',
	'mout/object/unset',
	// queryString
	'mout/queryString',
	'mout/queryString/contains',
	'mout/queryString/decode',
	'mout/queryString/encode',
	'mout/queryString/getParam',
	'mout/queryString/parse',
	'mout/queryString/getQuery',
	'mout/queryString/setParam',
	// random
	'mout/random',
	'mout/random/choice',
	'mout/random/guid',
	'mout/random/rand',
	'mout/random/randBit',
	'mout/random/randBool',
	'mout/random/randHex',
	'mout/random/randInt',
	'mout/random/randSign',
	'mout/random/random',
	// string
	'mout/string',
	'mout/string/camelCase',
	'mout/string/contains',
	'mout/string/crop',
	'mout/string/endsWith',
	'mout/string/escapeHtml',
	'mout/string/escapeRegExp',
	'mout/string/escapeUnicode',
	'mout/string/hyphenate',
	'mout/string/insert',
	'mout/string/interpolate',
	'mout/string/lowerCase',
	'mout/string/lpad',
	'mout/string/ltrim',
	'mout/string/makePath',
	'mout/string/normalizeLineBreaks',
	'mout/string/pascalCase',
	'mout/string/properCase',
	'mout/string/removeNonASCII',
	'mout/string/removeNonWord',
	'mout/string/repeat',
	'mout/string/replace',
	'mout/string/replaceAccents',
	'mout/string/rpad',
	'mout/string/rtrim',
	'mout/string/sentenceCase',
	'mout/string/stripHtmlTags',
	'mout/string/startsWith',
	'mout/string/slugify',
	'mout/string/trim',
	'mout/string/truncate',
	'mout/string/typecast',
	'mout/string/unCamelCase',
	'mout/string/underscore',
	'mout/string/unescapeHtml',
	'mout/string/unescapeUnicode',
	'mout/string/unhyphenate',
	'mout/string/upperCase',
	'mout/string/WHITE_SPACES',
	// time
	'mout/time',
	'mout/time/convert',
	'mout/time/now',
	'mout/time/parseMs',
	'mout/time/toTimeString'
];

var modules = [
	'mout/array',
	'mout/collection',
	'mout/date',
	'mout/function',
	'mout/lang',
	'mout/math',
	'mout/number',
	'mout/object',
	'mout/queryString',
	'mout/random',
	'mout/string',
	'mout/time'
];

var defaults = {
	dest: './.tmp/mout.js',
	standalone: 'mout',
	debug: false,
	spy: false
};

module.exports = function (grunt) {

	function createDestDir(destination) {
		var destPath = path.dirname(path.resolve(destination));
		if (!grunt.file.exists(destPath)) {
			grunt.file.mkdir(destPath);
		}
		return destPath;
	}

	grunt.registerMultiTask('mout', 'Grunt task for creating custom browserify builds of http://moutjs.com.', function () {
		var options = this.options(defaults);
		var done = this.async();
		var b = browserify();
		var files;

		function complete(err) {
			if (err) {
				grunt.log.error(err);
				done(false);
			} else {
				if (options.spy) {
					fs.appendFile(options.dest, fs.readFileSync(path.join(process.cwd(), './lib/spy.js'), { encoding: 'utf8' }), function (err) {
						if (err) {
							grunt.log.error(err);
							done(false);
						} else {
							grunt.log.ok();
							done();
						}
					});
				} else {
					grunt.log.ok();
					done();
				}
			}
		}

		try {
			b.on('error', complete);
			options.dest = this.files.length ? this.files[0].dest : defaults.dest;

			if (!('modules' in options)) {
				files = [];
			} else {
				files = difference(subModules, options.modules);
				modules.forEach(function (name) {
					if (contains(options.modules, name)) {
						files = reject(files, function (item) {
							return item.indexOf(name) !== -1;
						});
					}
				});
			}

			createDestDir(options.dest);

			b.add(require.resolve('mout'));
			files.forEach(function (name) {
				b.ignore(require.resolve(name));
			});
			grunt.log.write('Writing ' + options.dest + '...');
			var writable = fs.createWriteStream(path.join(process.cwd(), options.dest));
			var readable = b.bundle({
				debug: options.debug,
				standalone: options.standalone
			});
			readable.on('error', complete);
			writable.on('error', complete);
			writable.on('close', function () {
				complete();
			});
			readable.pipe(writable);
		} catch (err) {
			complete(err);
		}
	});
};

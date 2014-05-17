/*jslint eqeqeq: false*/
/*global module, require, sinon*/
/*
 * grunt-mout
 * https://github.com/jmdobry/grunt-mout
 *
 * Copyright (c) 2014 Jason Dobry
 * Licensed under the MIT license.
 */
(function (mout) {
	'use strict';

	var commonJSModule = typeof module !== 'undefined' && module.exports;

	if (!sinon && commonJSModule) {
		mout = require("../mout");
	}

	if (!mout) {
		return;
	}

	function createProxy(module, subModule) {

		var orig = mout[module][subModule];

		mout[module][subModule] = function () {
			mout[module][subModule].callCount++;
			mout.callCount[module][subModule] = mout[module][subModule].callCount;
			return orig.apply(null, arguments);
		};
	}

	for (var module in mout) {
		if (mout.hasOwnProperty(module)) {
			for (var subModule in mout[module]) {
				if (mout[module].hasOwnProperty(subModule) && module !== 'fn') {
					if (typeof mout[module][subModule] === 'function') {
						createProxy(module, subModule);
						mout[module][subModule].callCount = 0;
					}
				}
			}
		}
	}

	mout.reset = function () {
		this.callCount = {};
		for (var module in mout) {
			if (mout.hasOwnProperty(module)) {
				this.callCount[module] = this.callCount[module] || {};
				for (var subModule in mout[module]) {
					if (mout[module].hasOwnProperty(subModule) && module !== 'fn') {
						if (typeof mout[module][subModule] === 'function') {
							mout[module][subModule].callCount = 0;
						}
					}
				}
			}
		}
	};

	mout.usage = function () {
		var modules = [];
		for (var module in this.callCount) {
			if (this.callCount.hasOwnProperty(module)) {
				for (var subModule in this.callCount[module]) {
					if (this.callCount[module].hasOwnProperty(subModule) && module !== 'fn') {
						if (typeof mout[module][subModule] === 'function') {
							modules.push('mout/' + module + '/' + subModule);
						}
					}
				}
			}
		}
		return modules;
	};

	mout.reset();

}(typeof mout == "object" && mout || null));

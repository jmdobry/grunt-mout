# **Unmaintained**

----

# grunt-mout

> Grunt task for creating custom browserify builds of [mout.js](http://moutjs.com).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mout --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mout');
```

## The "mout" task

### Overview
In your project's Gruntfile, add a section named `mout` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mout: {
    dist: {
      options: {
        modules: [
          'mout/array',
          'mout/object'
        ]
      },
      dest: './.tmp/mout.js'
    }
  }
});
```

### Options

#### dest
Type: `String`
Default value: `'./.tmp/mout.js'`

Destination file.

#### options.modules
Type: `Array`
Default value: `null`

List of [mout.js](http://moutjs.com) modules to include. Omit this option to include all of them.

#### options.debug
Type: `Boolean`
Default value: `false`

Whether to include an inline source map at the bottom of the generated `mout` bundle.

#### options.spy
Type: `Boolean`
Default value: `false`

Whether to augment the generated `mout` bundle with methods for recording and printing your app's usage of mout. Use this
functionality to learn what `mout` modules your app uses, so you can generate a slimmer `mout` build. Methods added to `mout`:

###### `mout.callCount`
An object containing the call counts.

###### `mout.reset()`
Reset call counts to zero.

###### `mout.usage()`
Return an array of the modules that were called. This array will be in the format required for the `options.modules` option of the grunt task.

### Usage Examples

#### Default Options
Using the default options, all [mout.js](http://moutjs.com) modules will be included and the bundle will be written to `./.tmp/mout.js`.

```js
grunt.initConfig({
  mout: {
    dist: {}
  }
});
```

#### Custom Options
Override the destination path or specify a whitelist of [mout.js](http://moutjs.com) modules to include (their dependencies will automatically be included) .

```js
grunt.initConfig({
  mout: {
    dist: {
      options: {
        modules: [
          'mout/array',
          'mout/object',
          'mout/string/typecast',
          'mout/time/convert'
        ]
      },
      dest: './.tmp/mout.js'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

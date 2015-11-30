module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'],

		frameworks: ['browserify', 'jasmine'],

		files: [
			'src/scripts/**/*.js',
			'test/**/*.spec.js'
		],

		preprocessors: {
			'src/scripts/**/*.js': ['browserify'],
			'test/**/*.js': ['browserify']
		},

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-browserify'
		],

		browserify: {
			debug: true,
		}

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		singleRun: true
	});
};
module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'],

		frameworks: [
			'browserify', 
			'jasmine-jquery',
			'jasmine', 
			'jquery-2.1.0'
		],

		files: [
			//'src/scripts/**/*.js',
			'test/**/*.spec.js',
			{ 
				pattern:  'test/fixtures/*.html',
				watched: true,
				included: false,
				served: true 
			}
		],

		preprocessors: {
			//'src/scripts/**/*.js': ['browserify'],
			'test/**/*.js': ['browserify']
		},

		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-jasmine-jquery',
			'karma-browserify',
			'karma-jquery'
		],

		browserify: {
			debug: true,
		},

		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		//singleRun: true
	});
};
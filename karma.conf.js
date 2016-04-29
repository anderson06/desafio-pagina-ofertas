module.exports = function(config) {
	config.set({
		browsers: ['PhantomJS'],

		frameworks: [
			'jasmine-jquery',
			'jasmine',
			'browserify',
		],

		files: [
			//'src/scripts/**/*.js',
      //'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
			'test/**/*.spec.js',
			{
				pattern:  'test/client/fixtures/*.html',
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
			'karma-jasmine-jquery',
			'karma-jasmine',
			'karma-browserify',
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

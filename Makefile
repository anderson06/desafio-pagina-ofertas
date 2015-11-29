all: install run

install:
	@echo "Installing dependencies, it might take awhile"
	npm install

run:
	@echo "Starting application"
	./node_modules/gulp/bin/gulp.js

test:
	@echo "Running tests"
	./node_modules/karma/bin/karma start karma.conf.js 

.PHONY: test install run
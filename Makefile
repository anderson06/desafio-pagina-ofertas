all: install run

install:
	@echo "Instaling..."
	npm install

test:
	@echo "Testing..."
	./node_modules/karma/bin/karma start karma.conf.js 

run:
	@echo "Starting..."
	./node_modules/gulp/bin/gulp.js

.PHONY: test install run

src: index.js
	@component build -o src -n bindings
	@component build -o src -n bindings.standalone -s bindings

dev: components index.js
	@component build --dev -o dev -n bindings

components: component.json
	@component install --dev

test: dev components
	@open test/index.html

clean:
	@rm -fr src components dev

.PHONY: clean test dev

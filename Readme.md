
# bindings
a minimal binding library for the dom. runs with component.io and as standalone.

## Installation

Install with [component(1)](http://component.io):

```bash
$ component install maxhoffmann/bindings
```

…or simply download the repository. Use `bindings.standalone.js` if you don’t use component.io.

## API

If you use component.io make sure to require the library:

```javascript
var bindings = require('bindings');
```

Include some `data-bind` attributes in your HTML:

```html
<ul>
	<li data-bind="person.name">Max</li>
	<li data-bind="person.age">24</li>
</ul>
<ul>
	<li data-bind="animal.type">dog</li>
	<li data-bind="animal.color">white</li>
</ul>
```

Get some data from the DOM:

```javascript
var dom = bindings();
var name = dom.person.name;
var color = dom.animal.color;
```

Update some data in the DOM:

```javascript
var dom = bindings();
dom.person.name = 'Joe';
dom.animal.type = 'cat';
```

You may use a different syntax:

```javascript
bindings().person.name
bindings('person').name
```

You may specify a root element:

```javascript
bindings('person', rootElement).name
```


## Customization

Make a new dev build:

```bash
$ make dev
```

Run tests by opening `test/index.html` or run:

```bash
$ make test
```

If all of your tests pass, make a new production build (includes standalone build):

```bash
$ make
```

## License

MIT

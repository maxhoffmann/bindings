
# bindings
a minimal binding library for the DOM. runs with component.io and standalone.

bindings.js uses ES5 getters and setters to get or update DOM elements. Keep in mind that
you should treat this library as another way to access the DOM. Don’t do things like
read, write, read, write… or performance might hurt. For best performance, cache the returned
object of bindings() and only get a new one, when you’ve expected DOM changes. Additionally
specify a root element whenever possible. Before you optimize anything: "Use tools, not rules".
The DOM may not be your bottleneck as it is pretty fast in modern browsers.

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

Include `data-bind` attributes in your HTML:

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

Get data from the DOM:

```javascript
var dom = bindings();
var name = dom.person.name;	// name is 'Max'
var color = dom.animal.color; // color is 'white'
```

Update data in the DOM:

```javascript
var dom = bindings();
dom.person.name = 'Joe';
dom.animal.type = 'cat';
dom.animal.color = '<span>black</span>'; // you can use HTMLt
```

And the DOM changes automatically:

```html
<ul>
	<li data-bind="person.name">Joe</li>
	<li data-bind="person.age">24</li>
</ul>
<ul>
	<li data-bind="animal.type">cat</li>
	<li data-bind="animal.color"><span>black</span></li>
</ul>
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

Convert data to JSON:

```javascript
var json = JSON.stringify( bindings('animal') );
var json = JSON.stringify( bindings().animal ); // same result

console.log(json); // "{"type":"cat","color":"<span>black</span>"}"
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

The MIT License (MIT)

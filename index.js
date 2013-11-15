"use strict";

function bindings(filter, root) {
	if ( !('querySelectorAll' in document && 'defineProperty' in Object && 'reduce' in Array.prototype) ) {
		return {};
	}
	root = root || document;
	var bindingsObject = {};
	var elements = (!filter) ? $('[data-bind]', root) : $('[data-bind^="'+filter+'."]', root);
	elements.forEach(appendToBindingsObject.bind(bindingsObject, filter), bindingsObject);
	return bindingsObject;
}

function appendToBindingsObject(filter, element) {
	var binding = (filter) ? element.getAttribute('data-bind').split(filter+'.')[1] : element.getAttribute('data-bind');
	var bindingStrings = binding.split('.');
	bindingStrings.reduce(convertStringToObject.bind(this, gettersAndSetters.bind(this, element)), this);
}

function convertStringToObject(callback, object, string, index, arrayOfStrings) {
	if ( index === arrayOfStrings.length-1 ) {
		callback(object, string);
	}
	if (!object[string]) {
		object[string] = {};
	}
	return object[string];
}

function gettersAndSetters(element, object, property) {
	Object.defineProperty(object, property, {
		get: function() {
			if (!element.parentNode) {
				delete object[property];
				return undefined;
			}
			return element.innerHTML;
		},
		set: function(value) {
			if (!element.parentNode) {
				delete object[property];
				throw new Error('element is not part of the dom');
			}
			element.innerHTML = value;
		},
		enumerable: true,
		configurable: true
	});
}

function $(selector, root) {
	root = root || document;
	return Array.prototype.slice.call(root.querySelectorAll(selector));
}

module.exports = bindings;

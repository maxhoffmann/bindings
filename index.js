"use strict";

var REGEX_ARRAY = /\[([0-9]+)\]$/;

function bindings(filter, rootElement) {

	if ( !('querySelectorAll' in document
		&& 'defineProperty' in Object
		&& 'reduce' in Array.prototype)
	) {
		return {};
	}
	rootElement = rootElement || document;

	var selector = (filter) ? '[data-bind^="'+filter+'."]' : '[data-bind]';
	var elementsWithBindings = $(selector, rootElement);

	return elementsWithBindings.reduce(createBindingsObject, {});

	function createBindingsObject(bindings, element) {
		var bindingsArray = getBindingsArrayFromElement(element, filter);
		bindingsArray.reduce(convertBindingStringToObject, bindings);

		function getBindingsArrayFromElement(element, filter) {
			var bindingString = element.getAttribute('data-bind');
			if ( filter ) bindingString = bindingString.split(filter+'.')[1];
			return bindingString.split('.');
		}

		function convertBindingStringToObject(bindingObject, bindingString, index, bindingArray) {
			if ( REGEX_ARRAY.test(bindingString) ) {
				bindingString = bindingString.replace(REGEX_ARRAY,"");
				if ( !bindingObject[bindingString] ) {
					bindingObject[bindingString] = [];
				}
			}
			if (Array.isArray(bindingObject)) {
				var arrayIndex = bindingArray[index-1].match(REGEX_ARRAY)[1];
				if (!bindingObject[arrayIndex]) {
					bindingObject[arrayIndex] = {};
				}
				if (!bindingObject[arrayIndex][bindingString]) {
					bindingObject[arrayIndex][bindingString] = {};
				}
				if ( index === bindingArray.length-1 ) {
					return addGettersAndSetters(bindingObject[arrayIndex], bindingString);
				}
				return bindingObject[arrayIndex][bindingString];
			}
			if ( index === bindingArray.length-1 ) {
				addGettersAndSetters(bindingObject, bindingString);
			}
			if (!bindingObject[bindingString]) {
				bindingObject[bindingString] = {};
			}
			return bindingObject[bindingString];
		}

		function addGettersAndSetters(bindings, bindingString) {
			Object.defineProperty(bindings, bindingString, {
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			});

			function getter() {
				if (!element.parentNode) {
					delete bindings[bindingString];
					return undefined;
				}
				return element.innerHTML;
			}

			function setter(value) {
				if (!element.parentNode) {
					delete bindings[bindingString];
					throw new Error('element is not part of the dom');
				}
				element.innerHTML = value;
			}

			return bindings;
		}

		return bindings;
	}

}

function $(selector, rootElement) {
	rootElement = rootElement || document;
	return Array.prototype.slice.call(rootElement.querySelectorAll(selector));
}

module.exports = bindings;

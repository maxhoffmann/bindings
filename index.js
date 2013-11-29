"use strict";

function bindings(filter, root) {

	if ( !('querySelectorAll' in document && 'defineProperty' in Object && 'reduce' in Array.prototype) ) {
		return {};
	}
	root = root || document;

	var selector = (filter) ? '[data-bind^="'+filter+'."]' : '[data-bind]';
	var elements = $(selector, root);

	return elements.reduce(function(bindings, element) {
		var binding = getBinding(element, filter);
		binding.reduce(addToBindingsObject, bindings);

		function getBinding(element, filter) {
			var binding = element.getAttribute('data-bind');
			if ( filter ) binding = binding.split(filter+'.')[1];
			return binding.split('.');
		}

		function addToBindingsObject(bindings, bindingPart, index, binding) {
			if ( index === binding.length-1 ) {
				addGettersAndSetters(bindings, bindingPart);
			}
			if (!bindings[bindingPart]) {
				bindings[bindingPart] = {};
			}
			return bindings[bindingPart];
		}

		function addGettersAndSetters(bindings, key) {
			Object.defineProperty(bindings, key, {
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			});

			function getter() {
				if (!element.parentNode) {
					delete bindings[key];
					return undefined;
				}
				return element.innerHTML;
			}

			function setter(value) {
				if (!element.parentNode) {
					delete bindings[key];
					throw new Error('element is not part of the dom');
				}
				element.innerHTML = value;
			}
		}

		return bindings;
	}, {});

}

function $(selector, root) {
	root = root || document;
	return Array.prototype.slice.call(root.querySelectorAll(selector));
}

module.exports = bindings;

describe('bindings', function () {

	var bindings = require('bindings');
	var assert = require('assert');
	var testdom = document.getElementById('testdom');
	var testHTML = testdom.innerHTML;

	afterEach(function () {
		testdom.innerHTML = testHTML;
	});

	it('should return objects', function () {
		var data = bindings();

		assert( !!data.dog, 'has dog bindings');
		assert( !!data.pokemon, 'has pokemon bindings');
	});

	it('should have getters', function () {
		var data = bindings();

		assert( data.dog.characteristics.color === 'white', 'dog has getters');
		assert( data.pokemon.color === 'yellow', 'pokemon has getters');
	});

	it('should have setters', function () {
		var data = bindings();

		data.dog.type = 'new value'
		data.pokemon.color = 'new value'

		assert( data.dog.type === 'new value', 'dog has setters');
		assert( data.pokemon.color === 'new value', 'pokemon has setters');
	});

	it('should return a specified binding', function () {
		var dog = bindings('dog');

		assert( dog.type === 'dog', 'specified binding is set correctly' );
	});

	it('should only traverse children of the specified element', function () {
		var root = document.getElementById('roottest');

		var data = bindings(null, root);

		assert( !data.dog, 'dog is not found' );
		assert( !!data.pokemon, 'pokemon is found' );
	});

	it('should return an empty object if nothing is found', function () {
		var data = bindings('hello');

		assert( !!data, 'returns empty object' );
	});

	it('should throw an error if element is not part of the dom', function () {
		var element = document.querySelector('[data-bind="dog.type"]');

		var data = bindings();
		element.parentNode.removeChild(element);

		assert( typeof data.dog.type === 'undefined', 'property has been deleted' );
		try {
			assert( data.dog.type = 'test', 'should throw an error' );
		} catch(e) {
			assert( true, 'Error has been thrown');
		}
	});

	it('should return an array for properties ending with []', function () {
		var data = bindings();

		assert( Array.isArray(data.shoppinglist), 'returns array' );
	});

	it('should add objects to arrays', function () {
		var data = bindings();

		assert( data.shoppinglist[0].title === 'milk', 'adds objects to array correctly' );
	});

	it('should allow multiple values in objects in arrays', function () {
		var data = bindings();

		assert( data.shoppinglist[2].title === 'cheese', 'adds multiple values to objects in arrays' );
		assert( data.shoppinglist[2].status === 'done', 'adds multiple values to objects in arrays' );
	});

	it('should allow nested objects in arrays', function () {
		var data = bindings('wishlist');

		assert( data.technology[0].game.platform === 'playstation4', 'adds nested objects to arrays' );
		assert( data.technology[1].game.title === 'Ryse', 'adds nested objects to arrays' );
	});

});

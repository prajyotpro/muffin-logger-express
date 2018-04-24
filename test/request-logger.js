var Assert 		= require('assert');  
var behavior 	= require('../behavior.js'); 



describe('behavior', () => {  

	describe('behavior1', () => {
		it('returns "HELLO WORLD"', () => {
			return Assert.equal(behavior.behavior1(), 'HELLO WORLD');
		});
	});

	describe('behavior2', () => {

		it('returns "foo" when passed "FOO"', () => {
			return Assert.equal(behavior.behavior2('FOO'), 'foo');
		});

		it('returns "bar" when passed "BAR"', () => {
			return Assert.equal(behavior.behavior2('BAR'), 'bar');
		});

		it('returns "hello world" when passed "HELLO WORLD"', () => {
			return Assert.equal(behavior.behavior2('HELLO WORLD'), 'hello world');
		});
	});
});
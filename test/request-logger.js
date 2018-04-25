const chai 		= require('chai');
const assert 	= chai.assert;
const should 	= chai.should();
const expect 	= chai.expect;
const Assert 	= require('assert');


const behavior 	= require('../behavior.js'); 


describe('==> behavior', () => {  

	describe('==> setConfiguration', () => {
		it('returns object', () => { 
			var options = {};
			behavior.setConfiguration(options).should.be.a('object');
		});
	});

	describe('==> checkServerLogFolder', () => {
		it('returns true', () => { 
			return Assert.equal(behavior.checkIfServerLogFolderExists(), true);
		});
	});

	describe('==> checkDefaultLogFolder', () => {
		it('returns true', () => { 
			return Assert.equal(behavior.checkIfDefaultLogFolderExists(), true);
		});
	});

	describe('==> checkErrorLogFolder', () => {
		it('returns true', () => { 
			return Assert.equal(behavior.checkIfDefaultErrorFolderExists(), true);
		});
	});
	
});
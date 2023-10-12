describe('dawds', () => {
	it('dsa', () => {
		cy.get('#user').click();
		cy.get('#user').type('bebop');
		cy.get('#pass').click();
		cy.get('#pass').type('wewop');
		cy.get('#signin').click();
		// one of your recroded inputs was invalid
		// one of your recroded inputs was invalid
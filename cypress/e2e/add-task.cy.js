describe('My first test', () => {
  it('add task when input is provided', () => {
    cy.visit('http://localhost:5173')
    const input = cy.get('input[name="task"]').type('Minha nova tarefa{enter}');
    cy.contains('Minha nova tarefa').should('be.visible');
  });

  it('delete task when delete button is clicked', () => {
    cy.visit('http://localhost:5173')
    const input = cy.get('input[name="task"]').type('Minha nova tarefa{enter}');
    cy.contains('Minha nova tarefa').should('be.visible');
    cy.get('.btn-remove').click();
    cy.contains('Minha nova tarefa').should('not.exist');
  });
})
// Custom commands for API intercepts and auth helpers

Cypress.Commands.add("interceptApi", (method, path, response, alias) => {
  cy.intercept(method, `**/api/v1${path}`, response).as(alias);
});

Cypress.Commands.add("loginAs", (role = "creator") => {
  const user =
    role === "brand"
      ? { id: 1, email: "brand@test.com", role: "brand", name: "Test Brand" }
      : { id: 2, email: "creator@test.com", role: "creator", name: "Test Creator" };

  window.localStorage.setItem("token", "fake-jwt-token");
  window.localStorage.setItem("user", JSON.stringify(user));
});

Cypress.Commands.add("clearAuth", () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
});

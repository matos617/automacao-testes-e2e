// Fixture customizada usando base.extend

/*
REQUISITO 3: Fixture Customizada (fixtures/auth.fixture.ts) — [Valor: 2,0 pontos]
- Utilizar o método base.extend do Playwright para criar a fixture.
- Entregar a página já autenticada no painel ou a instância da Page Object pronta para o teste.
- Pelo menos 1 teste demonstrando o uso da fixture.
*/

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixtures = {
  loginPage: LoginPage;
  loginPageAutenticada: LoginPage;
};

export const test = base.extend <AuthFixtures> ({
  // Page Object já na tela de login
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Page Object com o usuário já logado
  loginPageAutenticada: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'UserPassword123');
    await page.waitForURL(/painel\.html/);
    await use(loginPage);
  },
});

export { expect };
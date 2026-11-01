// Teste dinâmico em loop com for...of

/*
REQUISITO 4: Data-Driven Básico (tests/login-data-driven.spec.ts) — [Valor: 1,0 ponto]
- Criar um array com pelo menos 3 perfis/cenários (ex: cliente válido, admin válido, senha errada).
- Usar a estrutura for (const cenario of cenarios) para gerar os testes sem duplicar código.
*/

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const cenarios = [
  { nome: 'cliente válido', email: 'user@system.com', senha: 'UserPassword123', sucesso: true }, // caminho feliz
  { nome: 'admin válido', email: 'admin@system.com', senha: 'AdminPassword123', sucesso: true },
  { nome: 'senha errada', email: 'user@system.com', senha: 'senhaErrada', sucesso: false }, // caminho infeliz
];

for (const cenario of cenarios) {
  test(`Login - ${cenario.nome}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(cenario.email, cenario.senha);

    if (cenario.sucesso) {
      await expect(page).not.toHaveURL(/login\.html/);
    } else {
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
}
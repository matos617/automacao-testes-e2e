// Testes E2E consumindo o Page Object

/*
REQUISITO 2: Testes E2E Limpos com POM (tests/login-pom.spec.ts) — [Valor: 3,0 pontos]
- Instanciar a classe LoginPage no beforeEach ou no início do teste.
- Cenário 1 (Caminho Feliz): Login de cliente válido com validação de redirecionamento para o painel.
- Cenário 2 (Caminho Triste): Login com senha incorreta validando mensagem de erro visível.
- Cenário 3 (Regra de Negócio): Validar que o botão inicia desabilitado.
CRITÉRIO ELIMINATÓRIO: NENHUM seletor CSS pode aparecer dentro deste arquivo de teste!
*/

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login - Page Object Model', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('CT-01 - Login válido de cliente redireciona.', async ({ page }) => {
    await loginPage.login('user@system.com', 'UserPassword123');
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('CT-02 - Senha incorreta exibe erro.', async () => {
    await loginPage.login('user@system.com', 'senhaErrada');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('CT-03 - Botão inicia desabilitado.', async () => {
    await expect(loginPage.loginButton).toBeDisabled();
  });
});
// Criado

import { test, expect } from '../fixtures/auth.fixture';

test('usuário autenticado chega ao painel via fixture', async ({ page, loginPageAutenticada }) => {
  await expect(page).toHaveURL(/painel\.html/);
});
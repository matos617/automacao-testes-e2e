// Classe Page Object encapsulando a tela

/* REQUISITO 1: Classe Page Object (pages/LoginPage.ts) — [Valor: 4,0 pontos]
- Construtor com injeção de dependência recebendo private page: Page.
- Mapeamento encapsulado dos elementos (#email, #password, #loginBtn, #errorMessage, #statusMessage).
- Método goto() para acessar a tela de login da LojaQA.
- Método de ação login(email, password) que preenche com fill() e clica no botão de entrar.
- Métodos ou propriedades retornando os Locators para validação no teste.
REGRA DE OURO: NÃO COLOQUE expect() DENTRO DO PAGE OBJECT! */

import { Page, Locator } from "@playwright/test"

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly statusMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
  }

  async goto() {
    await this.page.goto('login.html');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
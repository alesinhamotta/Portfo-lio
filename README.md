# Portfólio - Alessandra Motta 💜

Site portfólio completo, responsivo e funcional com:
- Design moderno (dark mode + gradientes)
- Animações suaves
- Formulário de contato 100% funcional (online e local)
- Backend com Flask + SQLite (local)
- Deploy estático no GitHub Pages

Link ao vivo: https://alesinhamotta.github.io/Portfo-lio/

## Funcionalidades

- Formulário de contato funcionando em qualquer lugar (GitHub Pages inclusa)
- Banco de dados local (SQLite) pra desenvolvimento
- Envio de e-mail automático
- Totalmente customizável

## Como usar este projeto como base pro seu portfólio

### Opção 1: Só o visual (GitHub Pages - mais fácil)
1. Faça fork deste repositório
2. Ative o GitHub Pages em Settings → Pages → branch main
3. Troque as fotos, textos e cores nos arquivos HTML/CSS
4. Pronto! Seu portfólio tá no ar

### Opção 2: Com backend completo (rodar localmente ou em servidor)
```bash
# 1. Clone o projeto
git clone https://github.com/alesinhamotta/Portfo-lio.git
cd Portfo-lio

# 2. Crie e ative o ambiente virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# 3. Instale as dependências
pip install flask flask-sqlalchemy flask-mail python-dotenv

# 4. Configure o e-mail (arquivo .env na raiz)
echo MAIL_PASSWORD=suasenadeappaqui > .env

# 5. Rode o projeto
python app.py
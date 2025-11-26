from flask import Flask, render_template, request, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv   

load_dotenv()   

app = Flask(__name__)
app.secret_key = "supersegredo123"

# === CONFIGURAÇÕES ===
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contatos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# E-mail ( 100% seguro e funcionando)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'alesinhamotta@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')   
app.config['MAIL_DEFAULT_SENDER'] = 'alesinhamotta@gmail.com'

db = SQLAlchemy(app)
mail = Mail(app)

# === MODELO DO BANCO ===
class Contato(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    email = db.Column(db.String(100))
    assunto = db.Column(db.String(200))
    mensagem = db.Column(db.Text)

# Cria o banco na primeira vez
with app.app_context():
    db.create_all()

# === ROTAS ===
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    if request.method == 'POST':
        try:
            # Salva no banco
            novo = Contato(
                nome=request.form['name'],
                email=request.form['email'],
                assunto=request.form['subject'],
                mensagem=request.form['message']
            )
            db.session.add(novo)
            db.session.commit()

            # Envia e-mail
            msg = Message(
                subject=f"Novo contato: {request.form['subject']}",
                sender=app.config['MAIL_USERNAME'],
                recipients=[app.config['MAIL_USERNAME']],
                body=f"""
                Novo contato do portfólio!

                Nome: {request.form['name']}
                E-mail: {request.form['email']}
                Assunto: {request.form['subject']}

                Mensagem:
                {request.form['message']}
                """
            )
            mail.send(msg)

            flash("Mensagem enviada com sucesso! Entrarei em contato em breve 💜", "success")
        except Exception as e:
            flash(f"Erro ao enviar: {str(e)}", "danger")

        return redirect('/contato')

    return render_template('contato.html')

if __name__ == '__main__':
    app.run(debug=True)
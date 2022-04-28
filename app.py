import os
import bcrypt
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from models import db, User
from flask_bcrypt import Bcrypt

BASEDIR = os.path.abspath(os.path.dirname(__file__))
dbname = 'app.db'
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASEDIR, dbname)}"
app.config["SECRET_KEY"] = "do3*%^8*^#W^j&#8ve6dNn25^46P6^"
app.config["JWT_SECRET_KEY"] = "$C35@97h*&4Lf6gR3qM!286q%#4!#!"

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db.init_app(app)
Migrate(app, db, render_as_batch=True)
CORS(app)

@app.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")

    password_hash = bcrypt.generate_password_hash(password)

    user = User()
    user.user_name = name
    user.user_email = email
    user.user_passwd = password_hash

    db.session.add(user)
    db.session.commit()

    return jsonify({"SUCCESS": True}), 200

@app.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(user_email=email).first()
    if user is not None:
        if bcrypt.check_password_hash(user.user_passwd, password):
            access_token = create_access_token(identity=email)
            return jsonify({
                "SUCCESS": True,
                "access_token": access_token,
                "user": user.serialize()
            }), 200
        else:
            return jsonify({
                "msg": "Correo o contraseña incorrecta"
            })
    else: 
        return jsonify({
            "msg": "Correo no existe"
        })

@app.route("/get_user")
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    user = User.query.filter_by(user_email=current_user).first()
    return jsonify({
        "user": user.serialize()
    }), 200



if __name__ == "__main__":
    app.run(host="localhost", port="3000")

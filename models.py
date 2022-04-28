from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    user_id         = db.Column(db.Integer, primary_key=True)
    user_name       = db.Column(db.String(30), nullable=False)
    user_email      = db.Column(db.String(120), unique=True, nullable=False)
    user_passwd     = db.Column(db.String(120), nullable=False)
    def __repr__(self):
        return f"<User {self.user_id}>"

    def serialize(self):
        return {
            "id": self.user_id,
            "name": self.user_name,
            "mail": self.user_email
        }
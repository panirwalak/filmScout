from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.ext.declarative import declarative_base

from app import db, login_manager

Base = declarative_base()

class Watchlist(db.Model, Base):
    """
    Create watchlist table
    """
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    film_id = db.Column(db.Integer, index=True)
    film_title = db.Column(db.String(250), index=True)
    film_poster_path = db.Column(db.String(250), index=True)

class Watchedlist(db.Model, Base):
    """
    Create watchlist table
    """
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    film_id = db.Column(db.Integer, index=True)
    rating = db.Column(db.Float, index=True)
    film_title = db.Column(db.String(250), index=True)
    film_poster_path = db.Column(db.String(250), index=True)


class User(UserMixin, db.Model, Base):
    """
    Create an User table
    """

    # Ensures table will be named in plural and not in singular
    # as is the name of the model
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(60), index=True, unique=True)
    username = db.Column(db.String(60), index=True, unique=True)
    first_name = db.Column(db.String(60), index=True)
    last_name = db.Column(db.String(60), index=True)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean, default=False)
    watchlist = db.relationship("Watchlist", backref='users')
    watchedlist = db.relationship("Watchedlist", backref='users')

    @property
    def password(self):
        """
        Prevent pasword from being accessed
        """
        # raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        """
        Set password to a hashed password
        """
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        """
        Check if hashed password matches actual password
        """
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User: {}>'.format(self.username)

# Set up user_loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


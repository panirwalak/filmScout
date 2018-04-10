from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app import db, login_manager

class User(UserMixin, db.Model):
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

    @property
    def password(self):
        """
        Prevent pasword from being accessed
        """
        raise AttributeError('password is not a readable attribute.')

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

class Keywords(db.Model):
    keyword_id = db.Column(db.Integer, primary_key=True)
    keyword = db.Column(db.String(20))

class Jobs(db.Model):
    job_id = db.Column(db.Integer, primary_key=True)
    job = db.Column(db.String(20))

class Genres(db.Model):
    genre_id = db.Column(db.Integer, primary_key=True)
    parent_genre_id = db.Column(db.Integer)
    genre_name = db.Column(db.String(20))

class People(db.Model):
    person_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    name = db.Column(db.String(50))

class MPAA(db.Model):
    mpaa_rating_id = db.Column(db.Integer, primary_key=True)
    rating =  db.Column(db.String(5))

class Films(db.Model):
    film_id =  db.Column(db.Integer, primary_key=True)
    imdb_id = db.Column(db.Integer)
    title = db.Column(db.String(60))
    release_date = db.Column(db.Date)
    release_year = db.Column(db.Integer)
    mpaa_rating_id = db.Column(db.Integer)
    trailer_url = db.Column(db.String(100))
    poster_url = db.Column(db.String(100))
    synopsis = db.Column(db.String(600))
    runtime_mins = db.Column(db.Integer)
    quality_rating =  db.Column(db.Float)
    on_netflix = db.Column(db.Boolean)
    on_hulu = db.Column(db.Boolean)
    amazon_cost = db.Column(db.Integer)
    tmdb_poster_path = db.Column(db.String(100))

#many to many tables
CastCrew = db.Table('cast_crew',
    db.Column('film_id', db.Integer),
    db.Column('person_id', db.Integer),
    db.Column('job_id', db.Integer)
)

FilmGenres = db.Table('film_genres',
    db.Column('film_id', db.Integer),
    db.Column('genre_id', db.Integer),
)

FilmKeywords = db.Table('film_keywords',
    db.Column('film_id', db.Integer),
    db.Column('keyword_id', db.Integer),
)

Watchlist = db.Table('watchlist',
    db.Column('user_id', db.Integer),
    db.Column('film_id', db.Integer)
)

WatchedList = db.Table('watched_list',
    db.Column('user_id', db.Integer),
    db.Column('film_id', db.Integer),
    db.Column('rating', db.Integer)
)
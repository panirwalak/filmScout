from flask_wtf import FlaskForm
from wtforms.widgets import *
from wtforms import *
from wtforms.validators import *
import tmdbsimple as tmdb
tmdb.API_KEY = 'f0060a08bbd35f8312d0c4cc87b05595'

from ..models import Films, Genres,Keywords, MPAA, People

class FindMovieForm(FlaskForm):
    """
    Form for users to find a movie
    """
    # genres = SelectField(u'Genres', choices=[(12, 'Adventure'), (16, 'Animation'), (35, 'Comedy'), (80, 'Crime'), (99, 'Documentary'), (18, 'Drama'),
    #                                             (10751, 'Family'), (14, 'Fantasy'), (36, 'History'), (27, 'Horror'), (10402, 'Music'),
    #                                             (9648, 'Mystery'), (10759, 'Romance'), (878, 'Science Fiction'), (53, 'Thriller'), 
    #                                             (10770, 'TV Movies'), (10752, 'War'), (37, 'Western'), (28, 'Action'), ("", "")])
    keywords = TextField("That's about...")
    released = TextField("Released in...")
    actors = TextField("Starring...")
    directors = TextField("Directed By...")
    mpaaRating = SelectField('With an MPAA rating...', choices = [('G', 'G'), ('PG', 'PG'), ('PG-13', 'PG13'), ('R', 'R'), ('NC-17', 'NC17')])
    example = SelectField('Released...', choices=[('before','Before'),('after','After')])
    released = TextField('year ')
    rating = TextField('With a rating of at least...')
    submit = SubmitField('Find My Movie')


            

    

# app/home/views.py

from flask import flash, redirect, render_template, url_for
from flask_login import login_required

from . import home
from forms import FindMovieForm
from .. import db
from ..models import Films ,Keywords, MPAA, People
from flask import request

@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/index.html', title="Welcome")

@home.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    """
    Render the the search template
    """
    # film_id = request.form["detail-button"]
    # # form = FindMovieForm()
    # if film_id != 

    #     # check whether employee exists in the database and whether
    #     # the password entered matches the password in the database
    #     #user = User.query.filter_by(email=form.email.data).first()
    #     film = Films.query.filter_by(mpaa_rating_id=3).first()
    #     return render_template('home/results.html', results = film, title="Results")

    return render_template('home/dashboard.html', title="Dashboard")

@home.route('/movieDetails')
@login_required
def movieDetails():
    """
    Render movie details
    """

    # load results template
    return render_template('home/movie-detail.html', title="Detail")
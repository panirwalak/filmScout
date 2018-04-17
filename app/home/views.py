# app/home/views.py

from flask import flash, redirect, render_template, url_for
from flask_login import login_required, current_user

from . import home
from .. import db
# from ..models import Films ,Keywords, MPAA, People
from ..models import Watchlist, Watchedlist, User
from flask import request

@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/index.html', title="Welcome")

@home.route('/myAccount', methods=['GET', 'POST'])
@login_required
def myAccount():
    """
    Render the users acount information
    """
    user = current_user;

    return render_template('home/account.html', title="My Account", user=user)


@home.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    """
    Render the the search template
    """
    return render_template('home/dashboard.html', title="Dashboard")

@home.route('/movieDetails')
@login_required
def movieDetails():
    """
    Render movie details
    """
    # load results template
    return render_template('home/movie-detail.html', title="Detail")

@home.route('/addToWatchList', methods=['GET', 'POST'])
@login_required
def addToWatchList():
    """
    Add a movie to the watchedlist
    """
    userId = current_user.id
    string = request.form["watch"]
    string = string.split("+")
    movieId = string[0]
    movieTitle = string[1]
    moviePoster = string[2]
    watchlist = Watchlist(user_id=userId, film_id=movieId, film_title=movieTitle, film_poster_path=moviePoster)

    if Watchlist.query.filter_by(film_id=movieId).first():
        flash('You already added this movie')
        return redirect(url_for('home.movieDetails'))
    else:
        db.session.add(watchlist)
        db.session.commit()
        return redirect(url_for('home.movieDetails'))

    # return redirect(url_for('home.movieDetails'))
    # return render_template('home/movie-detail.html', title="Detail")


@home.route('/watchlist', methods=['GET', 'POST'])
@login_required
def watchlist():
    """
    Display watchlist
    """

    userId = current_user.id
    watchlist = Watchlist.query.filter_by(user_id=userId).all()
    print("omg stufffff")
    print(watchlist)
    

    return render_template('home/watchlist.html', title="Watchlist", watchlist=watchlist)



@home.route('/addToWatchedList', methods=['GET', 'POST'])
@login_required
def addToWatchedList():
    """
    Render movie details
    """
    userId = current_user.id
    string = request.form["watched"]
    string = string.split("+")
    movieId = string[0]
    movieTitle = string[1]
    moviePoster = string[2]
    rating = request.form["rating"]

    watchedlist = Watchedlist(user_id=userId, film_id=movieId, rating=rating, film_title=movieTitle, film_poster_path=moviePoster)

    if Watchedlist.query.filter_by(film_id=movieId).first():
            flash('You already rated this movie')
            return redirect(url_for('home.movieDetails'))
    else:
        db.session.add(watchedlist)
        db.session.commit()
        return redirect(url_for('home.movieDetails'))
    # load results template


@home.route('/watchedlist', methods=['GET', 'POST'])
@login_required
def watchedlist():
    """
    Display watchedlist
    """

    userId = current_user.id
    watchedlist = Watchedlist.query.filter_by(user_id=userId).all()
    print("omg stufffff")
    print(watchedlist)
    

    return render_template('home/watchedlist.html', title="Watchedlist", watchedlist=watchedlist)
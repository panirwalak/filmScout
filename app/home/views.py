# app/home/views.py

from flask import flash, redirect, render_template, url_for
from flask_login import login_required, current_user

from . import home
from .. import db
# from ..models import Films ,Keywords, MPAA, People
from forms import ChangePasswordForm, ChangeFirstNameForm, ChangeLastNameForm, ChangeUsernameForm, ChangeEmailForm
from ..models import Watchlist, Watchedlist, User
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash

@home.route('/')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('home/index.html', title="Welcome")

@home.route('/help', methods=['GET', 'POST'])
def helpMe():
    """
    Render the help page
    """

    return render_template('home/help.html', title="Help")


@home.route('/About Us', methods=['GET', 'POST'])
def about():
    """
    Render the about us page
    """

    return render_template('home/about.html', title="About")

@home.route('/myAccount', methods=['GET', 'POST'])
@login_required
def myAccount():
    """
    Render the users acount information
    """
    user = current_user;

    return render_template('home/account.html', title="My Account", user=user)


@home.route('/changeFirst', methods=['GET', 'POST'])
@login_required
def changeFirst():
    """
    Change the first name
    """
    form = ChangeFirstNameForm()
    user = current_user;
    if form.validate_on_submit():
        # check whether employee exists in the database and whether
        if user is not None:

            user.first_name = form.first_name.data
            db.session.commit()
        
            return redirect(url_for('home.myAccount'))
        # when email doesn't exist
        else:
            flash('Invalid email')


    return render_template('home/change.html', title="Change First Name", form=form)

@home.route('/changeLast', methods=['GET', 'POST'])
@login_required
def changeLast():
    """
    Changes the users last name
    """
    form = ChangeLastNameForm()
    user = current_user;
    if form.validate_on_submit():
        # check whether employee exists in the database and whether
        if user is not None:

            user.last_name = form.last_name.data
            db.session.commit()
        
            return redirect(url_for('home.myAccount'))
        # when email doesn't exist
        else:
            flash('Invalid email')


    return render_template('home/change.html', title="Change Last Name", form=form)

@home.route('/changeUsername', methods=['GET', 'POST'])
@login_required
def changeUsername():
    """
    Change the users username
    """
    form = ChangeUsernameForm()
    user = current_user;
    if form.validate_on_submit():
        # check whether employee exists in the database and whether
        if user is not None:

            user.username = form.username.data
            db.session.commit()
        
            return redirect(url_for('home.myAccount'))
        # when email doesn't exist
        else:
            flash('Invalid email')


    return render_template('home/change.html', title="Change Username", form=form)

@home.route('/changeEmail', methods=['GET', 'POST'])
@login_required
def changeEmail():
    """
    Change the users email
    """
    form = ChangeEmailForm()
    user = current_user;

    if form.validate_on_submit():
        # check whether employee exists in the database and whether
        if user is not None:

            user.email = form.email.data
            db.session.commit()
           
            return redirect(url_for('home.myAccount'))
        # when email doesn't exist
        else:
            flash('Invalid email')


    return render_template('home/change.html', title="Change Email", form=form)

@home.route('/changePassword', methods=['GET', 'POST'])
@login_required
def changePassword():
    """
    Change the users password
    """
    form = ChangePasswordForm()
    user = current_user
    if form.validate_on_submit():
        # check whether employee exists in the database and whether
        if user is not None:

            user.password_hash = generate_password_hash(form.password.data)
            db.session.commit()
           
            return redirect(url_for('home.myAccount'))
        # when email doesn't exist
        else:
            flash('Invalid email')

    return render_template('home/change.html', title="Change Password", form=form)


@home.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    """
    Render the the search template
    """
    return render_template('home/dashboard.html', title="Dashboard")

@home.route('/movieDetails/<FilmId>', methods=['GET', 'POST'])
@login_required
def movieDetails(FilmId):
    """
    Render movie details
    """
    #print(FilmId)
    if Watchlist.query.filter_by(film_id=FilmId).first():
        return render_template('home/movie-detail-addedwatch.html', title="Detail")
    elif Watchedlist.query.filter_by(film_id=FilmId).first():
        return render_template('home/movie-detail-addedwatched.html', title="Detail")
    else:
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

    watched = Watchedlist.query.filter_by(film_id=movieId).first()

    if Watchlist.query.filter_by(film_id=movieId).first():
        return render_template('home/movie-detail-addedwatch.html', title="Detail")
    elif watched is None:
        db.session.add(watchlist)
        db.session.commit()
        return render_template('home/movie-detail-addedwatch.html', title="Detail")
    else:
        return redirect(url_for('home.movieDetails', FilmId=movieId))
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

@home.route('/deleteWatch', methods=['GET', 'POST', 'DELETE'])
@login_required
def deleteWatch():
    """
    Delete a movie to from watchlist
    """
    filmId = request.form["delete"]
    
    record = Watchlist.query.filter_by(id=1)
    print(record.film_id)
    print(record.user_id)

    db.session.delete(record)
    db.session.commit()

    return redirect(url_for('home.watchlist'))

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

    watch = Watchlist.query.filter_by(film_id=movieId).first()

    watchedlist = Watchedlist(user_id=userId, film_id=movieId, rating=rating, film_title=movieTitle, film_poster_path=moviePoster)

    if Watchedlist.query.filter_by(film_id=movieId).first():
        return render_template('home/movie-detail-addedwatched.html', title="Detail")
    elif watch is None:
        db.session.add(watchedlist)
        db.session.commit()
        return render_template('home/movie-detail-addedwatched.html', title="Detail")
    else:
        return redirect(url_for('home.movieDetails', FilmId=movieId))

    
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
from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired, Email, EqualTo
from flask_wtf import Form



from ..models import User

class ChangeFirstNameForm(FlaskForm):
    """
    Form for users to change first name
    """
    first_name = StringField('First Name', validators=[DataRequired()])
    submit = SubmitField("Change First Name")

class ChangeLastNameForm(FlaskForm):
    """
    Form for users to change last name
    """
    last_name = StringField('Last Name', validators=[DataRequired()])
    submit = SubmitField("Change Last Name")

class ChangeUsernameForm(FlaskForm):
    """
    Form for users to change username
    """
    username = StringField('Username', validators=[DataRequired()])
    submit = SubmitField("Change Username")

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username is already in use.')

class ChangeEmailForm(FlaskForm):
    """
    Form for users to change email
    """
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField("Change Email")
    
    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Email is already in use.')

class ChangePasswordForm(FlaskForm):
    """
    Form for users to change password
    """
    password = PasswordField('Password', validators=[
                                        DataRequired(),
                                        EqualTo('confirm_password')
                                        ])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField("Change Password")



    

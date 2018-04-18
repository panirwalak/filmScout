# Film Scout

## Installation Instructions

### Using Virtual Environment

1. Install Python 2.7, Git, MySQL Ver 14.14 Distrib 5.7.21, virtualenv, in your computer, if you don't have it already.

NOTE: if you are using Python 3 you may need to use pip3 instead of pip

- virtualenv installation
```
sudo pip install virtualenv
```

2. Get the source code on your machine via git.

    ```shell
    git clone https://github.com/panirwalak/filmscout.git
    ```

3. Create a python virtual environment and install python dependencies.

    ```shell
    cd filmscout
    virtualenv venv
    source venv/bin/activate  # run this command everytime before working on project
    pip install -r requirements.txt
    ```
    
    
 5. Run the dev server
    ```
    export FLASK_CONFIG=development
    export FLASK_APP=run.py
    flask run
       Serving Flask app "run"
       *Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
    ```
 6. That's it! You should be able to see front end by navigating to http://127.0.0.1:5000/

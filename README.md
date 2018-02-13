# Film Scout

## Installation Instructions
Setting up Film Scout on your local machine is really easy. You can setup Film Scout using a virtual environment.

### Using Virtual Environment

1. Install [python] 2.7, [git], MySQL Ver 14.14 Distrib 5.7.21, [virtualenv], in your computer, if you don't have it already.

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

4. Create an empty MySQL database and run database migration.
    
    Creating MySQL Database: (THIS IS DONE IN A SEPARATE WINDOW ON YOUR COMPUTER NOT IN THE FILM COOUT DIRECTORY)
    ```
    mysql -u root
    mysql> CREATE USER 'fs_admin'@'localhost' IDENTIFIED BY 'fs2018';
    Query OK, 0 rows affected (0.00 sec)

    mysql> CREATE DATABASE filmscout_db;
    Query OK, 1 row affected (0.00 sec)

    mysql> GRANT ALL PRIVILEGES ON filmscout_db . * TO 'fs_admin'@'localhost';
    Query OK, 0 rows affected (0.00 sec)
    
    ```
    Migrating the data (in film scout venv)
    ```
    flask db migrate
    flask db upgrade
    
    ```
    Check if tables were created in MySQL (IN SEPARATE WINDOW)
    ```
    $ mysql -u root

      mysql> use dreamteam_db;

      mysql> show tables;
      +------------------------+
      | Tables_in_filmscout_db |
      +------------------------+
      | alembic_version        |
      | user                   |
      +------------------------+
      2 rows in set (0.00 sec)
    
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

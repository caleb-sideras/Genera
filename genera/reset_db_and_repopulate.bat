call python manage.py makemigrations
call python manage.py migrate --run-syncdb
call python populate.py
call PAUSE
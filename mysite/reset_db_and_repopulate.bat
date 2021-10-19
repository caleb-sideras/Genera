call DEL /S /Q "db.sqlite3"
call DEL /S /Q "media"
call python manage.py makemigrations
call python manage.py migrate
call python manage.py migrate --run-syncdb
call python populate.py
call PAUSE
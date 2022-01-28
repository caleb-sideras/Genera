call DEL /S /Q "db.sqlite3"
call RMDIR "media" /S /Q
call python manage.py makemigrations
call python manage.py migrate
call python manage.py migrate --run-syncdb
call python populate.py
call PAUSE
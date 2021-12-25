from json.decoder import JSONDecodeError
from django.shortcuts import render
import json

def error_base(request, exception, context):
    try:
        context = json.loads(str(exception))
    except JSONDecodeError:
        pass
    return render(request, 'error_handler.html', context)

def error_404(request, exception=None):
    return error_base(request, exception, {"title": "Page Not Found", "description": "Page could not be found.", "code": "404"})

def error_500(request, exception=None):
    return error_base(request, exception, {"title": "Internal Server Error", "description": "Something went wrong.", "code": "500"})

def error_403(request, exception=None):
   return error_base(request, exception, {"title": "Access Denied", "description": "You do not have permission to access this page.", "code": "403"})

def error_400(request, exception=None):
   return error_base(request, exception, {"title": "Bad Request", "description": "The request was invalid.", "code": "400"})

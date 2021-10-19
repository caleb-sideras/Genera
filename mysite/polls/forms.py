from django import forms
from django.forms.fields import ImageField
from django.forms.widgets import Textarea
from django.contrib.auth.models import User

class LoginForm(forms.ModelForm):
    username = forms.CharField(widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Username'}))
    password = forms.CharField(widget = forms.PasswordInput(attrs = {'placeholder' : 'Password'}))
    
    class Meta:
        model = User
        fields = ('username', 'password')
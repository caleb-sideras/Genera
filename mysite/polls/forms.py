from django import forms
from django.forms.fields import ImageField
from django.forms.widgets import Textarea
from django.contrib.auth.models import User
from polls.models import UserProfile
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate

class LoginForm(forms.ModelForm):
    username = forms.CharField(widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Username'}))
    password = forms.CharField(widget = forms.PasswordInput(attrs = {'placeholder' : 'Password'}))
    
    class Meta:
        model = User
        fields = ('username', 'password')

class UserRegisterForm(forms.ModelForm):
    password = forms.CharField(widget = forms.PasswordInput(attrs = {'placeholder' : 'Password'}))
    password_confirm = forms.CharField(widget = forms.PasswordInput(attrs = {'placeholder' : 'Confirm Password'}))
    username = forms.CharField(widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Username'}))
    email = forms.EmailField(widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Email'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserRegisterProfileForm(forms.ModelForm):
    private = forms.BooleanField()

    class Meta:
        model = UserProfile
        fields = ('private',)

class MyAuthenticationForm(AuthenticationForm):
	def clean(self):
		username = self.cleaned_data.get('username')
		password = self.cleaned_data.get('password')
		
		#if '@' in username:
		if username and password:
			if '@' in username:
				ogg = User.objects.filter(email=username)
				if len(ogg) == 1:
					self.user_cache = authenticate(username=ogg[0].username,
												   password=password)
			else:
				self.user_cache = authenticate(username=username,
										   password=password)
			if self.user_cache is None:
				raise forms.ValidationError(
					self.error_messages['invalid_login'],
					code='invalid_login',
					params={'username': self.username_field.verbose_name},
				)
			else:
				self.confirm_login_allowed(self.user_cache)
		return self.cleaned_data
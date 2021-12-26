from django import forms
from django.forms.fields import ImageField
from django.forms.widgets import Textarea
from polls.models import UserProfile, User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password


class PasswordConfirmationMixin(forms.Form):
    password = forms.CharField(label="Password", widget = forms.PasswordInput(attrs = {'placeholder' : 'Password'}))
    password_confirm = forms.CharField(label="Confirm password", widget = forms.PasswordInput(attrs = {'placeholder' : 'Confirm Password'}))

    class Meta:
        abstract = True

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password')
        password2 = cleaned_data.get('password_confirm')
        if password1 != password2:
            self.add_error(None, 'Passwords do not match. Please try again.')
        # validate_password(password1)
        return self.cleaned_data
    
    def update_user_password(self, user):
        user.set_password(self.cleaned_data.get("password"))
        user.save()


class LoginForm(forms.Form):
    username = forms.CharField(label="Login", widget = forms.TextInput(attrs = {'placeholder' : 'Username/Email'}))
    password = forms.CharField(label="Password", widget = forms.PasswordInput(attrs = {'placeholder' : 'Password'}))
    
    class Meta:
        fields = ('username', 'password')
	
    def authenticate(self):
        return authenticate(username=self.cleaned_data.get('username'), password=self.cleaned_data.get('password'))
	
class UserRegisterForm(PasswordConfirmationMixin, forms.ModelForm):
    username = forms.CharField(label="Username", widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Username'}))
    email = forms.EmailField(label="Email", widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Email'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserRegisterProfileForm(forms.ModelForm):
    private = forms.BooleanField()

    class Meta:
        model = UserProfile
        fields = ('private',)

class Password_Reset_Request_Form(forms.Form):
	email = forms.EmailField(label = "Email", required=True, widget = forms.TextInput(attrs = {'placeholder' : 'Enter your Email'}))

	class Meta:
		fields = ('email',)
	
	def clean(self):
		cleaned_data = super().clean()
		email = cleaned_data.get("email")
		if not User.objects.filter(email__iexact=email).exists():
			self.add_error(None, 'No email found in the system.')
		return cleaned_data

	def extract_user(self):
		return User.objects.filter(email__iexact=self.cleaned_data.get("email")).first()

class Password_Reset_Form(PasswordConfirmationMixin):
    class Meta:
        fields = ('password', 'password_confirm')
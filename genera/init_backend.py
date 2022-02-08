import django
django.setup()
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ValidationError

class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()

        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        if username is None or password is None:
            return None
        try:
            user = UserModel.objects.filter(username__iexact=username) | UserModel.objects.filter(email__iexact=username)
            user = user.first()
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        else:
            if user:
                if user.check_password(password):
                    if self.user_can_authenticate(user):
                        return user
                    else:
                        raise ValidationError("Account not activated. Please check your email.")
            raise ValidationError("Invalid credentials provided. Please try again.")
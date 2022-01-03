from django.db import models
from main.models import Model, User
# Create your models here.

# we need db that saves account purchase info?
# this needs to be accessed anywhere

class ProductPurchaseHistory(Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    # this is the purchase history
    datetime_transaction_start = models.DateTimeField(auto_now_add=True)

    class Status_types(models.TextChoices):
        SUCCESS = 'S', 'success',
        CANCEL = 'C', 'cancel',
        ERROR = 'E', 'error',
        PENDING = 'P', 'pending'

    status = models.CharField(default='P', max_length=1, choices=Status_types.choices)

    def __str__(self):
        return self.product.name
        
    # date

class HackCheck(Model):
    hack_id = models.CharField(max_length=100)
    pass
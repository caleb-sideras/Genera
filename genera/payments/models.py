from django.db import models
from main.models import Model, User
# Create your models here.

# we need db that saves account purchase info?
# this needs to be accessed anywhere

class Price(Model):
    price_id = models.CharField(max_length=100)
    price = models.IntegerField()
    currency = models.CharField(max_length=100, default="usd")

    class Meta:
        abstract = True

class Product(Price):
    # All need to be filled
    name = models.CharField(max_length=25)
    description = models.CharField(max_length=100, null=True, blank=True)
    #Includes also 3 fields from Price Model - price_id, price, currency

    def __str__(self):
        return self.name


class ProductPurchaseHistory(Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    # this is the purchase history
    datetime = models.DateTimeField(auto_now_add=True)

    class Status_types(models.TextChoices):
        SUCCESS = 'S', 'success',
        CANCEL = 'C', 'cancel',
        ERROR = 'E', 'error',
        PENDING = 'P', 'pending'

    status = models.CharField(default='P', max_length=1, choices=Status_types.choices)

    def __str__(self):
        return self.product.name
        
    # date

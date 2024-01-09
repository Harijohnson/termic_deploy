from django.db import models
from django.contrib.auth.models import User
import json

# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True)  # if the person who add the product in db the user is deleted buy product is not to be deleted
    name = models.CharField(max_length=200,null=True,blank=True)
    # image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    corousel = models.ImageField(upload_to='corousel/', null=True, blank=True,)
    image1 = models.ImageField(upload_to='products/', null=True, blank=True,default='/placeholder.png')
    image2 = models.ImageField(upload_to='products/', null=True, blank=True,)
    image3 = models.ImageField(upload_to='products/', null=True, blank=True)
    image4 = models.ImageField(upload_to='products/', null=True, blank=True)
    image5 = models.ImageField(upload_to='products/', null=True, blank=True)
    image6 = models.ImageField(upload_to='products/', null=True, blank=True)
    image7 = models.ImageField(upload_to='products/', null=True, blank=True)
    image8 = models.ImageField(upload_to='products/', null=True, blank=True)
    image9 = models.ImageField(upload_to='products/', null=True, blank=True)
    image10 = models.ImageField(upload_to='products/', null=True, blank=True)

    digital=models.BooleanField(default=False, null=True , blank=True)
    # Make the digitalResource field conditionally editable
    digitalResource = models.FileField(upload_to='digital_resources/', null=True, blank=True, editable=False,)
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    rating =  models.IntegerField(null=True,blank=True)
    numReviews = models.BigIntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
   
    def __str__(self):
        return self.name
  

class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL ,null=True) 
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True) 
    name = models.CharField(max_length=200,null=True,blank=True)
    rating = models.BigIntegerField(null=True,blank=True,default=0)
    comment = models.TextField(null=True,blank=True)
    createdAt  = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.rating)
    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True) 
    paymentMethod = models.CharField(max_length=200,null=True,blank=True)
    taxPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    shippingPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    totalPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt  = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self._id)

from django.db import models
from django.contrib.auth.models import User
import json

# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True)  # if the person who add the product in db the user is deleted buy product is not to be deleted
    name = models.CharField(max_length=200,null=True,blank=True)
    # image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    carousel = models.ImageField(upload_to='corousel/', null=True, blank=True,)
    image1 = models.ImageField(upload_to='products/', null=True, blank=True,default='/placeholder.png')
    image2 = models.ImageField(upload_to='products/', null=True, blank=True,)
    image3 = models.ImageField(upload_to='products/', null=True, blank=True)
    image4 = models.ImageField(upload_to='products/', null=True, blank=True)
    image5 = models.ImageField(upload_to='products/', null=True, blank=True)
    image6 = models.ImageField(upload_to='products/', null=True, blank=True)
    image7 = models.ImageField(upload_to='products/', null=True, blank=True)
    image8 = models.ImageField(upload_to='products/', null=True, blank=True)
    image9 = models.ImageField(upload_to='products/', null=True, blank=True)
    image10 = models.ImageField(upload_to='products/', null=True, blank=True)

    digital=models.BooleanField(default=False, null=True , blank=True)
    # Make the digitalResource field conditionally editable
    digitalResource = models.FileField(upload_to='digital_resources/', null=True, blank=True, editable=False)
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    rating =  models.IntegerField(null=True,blank=True)
    numReviews = models.BigIntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
   
    def __str__(self):
        return self.name
  

class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL ,null=True) 
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True) 
    name = models.CharField(max_length=200,null=True,blank=True)
    rating = models.BigIntegerField(null=True,blank=True,default=0)
    comment = models.TextField(null=True,blank=True)
    createdAt  = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.rating)
    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True) 
    paymentMethod = models.CharField(max_length=200,null=True,blank=True)
    taxPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    shippingPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    totalPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt  = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self._id)


class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL ,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL ,null=True, related_name='order_items')
    name = models.CharField(max_length=200,null=True,blank=True)
    qty = models.BigIntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    image1 = models.ImageField(null=True,blank=True)
    digital = models.BooleanField(default=False)
    digitalResource = models.FileField(upload_to='digital_resources/', null=True, blank=True, editable=False)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE,null=True,blank=True)
    address =models.CharField(max_length=200,null=True,blank=True)
    city = models.CharField(max_length=200,null=True,blank=True)
    postalCode = models.CharField(max_length=200,null=True,blank=True)
    country =models.CharField(max_length=200,null=True,blank=True)
    shippingPrice = models.DecimalField(max_digits=20,decimal_places=2,null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.address)







class CompanyDetails(models.Model):
    companyName = models.CharField(max_length=200,primary_key = True )
    aboutCompany = models.TextField(blank=True,null = True )
    user = models.ForeignKey(User,on_delete=models.SET_NULL ,null=True) 
    companyLogo =models.ImageField(upload_to='companylogo/', null=True, blank=True)
    products = models.ForeignKey(Product,on_delete=models.SET_NULL ,null=True) 
    startedAt = models.DateTimeField(auto_now_add=True)
    # orders = models.ForeignKey(Order,on_delete=models.SET_NULL ,null=True)
  


    def __str__(self):
        return str(self.companyName)
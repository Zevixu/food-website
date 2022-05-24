from django.db import models

# Create your models here.

class Restaurant(models.Model):
    Name = models.CharField(max_length=100)
    Cuisine = models.CharField(max_length=100)
    Address = models.CharField(max_length=250)
    Rating =  models.IntegerField()
    ImageUrl = models.CharField(max_length=1000)

    def __str__(self):
        return self.Name


class Dish(models.Model):
    Name = models.CharField(max_length=100)
    Cuisine = models.CharField(max_length=100)
    Restaurant = models.CharField(max_length=100)
    Calories =  models.IntegerField()
    Price =  models.IntegerField()
    Description = models.CharField(max_length=250)
    ImageUrl = models.CharField(max_length=1000)

    def __str__(self):
        return self.Name

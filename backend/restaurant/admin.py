from django.contrib import admin

from restaurant.models import Restaurant
from restaurant.models import Dish

# Register your models here.

class RestaurantAdmin(admin.ModelAdmin):
    model = Restaurant
    list_display = ('Name', 'Cuisine','Address','Rating')

class DishAdmin(admin.ModelAdmin):
    model = Dish
    list_display = ('Name', 'Cuisine', 'Restaurant', 'Calories', 'Price', 'Description')

admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Dish, DishAdmin)
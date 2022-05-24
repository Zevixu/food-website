from django.test import TestCase
from django.test import Client
import logging
from restaurant.models import Restaurant
from restaurant.models import Dish
from user.models import User

# Create your tests here.

logger = logging.getLogger(__name__)

class RestaurantViewsTestCase(TestCase):
    c = Client()

    def setUp(self):
        super().setUp()
        logger.debug('[setUp] - creating restaurant')
        dominos = Restaurant.objects.create(Name="Domino's", Cuisine='Italian', Address='65 University East, Waterloo, ON', Rating=4)
        logger.debug(f"[setUp] created {dominos.Name} restaurant")
        cheesy_bread = Dish.objects.create(
            Name='Cheesy bread', 
            Cuisine='Italian', 
            Restaurant=dominos.Name, 
            Calories=300, 
            Price=6, 
            Description='Bread toasted in the oven with mozarella cheese'
        )
        logger.debug(f'[setUp] created {cheesy_bread.Name} dish')
        the_alley = Restaurant.objects.create(Name="The Alley", Cuisine='Boba', Address='170 University Avenue, Waterloo, ON', Rating=3)
        logger.debug(f"[setUp] created {the_alley.Name} restaurant")
        boba = Dish.objects.create(
            Name = 'Garden Milk Tea',
            Cuisine = 'Asian',
            Restaurant = the_alley.Name,
            Calories = 250,
            Price = 6,
            Description = 'Bubble tea with Milk, Ice and sugar'
        )
        logger.debug(f'[setUp] created {boba.Name} dish')
        User.objects.create_user(email="test@test.com", password="pwtest", first_name="fntest", last_name="lntest" , phone_number=99999999, address="addresstest")
        logger.debug('[setUp] created test user')
        logger.info('[setUp] created restaurants and dishes and user')        
        # logging in
        jsonData = {
            "email":"test@test.com",
            "password":"pwtest"
        }
        response = self.c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'],True)
        self.assertEqual(response.json()['msg'],f'logged in as {jsonData["email"]}')
        logger.info('[setUp] logged in')
        

    def test_get_restaurant(self):
        response = self.c.get('/api/get_restaurants')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'],True)
        logger.info(f'get_restaurant -> {response.content}')
    
    def test_get_dishes(self):
        jsonData = {
            'restaurant_name': 'The Alley'
        }
        response = self.c.post('/api/get_dishes', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'],True)
        logger.info(f'get_dishes -> {response.content}')
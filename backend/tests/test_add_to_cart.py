from django.test import Client
from django.test import TestCase
from user.models import User
import logging

logger = logging.getLogger(__name__)

class HomepageViewsTestCase(TestCase):
    def setUp(self):
        super().setUp()
        User.objects.create_user(email="test@test.com", password="pwtest", first_name="fntest", last_name="lntest" , phone_number=99999999, address="addresstest")
        self.c = Client()
        jsonData = {
            "email":"test@test.com",
            "password":"pwtest"
        }
        response = self.c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['success'],True)
        self.assertEqual(response.json()['msg'],f'logged in as {jsonData["email"]}')
        logger.info('[setUp] logged in')

    def test_add_to_cart(self):
        jsonData = [{
            'name': 'pasta',
            'description': 'Italian recipe',
            'price': '35',
            'quantity': '1',
        }]
        response = self.c.post('/api/add_to_cart', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'cart test response - {response.content}')
        self.assertEqual(response.json()['msg'],'Success, added 1 items to cart')
        logger.info('cart test passed')

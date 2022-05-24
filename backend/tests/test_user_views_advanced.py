from django.test import Client
from django.test import TestCase
from user.models import User
import logging

logger = logging.getLogger(__name__)

class UserViewsAdvancedTestCase(TestCase):
    def setUp(self):
        super().setUp()
        # create user
        logger.debug('[test] - creating user')
        User.objects.create_user(email="test@test.com", password="pwtest", first_name="fntest", last_name="lntest" , phone_number=99999999, address="addresstest")
        logger.info('[setUp] created test user')
    
    def test_login_wrong_password(self):
        # send request
        c = Client()
        jsonData = {
            "email":"test@test.com",
            "password":"pwtskdjfnkjest"
        }
        response = c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'login test response - {response.content}')
        self.assertEqual(response.json()['success'],False)
        self.assertEqual(response.json()['msg'],'invalid password for User')
        logger.info('login_wrong_password test passed')
    
    def test_logout_after_logged_in(self):
        # login user
        c = Client()
        jsonData = {
            "email":"test@test.com",
            "password":"pwtest"
        }
        response = c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'login test response - {response.content}')
        self.assertEqual(response.json()['success'],True)
        self.assertEqual(response.json()['msg'],f'logged in as {jsonData["email"]}')
        # logout
        response = c.get('/api/logout')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['msg'],'Success! user logged out')
        self.assertEqual(response.json()['success'], True)
        logger.info('logout_after_logged_in test passed')
        
    def test_get_user_info(self):
        # send request
        c = Client()
        jsonData = {
            "email":"test@test.com",
            "password":"pwtest"
        }
        resp = c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        logger.debug(f'login test response - {resp.content}')
        self.assertEqual(resp.json()['msg'],'logged in as test@test.com')
        response = c.get('/api/get_user_info')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['msg'], 'Success')
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(response.json()['email'], 'test@test.com')
        self.assertEqual(response.json()['first_name'], 'fntest')
        self.assertEqual(response.json()['last_name'], 'lntest')
        self.assertEqual(response.json()['address'], 'addresstest')
        self.assertEqual(response.json()['phone_number'], 99999999)
        logger.info('get_user_info test passed')
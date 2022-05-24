from django.test import Client
from django.test import TestCase
from user.models import User
import logging

logger = logging.getLogger(__name__)

class UserViewsTestCase(TestCase):
    def setUp(self):
        super().setUp()
        
    def test_signup(self):
        c = Client()
        jsonData = {
            'email': 'aarush.a.rora@uwaterloo.ca',
            'firstName': 'kjsdnfkj',
            'lastName': 'sdkdjfnkj',
            'password': 'yiXt36CNKdhUZXF',
            'phone': "99999999",
            'address': 'ksjdnfjk'
        }
        response = c.post('/api/signup', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'signup test response - {response.content}')
        self.assertEqual(response.json()['msg'],'Success! Created user with email aarush.a.rora@uwaterloo.ca')
        logger.info('Signup test passed')
    
    def test_login(self):
        # create user for login
        logger.debug('[test] - creating user')
        User.objects.create_user(email="test@test.com", password="pwtest", first_name="fntest", last_name="lntest" , phone_number=99999999, address="addresstest")
        # send request
        c = Client()
        jsonData = {
            "email":"test@test.com",
            "password":"pwtest"
        }
        response = c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'login test response - {response.content}')
        self.assertEqual(response.json()['msg'],'logged in as test@test.com')
        logger.info('Login test passed')
    
    def test_signup_get(self):
        c = Client()
        response = c.get('/api/signup')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'signup_get test response - {response.content}')
        self.assertEqual(response.json()['msg'],'Unknown request on POST endpoint :(')
        logger.info('Signup_get test passed')
    
    def test_login_get(self):
        c = Client()
        response = c.get('/api/login')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'login_get test response - {response.content}')
        self.assertEqual(response.json()['msg'],'Unknown request on POST endpoint :(')
        logger.info('login_get test passed')
    
    def test_login_user_does_not_exist(self):
        c = Client()
        jsonData = {
            "email":"te.st@test.com",
            "password":"pwtest"
        }
        response = c.post('/api/login', jsonData, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        logger.debug(f'login test response - {response.content}')
        self.assertEqual(response.json()['success'],False)
        self.assertEqual(response.json()['msg'],'User does not exist')
        logger.info('login_user_does_not_exist test passed')

    def test_logout(self):
        c = Client()
        response = c.get('/api/logout')
        self.assertEqual(response.status_code, 200)
        # logger.info(f'logout test response {response.content}')
        self.assertEqual(response.json()['msg'],'Failure, user not logged in')
        self.assertEqual(response.json()['success'],False)
        logger.info('logout test passed')
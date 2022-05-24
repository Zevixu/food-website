from django.test import TestCase
from user.models import User
import logging

logger = logging.getLogger(__name__)

class UserModelTestCase(TestCase):
    def setUp(self):
        super().setUp()        

    def test_User_model(self):
        """Test creation of user model"""
        logger.debug('creating user')
        User.objects.create_user(email="test@test.com", password="pwtest", first_name="fntest", last_name="lntest" , phone_number=99999999, address="addresstest")
        test_user = User.objects.get(email="test@test.com")
        self.assertEqual(test_user.email, 'test@test.com')
        self.assertEqual(test_user.first_name, 'fntest')
        self.assertEqual(test_user.last_name, 'lntest')
        self.assertEqual(test_user.phone_number, 99999999)
        self.assertEqual(test_user.address, 'addresstest')
        self.assertEqual(test_user.is_staff, False)
        self.assertEqual(test_user.is_superuser, False)
        logger.info('User model test passed')
    
    def test_SuperUser_model(self):
        '''Test creation of superuser'''
        logger.debug('creating superuser')
        User.objects.create_superuser(email="te.st@test.com", password="test3")
        test_user = User.objects.get(email="te.st@test.com")
        self.assertEqual(test_user.email, 'te.st@test.com')
        self.assertEqual(test_user.phone_number, 9999999999)
        self.assertEqual(test_user.address, 'Waterloo')
        self.assertEqual(test_user.is_staff, True)
        self.assertEqual(test_user.is_superuser, True)
        logger.info('SuperUser model test passed')
        
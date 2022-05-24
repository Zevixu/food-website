from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin, BaseUserManager
import logging


# Create your models here.

logger = logging.getLogger(__name__)

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **kwargs):
        now = timezone.now()
        email = self.normalize_email(email)
        is_staff = kwargs.pop('is_staff', False)
        is_superuser = kwargs.pop('is_superuser', False)
        user = self.model(
            email=email,
            is_active=True,
            is_staff=is_staff,
            is_superuser=is_superuser,
            date_joined=now,
            **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, email, password, **kwargs):
        logger.debug(f'creating user {email}')
        logger.debug(f' args - {kwargs} ')
        return self._create_user(email, password, is_staff=False, is_superuser=False, **kwargs)

    def create_superuser(self, email, password, **extra_fields):
        logger.debug(f'creating superuser {email}')
        logger.debug(f' args - {extra_fields} ')
        extra_fields.setdefault('phone_number', 9999999999)
        extra_fields.setdefault('address', 'Waterloo')
        return self._create_user(email, password, is_staff=True, is_superuser=True, **extra_fields)

class User(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField(max_length=254, unique=True, verbose_name='email')
    address = models.CharField(max_length=250)
    phone_number = models.PositiveBigIntegerField()

    is_staff = models.BooleanField(verbose_name='staff status',default=False,
        help_text=(
            'Designates whether the user can '
            'log into this admin site.')
    )
    is_active = models.BooleanField(
        'active',
        default=True,
        help_text=(
            'Designates whether this user should '
            'be treated as active. Unselect this '
            'instead of deleting accounts.')
    )

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'password']

    objects = UserManager()

    def __str__(self):
        return self.email
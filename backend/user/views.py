import json
from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
import logging
from user.models import User

from backend.utils import build_response
from backend.utils import get_on_post_endpoint_response

# Create your views here.

logger = logging.getLogger(__name__)

def signup_user(request):
    if request.method == 'POST':
        logger.debug(f'request.body - {request.body}')
        try:
            body = json.loads(request.body)
            email = body['email']
            first_name = body['firstName']
            last_name = body['lastName']
            password = body['password']
            phone_number = body['phone']
            address = body['address']
            user = User.objects.create_user(email=email, password=password, first_name=first_name, last_name=last_name, phone_number=phone_number, address=address)
            user.save()
            return build_response(f'Success! Created user with email {email}')
        except Exception as ex:
            logger.debug(ex)
            return build_response('there was an exception', False)
    else:
        return get_on_post_endpoint_response()
    
def login_user(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        email = body['email']
        password = body['password']
        try:
            user = User.objects.get(email=email)
        except Exception as ex:
            return build_response('User does not exist', False)
        user = authenticate(request, username=email, password=password)
        if user is None:
            logger.debug(f'invalid password for {email}')
            return build_response(f'invalid password for User', False)
        else:
            login(request, user)
            return build_response(f'logged in as {email}')
    else:
        return get_on_post_endpoint_response()

def logout_user(request):
    if request.user.is_authenticated:
        logger.debug(f'logging out user {request.user.email}')
        logout(request)
        return build_response('Success! user logged out')
    else:
        logger.debug(f'user not logged in')
        return build_response('Failure, user not logged in', False)

def get_user_info(request):
    logger.debug(f'User type - {request.user}')
    if request.user.is_authenticated:
        jsonObj = {
            'msg': 'Success',
            'success': True,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'address': request.user.address,
            'phone_number': request.user.phone_number
        }
        return build_response(jsonObj)
    else:
        return build_response('User not authenticated', success=False)

def add_to_cart(request):
    logger.debug(f'got request for adding item to cart')
    try:
        if request.method != "POST":
            return get_on_post_endpoint_response()
        if request.user.is_authenticated:
            logger.debug(f'user is authenticated')
            list_of_items = json.loads(request.body)
            for body in list_of_items:
                jsonObj = {
                            'name': body['name'],
                            'description': body['description'],
                            'price': body['price'],
                            'quantity': body['quantity']
                        }
                if not 'cart' in request.session:
                    request.session['cart'] = [
                        jsonObj
                    ]
                else:
                    # cart already exists
                    request.session['cart'].append(jsonObj)
            logger.debug(f'current value of cart for {request.user.email} {json.dumps(request.session["cart"])}')
            return build_response(f'Success, added {len(list_of_items)} items to cart')
        else:
            logger.debug(f'user not authenticated')
            return build_response('user not logged in', False)
    except Exception as ex:
        logger.debug(f'{ex} {ex.with_traceback()} {ex.__traceback__}')
        return build_response('Failure, some error occured', False)
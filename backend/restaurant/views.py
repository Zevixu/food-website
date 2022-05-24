import logging
from backend.utils import build_response, get_on_post_endpoint_response, post_on_get_endpoint_response
from restaurant.models import Restaurant, Dish
from django.core.serializers import serialize
import json

# Create your views here.

logger = logging.getLogger(__name__)
        

def get_restaurant(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return build_response('User must be logged in to access this page', False)
        else:
            # logger.debug(f"sending {Restaurant.objects.all()}")
            jsonObj = json.loads(serialize('json',Restaurant.objects.all()))
            response = {
                'msg': f'found {len(jsonObj)} restaurants',
                'success': True,
                'count' : len(jsonObj),
                'results': []
            }
            for i in jsonObj:
                logger.debug(i)
                response['results'].append(i['fields'])
            logger.debug(f'sending {response}')
            return build_response(response)
    else:
        return post_on_get_endpoint_response()

def get_dishes(request):
    if not request.method == 'POST':
        return get_on_post_endpoint_response()
    else:
        if not request.user.is_authenticated:
            return build_response('User must be logged in to access this page', False)
        else:
            body = json.loads(request.body)
            restaurant_name = str(body['restaurant_name'])
            jsonObj = json.loads(serialize('json',Dish.objects.filter(Restaurant=restaurant_name)))
            response = {
                'msg': f'found {len(jsonObj)} dishes for {restaurant_name}',
                'success': True,
                'count' : len(jsonObj),
                'results': []
            }
            for i in jsonObj:
                logger.debug(i)
                response['results'].append(i['fields'])
            logger.debug(f'sending {response}')
            return build_response(response)
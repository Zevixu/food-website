from urllib import response
from django.http import JsonResponse

def build_response(msg, success=True):
    if type(msg) == str:
        response = {
            'msg': msg,
            'success': success
        }
        return JsonResponse(response)
    elif type(msg) == dict:
        return JsonResponse(msg)

def get_on_post_endpoint_response():
    return build_response('Unknown request on POST endpoint :(', False)

def post_on_get_endpoint_response():
    return build_response('Unknown request on GET endpoint :(', False)
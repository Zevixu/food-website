from django.shortcuts import render
import logging

from backend.utils import build_response

# Create your views here.

logger = logging.getLogger(__name__)

def render_home_page(request):
    logger.info('rendering home page')
    return build_response('Simple FOOD app :)')
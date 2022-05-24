"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
import homepage.views
import user.views
import restaurant.views

urlpatterns = [
    path('api/', homepage.views.render_home_page, name='homepage'),
    path('api/signup', user.views.signup_user, name='signup'),
    path('api/login', user.views.login_user, name='login'),
    path('api/logout', user.views.logout_user, name='logout'),
    path('api/get_user_info', user.views.get_user_info, name='get_user_info'),
    path('api/add_to_cart', user.views.add_to_cart, name='add_to_cart'),
    path('api/get_restaurants', restaurant.views.get_restaurant , name='get_restaurants'),
    path('api/get_dishes', restaurant.views.get_dishes , name='get_dishes'),
    path('supersecreturlforadminpagedontleak/', admin.site.urls),
    path('__debug__/', include('debug_toolbar.urls')),
]

"""
URL configuration for daszstrima project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include
from dclogin import views as dclogin_views
from dclogin.views import logout_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path("oauth2/login/", dclogin_views.discord_login, name="oauth2_login"),
    path(
        "oauth2/login/redirect/",
        dclogin_views.discord_login_redirect,
        name="discord_login_redirect",
    ),
    path("auth/user/", dclogin_views.get_authenticated_user, name="get_authenticated_user"),
    path("logout/", logout_view, name="logout"),
    
    path("api/", include("films.urls")),
    path("api/", include("ratings.urls"))
]

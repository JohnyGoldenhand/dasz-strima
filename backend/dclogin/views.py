from urllib import response
from wsgiref import headers
from django.http import HttpRequest, HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
import requests
from dotenv import load_dotenv
import os

load_dotenv()

from dclogin.models import DiscordUser

# Create your views here.

auth_url_discord = "https://discord.com/oauth2/authorize?client_id=1243122055063408682&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Flogin%2Fredirect&scope=identify"


def get_authenticated_user(request: HttpRequest):
    if not request.user.is_authenticated:
        return JsonResponse({
            "authenticated": False,
            "username": None,
            "discord_username": None,
            "discord_id": None,
            "avatar": None
        })

    try:
        discord_user = DiscordUser.objects.get(user_id=request.user)
        return JsonResponse({
            "authenticated": True,
            "username": request.user.username,
            "discord_username": discord_user.discord_username,
            "discord_id": discord_user.discord_id,
            "avatar": discord_user.avatar
        })
    except DiscordUser.DoesNotExist:
        return JsonResponse({
            "authenticated": True,
            "username": request.user.username,
            "discord_username": request.user.username,
            "discord_id": "",
            "avatar": ""
        })


def discord_login(request: HttpRequest):
    return redirect(auth_url_discord)


def discord_login_redirect(request: HttpRequest):
    code = request.GET.get("code")
    user_info = exchange_code(code)
    print(user_info)
    users = User.objects.filter(username=user_info["username"])
    if len(users) == 0:
        normal_user = User.objects.create_user(username=user_info["username"])
        normal_user.save()
        new_user = DiscordUser.objects.create(
            user_id=normal_user,
            discord_username=user_info["global_name"],
            discord_id=user_info["id"],
            avatar=user_info["avatar"],
        )
        new_user.save()
    else:
        normal_user = users.first()
    login(request, normal_user)
    return redirect("/auth/user")


def exchange_code(code: str):
    data = {
        "client_id": "1243122055063408682",
        "client_secret": os.environ.get('CLIENT_SECRET'),
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:8000/oauth2/login/redirect",
        "scope": "identify",
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(
        "https://discord.com/api/oauth2/token", data=data, headers=headers
    )
    credentials = response.json()
    access_token = credentials["access_token"]
    response = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    user = response.json()
    return user


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")

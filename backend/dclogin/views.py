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

# Discord OAuth2 configuration
CLIENT_ID = os.environ.get('DISCORD_CLIENT_ID', '1243122055063408682')
REDIRECT_URI = os.environ.get('DISCORD_REDIRECT_URI', 'http://localhost:8000/oauth2/login/redirect')
ENCODED_REDIRECT_URI = "http%3A%2F%2Flocalhost%3A8000%2Foauth2%2Flogin%2Fredirect"  # URL-encoded version

# Discord OAuth2 authorization URL
auth_url_discord = f"https://discord.com/oauth2/authorize?client_id={CLIENT_ID}&response_type=code&redirect_uri={ENCODED_REDIRECT_URI}&scope=identify"


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
    if not code:
        return HttpResponse("Error: No authorization code provided", status=400)

    try:
        user_info = exchange_code(code)
        print(user_info)

        # Check if the username field exists in the response
        if "username" not in user_info:
            return HttpResponse(f"Error: Invalid user info received from Discord: {user_info}", status=400)

        users = User.objects.filter(username=user_info["username"])
        if len(users) == 0:
            normal_user = User.objects.create_user(username=user_info["username"])
            normal_user.save()

            # Use get method with default values to handle missing fields
            discord_username = user_info.get("global_name", user_info.get("username", ""))
            discord_id = user_info.get("id", "")
            avatar = user_info.get("avatar", "")

            new_user = DiscordUser.objects.create(
                user_id=normal_user,
                discord_username=discord_username,
                discord_id=discord_id,
                avatar=avatar,
            )
            new_user.save()
        else:
            normal_user = users.first()

        login(request, normal_user)
        return redirect("http://localhost:3000/user")

    except Exception as e:
        print(f"Error during Discord login: {str(e)}")
        return HttpResponse(f"Error during Discord login: {str(e)}", status=400)


def exchange_code(code: str):
    data = {
        "client_id": CLIENT_ID,
        "client_secret": os.environ.get('CLIENT_SECRET'),
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "scope": "identify",
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    # Make the token request
    token_response = requests.post(
        "https://discord.com/api/oauth2/token", data=data, headers=headers
    )

    # Check if the request was successful
    if token_response.status_code != 200:
        print(f"Error in token request: {token_response.status_code}")
        print(f"Response content: {token_response.text}")
        raise Exception(f"Failed to get token from Discord: {token_response.text}")

    credentials = token_response.json()

    # Check if access_token is in the response
    if "access_token" not in credentials:
        print(f"Error: access_token not found in response")
        print(f"Response content: {credentials}")
        raise Exception("Access token not found in Discord response")

    access_token = credentials["access_token"]

    # Make the user info request
    user_response = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {access_token}"},
    )

    # Check if the request was successful
    if user_response.status_code != 200:
        print(f"Error in user info request: {user_response.status_code}")
        print(f"Response content: {user_response.text}")
        raise Exception(f"Failed to get user info from Discord: {user_response.text}")

    user = user_response.json()
    return user


def logout_view(request):
    logout(request)
    return HttpResponseRedirect("/")

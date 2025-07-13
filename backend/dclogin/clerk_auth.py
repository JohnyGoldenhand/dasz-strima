from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
import jwt
import requests
from django.conf import settings
import json

class ClerkAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            # Extract the token
            auth_parts = auth_header.split()
            if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
                return None
            token = auth_parts[1]

            # Get Clerk's JWKS (JSON Web Key Set)
            jwks_url = "https://api.clerk.dev/v1/jwks"
            jwks_response = requests.get(jwks_url)
            jwks = jwks_response.json()

            # Decode and verify the token
            # Note: You should cache the JWKS and implement proper JWT verification
            # This is a simplified example
            decoded_token = jwt.decode(
                token,
                options={"verify_signature": False},  # In production, set this to True and use proper key verification
                algorithms=["RS256"]
            )

            # Get user info from token
            user_id = decoded_token.get('sub')
            if not user_id:
                raise exceptions.AuthenticationFailed('Invalid token')

            # Get or create user
            username = f"clerk_{user_id}"
            user, created = User.objects.get_or_create(username=username)
            
            # You might want to update user details from the token
            if created or True:  # Always update for this example
                email = decoded_token.get('email', '')
                if email and not user.email:
                    user.email = email
                    user.save()

            return (user, token)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token expired')
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')
# Deployment
1. Install dependencies:
   ```pip install -r requirements.txt```
2. Create .env file in directory and fill missing variables (see Environment Variables section below)
3. Start server inside 
   ```python manage.py runserver```
    or
   ```python3 manage.py runserver```

## Environment Variables
The following environment variables need to be set in the `.env` file:

### Required
- `SECRET_KEY`: Django secret key
- `DEBUG`: Set to 'True' for development, 'False' for production

### Discord OAuth2 Integration
For the Discord login functionality to work properly, you need to set up the following variables:
- `DISCORD_CLIENT_ID`: Your Discord application client ID
- `CLIENT_SECRET`: Your Discord application client secret
- `DISCORD_REDIRECT_URI`: The redirect URI after Discord authentication (default: 'http://localhost:8000/oauth2/login/redirect')

To obtain these credentials:
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select an existing one
3. Navigate to the "OAuth2" section
4. Copy the Client ID and Client Secret
5. Add the redirect URI to the "Redirects" section

Example `.env` file:
```
SECRET_KEY='your-secret-key'
DEBUG=True

# Discord OAuth2 Configuration
DISCORD_CLIENT_ID='your-discord-client-id'
CLIENT_SECRET='your-discord-client-secret'
DISCORD_REDIRECT_URI='http://localhost:8000/oauth2/login/redirect'
```

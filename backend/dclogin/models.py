from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class DiscordUser(models.Model):
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    discord_username = models.CharField(max_length=255)

    def __str__(self):
        return self.discord_username
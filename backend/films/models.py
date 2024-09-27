from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg


# Create your models here.


class Film(models.Model):
    title = models.CharField(max_length=255, unique=True)
    year = models.IntegerField()
    director = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def average_rating(self):
        return self.film_ratings.aggregate(Avg("rating"))["rating__avg"]

    def has_user_rated(self, user):
        return self.film_ratings.filter(user=user).exists()
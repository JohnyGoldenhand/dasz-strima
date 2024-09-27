from django.contrib import admin
from .models import Film

# Register your models here.


class FilmAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "year",
        "director",
        "rating",
        "average_rating",
        "created_at",
        "updated_at",
    )
    fields = (
        "title",
        "year",
        "director",
        "rating",
        "created_at",
        "updated_at",
        "average_rating",
    )
    readonly_fields = ("created_at", "updated_at", "average_rating")


admin.site.register(Film, FilmAdmin)
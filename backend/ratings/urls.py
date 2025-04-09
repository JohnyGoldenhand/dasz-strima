from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RatingViewSet

# Tworzymy router i rejestrujemy RatingViewSet
router = DefaultRouter()
router.register(r'', RatingViewSet, basename='rating')

# mapping do customowej akcji
custom_actions = {
    'get': 'movie_ratings',  # <-- to musi się zgadzać z nazwą metody w ViewSecie
}

urlpatterns = [
    path('ratings/', include(router.urls)),
    path('ratings/film/<int:film_id>/', RatingViewSet.as_view(custom_actions), name='ratings-by-film'),
]
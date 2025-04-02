from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilmViewSet

# Tworzymy router i rejestrujemy FilmViewSet
router = DefaultRouter()
router.register(r'', FilmViewSet, basename='film')

urlpatterns = [
    path('films/', include(router.urls)),  # Podpinamy endpointy DRF
]

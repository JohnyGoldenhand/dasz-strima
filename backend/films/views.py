from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Film

class FilmReadSerializer(serializers.ModelSerializer):
    # added_by wyswietla nazwe usera a nie ID
    # added_by = serializers.SlugRelatedField(
    #     slug_field='username',
    #     read_only=True
    # )
    class Meta:
        model = Film
        fields = '__all__'

class FilmWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = ['title', 'year', 'director', 'description', 'category']

# Widok API
class FilmViewSet(viewsets.ModelViewSet):
    queryset = Film.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return FilmWriteSerializer
        return FilmReadSerializer

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def list(self, request):
        queryset = Film.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        film = get_object_or_404(Film, pk=pk)
        serializer = self.get_serializer(film)
        return Response(serializer.data)

    def update(self, request, pk=None):
        film = get_object_or_404(Film, pk=pk)
        serializer = self.get_serializer(film, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        film = get_object_or_404(Film, pk=pk)
        film.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['put','get'])
    def wanna_watch(self, request, pk=None):
        film = get_object_or_404(Film, pk=pk)
        user = request.user

        if user in film.want_to_watch.all():
            film.want_to_watch.remove(user)
        else:
            film.want_to_watch.add(user)

        return Response({
            'status': 'success',
            'users_want_to_watch': [u.id for u in film.want_to_watch.all()],
            'watchlist': [f.id for f in user.films_to_watch.all()]
        })

    @action(detail=True, methods=['put','get'])
    def already_watched(self, request, pk=None):
        film = get_object_or_404(Film, pk=pk)
        user = request.user

        if user in film.watched.all():
            film.watched.remove(user)
        else:
            film.watched.add(user)

        return Response({
            'status': 'success',
            'users_that_watched': [u.id for u in film.watched.all()],
            'watched': [f.id for f in user.films_watched.all()]
        })
    
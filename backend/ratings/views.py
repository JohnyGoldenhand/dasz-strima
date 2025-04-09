from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .models import Rating

class RatingReadSerializer(serializers.ModelSerializer):
    # user wyswietla nazwe usera a nie ID
    # user = serializers.SlugRelatedField(
    #     slug_field='username',
    #     read_only=True
    # )
    class Meta:
        model = Rating
        fields = '__all__'

class RatingWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['film', 'rating']

# Widok API
class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post']

    def get_serializer_class(self):
        if self.action in ['create']:
            return RatingWriteSerializer
        return RatingReadSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        film = serializer.validated_data['film']
        rating_value = serializer.validated_data['rating']

        existing_rating = Rating.objects.filter(film=film, user=user).first()

        if existing_rating:
            if existing_rating.rating == rating_value:
                existing_rating.delete()
                return Response({"detail": "Rating removed."}, status=status.HTTP_204_NO_CONTENT)
            else:
                existing_rating.rating = rating_value
                existing_rating.save()
                read_serializer = RatingReadSerializer(existing_rating)
                return Response(read_serializer.data, status=status.HTTP_200_OK)
        else:
            new_rating = serializer.save(user=user)
            read_serializer = RatingReadSerializer(new_rating)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='film/(?P<film_id>[^/.]+)')
    def movie_ratings(self, request, film_id=None):
        ratings = Rating.objects.filter(film_id=film_id)
        serializer = self.get_serializer(ratings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

import graphene
from graphene_django import DjangoObjectType

from .models import Film
from dclogin.schema import UserType
from django.contrib.auth.models import User


class FilmType(DjangoObjectType):
    class Meta:
        model = Film
        fields = "__all__"


class CreateFilm(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        director = graphene.String(required=True)
        year = graphene.Int(required=True)

    film = graphene.Field(FilmType)

    def mutate(self, info, title, year, director, description):
        film = Film(title=title, year=year, director=director, description=description)
        film.save()
        return CreateFilm(film=film)


class DeleteFilm(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            film = Film.objects.get(pk=id)
        except Film.DoesNotExist:
            raise Exception("Film not found")

        film.delete()
        return DeleteFilm(success=True)

class WannaWatchFilm(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    status = graphene.String()
    users_want_to_watch = graphene.List(UserType)
    watchlist = graphene.List(FilmType)

    def mutate(self, info, id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")

        try:
            film = Film.objects.get(pk=id)
        except Film.DoesNotExist:
            raise Exception("Film not found")

        if user in film.want_to_watch.all():
            film.want_to_watch.remove(user)
        else:
            film.want_to_watch.add(user)

        users_want_to_watch = film.want_to_watch.all()
        watchlist_films = user.films_to_watch.all()

        return WannaWatchFilm(
            status="success",
            users_want_to_watch=users_want_to_watch,
            watchlist=watchlist_films
        )


class Query(graphene.ObjectType):
    films = graphene.List(FilmType)
    watched_films = graphene.List(FilmType)
    added_films = graphene.List(FilmType)
    watchlist = graphene.List(FilmType)

    def resolve_films(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        return Film.objects.all().order_by("-created_at")
    
    def resolve_watched_films(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        return user.films_watched.all().order_by("-updated_at")

    def resolve_added_films(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        return user.films_added.all().order_by("-created_at")

    def resolve_watchlist(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        return user.films_to_watch.all().order_by("-created_at")
    

class Mutation(graphene.ObjectType):
    create_post = CreateFilm.Field()
    delete_post = DeleteFilm.Field()
    wanna_watch_film = WannaWatchFilm.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
import graphene
from graphene_django import DjangoObjectType
from .models import User
from films.models import Film

class FilmType(DjangoObjectType):
    class Meta:
        model = Film

class UserType(DjangoObjectType):
    class Meta:
        model = User
        only_fields = ("id", "username", "email", "films_watched", "films_added", "films_to_watch")

    films_watched = graphene.List(FilmType)
    films_added = graphene.List(FilmType)
    films_to_watch = graphene.List(FilmType)
    discord_id = graphene.String()
    avatar = graphene.String()

    def resolve_films_watched(self, info):
        return self.films_watched.all()

    def resolve_films_added(self, info):
        return self.films_added.all()

    def resolve_films_to_watch(self, info):
        return self.films_to_watch.all()

    def resolve_discord_id(self, info):
        return self.discorduser.discord_id if hasattr(self, 'discorduser') else None

    def resolve_avatar(self, info):
        return self.discorduser.avatar if hasattr(self, 'discorduser') else None

class Query(graphene.ObjectType):
    users = graphene.List(UserType)

    def resolve_users(self, info):
        """
        The resolve_users function is a resolver. It’s responsible for retrieving all users from the database and returning them to GraphQL.

        :param self: Refer to the current instance of a class
        :param info: Pass along the context of the query
        :return: All user objects from the database
        """
        return User.objects.all()

schema = graphene.Schema(query=Query)
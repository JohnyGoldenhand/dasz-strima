
import graphene
from graphene_django import DjangoObjectType

from .models import Film


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
        """
        The mutate function is the function that will be called when a client
        makes a request to this mutation. It takes in four arguments:
        self, info, title and content. The first two are required by all mutations;
        the last two are the arguments we defined in our CreatePostInput class.

        :param self: Access the object's attributes and methods
        :param info: Access the context of the request
        :param title: Create a new film with the title provided
        :param content: Pass the content of the film
        :param author_id: Get the author object from the database
        :return: A createpost object
        """
        film = Film(title=title, year=year, director=director, description=description)
        film.save()
        return CreateFilm(film=film)


class DeleteFilm(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        """
        The mutate function is the function that will be called when a client
        calls this mutation. It takes in four arguments: self, info, id. The first
        argument is the object itself (the class instance). The second argument is
        information about the query context and user making this request. We don't
        need to use it here so we'll just pass it along as-is to our model method.
        The third argument is an ID of a film we want to delete.

        :param self: Represent the instance of the class
        :param info: Access the context of the query
        :param id: Find the film that is to be deleted
        :return: A deletepost object, which is the return type of the mutation
        """
        try:
            film = Film.objects.get(pk=id)
        except Film.DoesNotExist:
            raise Exception("Film not found")

        film.delete()
        return DeleteFilm(success=True)


class Query(graphene.ObjectType):
    films = graphene.List(FilmType)

    def resolve_posts(self, info):
        """
        The resolve_posts function is a resolver. It’s responsible for retrieving the posts from the database and returning them to GraphQL.

        :param self: Refer to the current instance of a class
        :param info: Pass along the context of the query
        :return: All film objects from the database
        """
        return Film.objects.all()


class Mutation(graphene.ObjectType):
    create_post = CreateFilm.Field()
    delete_post = DeleteFilm.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
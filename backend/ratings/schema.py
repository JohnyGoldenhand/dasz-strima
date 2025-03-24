
import graphene
from graphene_django import DjangoObjectType

from .models import Rating


class RatingType(DjangoObjectType):
    class Meta:
        model = Rating
        fields = "__all__"


class CreateRating(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        director = graphene.String(required=True)
        year = graphene.Int(required=True)

    rating = graphene.Field(RatingType)

    def mutate(self, info, title, year, director, description):
        """
        The mutate function is the function that will be called when a client
        makes a request to this mutation. It takes in four arguments:
        self, info, title and content. The first two are required by all mutations;
        the last two are the arguments we defined in our CreatePostInput class.

        :param self: Access the object's attributes and methods
        :param info: Access the context of the request
        :param title: Create a new rating with the title provided
        :param content: Pass the content of the rating
        :param author_id: Get the author object from the database
        :return: A createpost object
        """
        rating = Rating(title=title, year=year, director=director, description=description)
        rating.save()
        return CreateRating(rating=rating)

class UpdateRating(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        grade = graphene.Int()

    rating = graphene.Field(RatingType)

    def mutate(self, info, id, grade=None):
        try:
            rating = Rating.objects.get(pk=id)
        except Rating.DoesNotExist:
            raise Exception("Rating not found")

        if grade:
            rating.rating = grade
        rating.save()
        return UpdateRating(rating=rating)

class DeleteRating(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, id):
        try:
            rating = Rating.objects.get(pk=id)
        except Rating.DoesNotExist:
            raise Exception("Rating not found")

        rating.delete()
        return DeleteRating(success=True)


class Query(graphene.ObjectType):
    films = graphene.List(RatingType)

    def resolve_posts(self, info):
        return Rating.objects.all()


class Mutation(graphene.ObjectType):
    create_rating = CreateRating.Field()
    update_rating = UpdateRating.Field()
    delete_rating = DeleteRating.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)
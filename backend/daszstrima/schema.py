# core/schema.py

import graphene

import films.schema


class Query(films.schema.Query, graphene.ObjectType):
    # Combine the queries from different apps
    pass


class Mutation(films.schema.Mutation, graphene.ObjectType):
    # Combine the mutations from different apps
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
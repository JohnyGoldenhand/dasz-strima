/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
};

export type CreateFilm = {
  __typename?: 'CreateFilm';
  film?: Maybe<FilmType>;
};

export type CreateRating = {
  __typename?: 'CreateRating';
  rating?: Maybe<RatingType>;
};

export type DeleteFilm = {
  __typename?: 'DeleteFilm';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteRating = {
  __typename?: 'DeleteRating';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type FilmType = {
  __typename?: 'FilmType';
  category: FilmsFilmCategoryChoices;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  director: Scalars['String']['output'];
  filmRatings: Array<RatingType>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  year: Scalars['Int']['output'];
};

/** An enumeration. */
export enum FilmsFilmCategoryChoices {
  /** Drama */
  Dramat = 'DRAMAT',
  /** Horror */
  Horror = 'HORROR',
  /** Comedy */
  Komedia = 'KOMEDIA',
  /** Thriller */
  Thriller = 'THRILLER'
}

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreateFilm>;
  createRating?: Maybe<CreateRating>;
  deletePost?: Maybe<DeleteFilm>;
  deleteRating?: Maybe<DeleteRating>;
  updateRating?: Maybe<UpdateRating>;
};


export type MutationCreatePostArgs = {
  description: Scalars['String']['input'];
  director: Scalars['String']['input'];
  title: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


export type MutationCreateRatingArgs = {
  description: Scalars['String']['input'];
  director: Scalars['String']['input'];
  title: Scalars['String']['input'];
  year: Scalars['Int']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRatingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRatingArgs = {
  grade?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  films?: Maybe<Array<Maybe<FilmType>>>;
};

export type RatingType = {
  __typename?: 'RatingType';
  createdAt: Scalars['DateTime']['output'];
  film: FilmType;
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateRating = {
  __typename?: 'UpdateRating';
  rating?: Maybe<RatingType>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', films?: Array<{ __typename?: 'FilmType', id: string, title: string, year: number, director: string } | null> | null };


export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"director"}}]}}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
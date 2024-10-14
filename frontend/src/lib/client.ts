import {HttpLink, InMemoryCache, ApolloClient} from "@apollo/client";
import {registerApolloClient} from "@apollo/experimental-nextjs-app-support/rsc";

export const {getClient} = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        films: {
                            merge: false,
                        },
                    },
                },
            },
        }),
        link: new HttpLink({
            uri: `http://127.0.0.1:8000/graphql/`,
        }),
    });
});
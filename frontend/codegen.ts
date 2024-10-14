import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: `http://127.0.0.1:8000/graphql/`,
    // Only generates if documents are present (helpful if no .graphql files)
    ignoreNoDocuments: true,
    documents: 'src/**/*.{ts,tsx}',  // Searches for queries written in TSX/TS files
    generates: {
        "src/gql/": {
            preset: "client",  // Generates ready-to-use Apollo Client hooks
            plugins: [],  // No additional plugins needed with `client` preset
        },
    },
};

export default config;

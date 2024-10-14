import {getClient} from "@/lib/client";
import {gql} from "@apollo/client";

const query = gql`query Hello {
    films {
        id
        title
        year
        director
    }
}`;


export default async function Home() {


    const {data} = await getClient().query({
        query,
        context: {
            fetchOptions: {
                next: {revalidate: 5},
            },
        },
    });

    console.log(data);

    return (
        <div className="bg-slate-700 min-h-[100vh]">
        </div>
    );
}

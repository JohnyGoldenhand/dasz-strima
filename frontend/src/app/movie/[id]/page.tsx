import {getMovie} from "@/lib/queries";
import {notFound} from "next/navigation";
import {Container} from "@/components/Container";
import Image from "next/image";

export default async function MoviePage({params}: { params: { id: string } }) {
    const movieId = parseInt(params.id, 10)
    const movie = await getMovie(movieId)

    if (!movie) {
        return notFound()
    }

    return (
        <main>
            <Container>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold mb-6">{movie.title}</h1>
                    <div className="flex flex-col gap-4">
                        <div className={"w-2xs h-[450px] bg-gray-200 relative"}>
                            <Image src={`${process.env.MOVIEDB_IMAGE_URL}/${movie.poster_path}`} alt={movie.title}
                                   fill/>
                        </div>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                </div>
            </Container>
        </main>
    )
}

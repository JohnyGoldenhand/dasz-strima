import {Container} from "@/components/Container";
import {getMoviesFromDB, getPopularMovies} from "@/lib/queries";
import {MovieCarousel} from "@/components/MovieCarousel";
import {DBMovie} from "@/lib/types";

export default async function Home() {
    const popularMovies = await getPopularMovies();
    const testMovies: DBMovie[] = await getMoviesFromDB()

    return (
        <main>
            <Container>
                <div className="mt-8">
                    <MovieCarousel movies={popularMovies} label={"Popular Movies"}/>
                </div>
            </Container>
        </main>
    );
}

import {Container} from "@/components/Container";
import {getPopularMovies} from "@/lib/queries";
import {MovieCarousel} from "@/components/MovieCarousel";

export default async function Home() {
    const popularMovies = await getPopularMovies();

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

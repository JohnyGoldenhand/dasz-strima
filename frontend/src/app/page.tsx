import {Container} from "@/components/Container";
import {getPopularMovies} from "@/lib/queries";
import {MovieCarousel} from "@/components/MovieCarousel";
import {Hero} from "@/components/Hero";

export default async function Home() {
    const popularMovies = await getPopularMovies();

    return (
        <main>
            {/* Hero section with the first popular movie */}
            <Hero/>
            <Container className={"py-8"}>
                <div className="mt-8">
                    <MovieCarousel movies={popularMovies} label={"Popular Movies"}/>
                </div>
            </Container>
        </main>
    );
}

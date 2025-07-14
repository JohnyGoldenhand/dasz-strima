import {Container} from "@/components/Container";
import {getPopularMovies} from "@/lib/queries";
import {MovieCarousel} from "@/components/MovieCarousel";
import {Hero} from "@/components/Hero";

export default async function Home() {
    const popularMovies = await getPopularMovies();

    return (
        <main>
            <Container className={"py-8"}>

            </Container>
        </main>
    );
}

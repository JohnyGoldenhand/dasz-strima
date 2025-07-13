import {getPopularMovies} from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import {Container} from "@/components/Container";

export const Hero = async () => {
    const popularMovies = await getPopularMovies();

    // Check if there are any popular movies
    if (!popularMovies || popularMovies.length === 0) return null;

    // Get the first movie from the list
    const firstMovie = popularMovies[0];

    return (
        <div className={"h-[calc(100vh-64px)] w-full relative"}>
            {/* Movie image as background */}
            <div className="absolute inset-0">
                <Image
                    src={`${process.env.MOVIEDB_IMAGE_URL}/${firstMovie.poster_path}`}
                    alt={`${firstMovie.title} poster`}
                    fill
                    style={{objectFit: "cover"}}
                    priority
                />
                {/* Overlay to make text more readable */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            <Container>
                {/* Movie information */}
                <div className="relative z-1 h-full flex flex-col justify-end">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{firstMovie.title}</h1>
                </div>
            </Container>
        </div>
    );
}

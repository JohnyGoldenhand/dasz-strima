import type {Movie} from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import {CarouselCardOverlayWrapper} from "@/components/MovieCarousel/CarouselCardOverlayWrapper";

export const CarouselCard = ({movie}: { movie: Movie }) => (
    <Link href={`/movie/${movie.id}`}>
        <div className="relative w-full h-[450px] bg-gray-200 group cursor-pointer">
            <Image
                src={`${process.env.MOVIEDB_IMAGE_URL}/${movie.poster_path}`}
                alt={`${movie.title} poster`}
                fill
            />
            <CarouselCardOverlayWrapper>
                <h2 className="text-white text-lg font-bold">{movie.title}</h2>
                <p className="text-white">{movie.release_date}</p>
                <p className="text-white">{movie.overview}</p>
            </CarouselCardOverlayWrapper>
        </div>
    </Link>
)
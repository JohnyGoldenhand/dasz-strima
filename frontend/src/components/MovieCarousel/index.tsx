import type {Movie} from "@/lib/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {CarouselCard} from "@/components/MovieCarousel/CarouselCard";

interface Props {
    label?: string;
    movies: Movie[];
}

export const MovieCarousel = ({label, movies}: Props) => (
    <div className="flex flex-col gap-4">
        {label && <h2 className="text-lg font-bold">{label}</h2>}
        <Carousel opts={{
            slidesToScroll: 2,
        }}>
            <CarouselContent className={"-ml-5"}>
                {movies.map((movie) => (
                    <CarouselItem
                        className={"pl-5 basis-1/4"}
                        key={movie.id}>
                        <CarouselCard movie={movie}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className={"cursor-pointer"}/>
            <CarouselPrevious className={"cursor-pointer"}/>
        </Carousel>
    </div>
)
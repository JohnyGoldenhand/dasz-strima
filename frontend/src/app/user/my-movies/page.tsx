"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/Container";
import { useAuth } from "@clerk/nextjs";
import { getUserRatings, getMovie } from "@/lib/queries";
import { Rating, Movie } from "@/lib/types";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatedMovie {
  movie: Movie | null;
  rating: number;
}

export default function MyMoviesPage() {
  const { getToken } = useAuth();
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const token = await getToken();
        
        if (!token) {
          setError("Authentication error. Please sign in.");
          setIsLoading(false);
          return;
        }
        
        // Fetch user ratings
        const ratings = await getUserRatings(token);
        
        // Fetch movie details for each rating
        const moviesWithRatings = await Promise.all(
          ratings.map(async (rating) => {
            const movie = await getMovie(rating.film);
            return {
              movie,
              rating: rating.rating
            };
          })
        );
        
        setRatedMovies(moviesWithRatings);
      } catch (error) {
        console.error("Error fetching rated movies:", error);
        setError("Failed to load your rated movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRatedMovies();
  }, [getToken]);

  return (
    <main>
      <Container className="py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Link href="/user">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">My Rated Movies</h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading your rated movies...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          ) : ratedMovies.length === 0 ? (
            <div className="p-6 bg-accent/20 rounded-lg">
              <p>You haven't rated any movies yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ratedMovies.map((ratedMovie, index) => (
                ratedMovie.movie ? (
                  <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Link href={`/movie/${ratedMovie.movie.id}`}>
                      <h2 className="text-lg font-semibold hover:text-primary transition-colors">
                        {ratedMovie.movie.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {ratedMovie.movie.release_date?.substring(0, 4)}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= ratedMovie.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm">
                        {ratedMovie.rating}/5
                      </span>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
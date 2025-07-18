import {Movie, DBMovie, Rating} from "@/lib/types";

/**
 * Fetches popular movies from The Movie Database API
 * @returns Promise<Movie[]> Array of popular movies
 */
export async function getPopularMovies(): Promise<Movie[]> {
    const url = `${process.env.MOVIEDB_API_URL}/movie/popular?language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVUIEDB_BEARER}`
        },
        next: {revalidate: 3600} // Cache for 1 hour
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
}

/**
 * Fetches a movie by its ID from The Movie Database API
 * @param id - The ID of the movie to fetch
 * @returns Promise<Movie | null> The movie object or null if not found
 */

export async function getMovie(id: number): Promise<Movie | null> {
    const url = `${process.env.MOVIEDB_API_URL}/movie/${id}?language=en-US`;  // Replace with the correct endpoint
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVUIEDB_BEARER}`
        },
        next: {revalidate: 3600} // Cache for 1 hour
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data || null;  // Return the movie data or null if no data is found
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null;
    }
}

export const getAuthenticatedUser = async () => {
    // Use localhost instead of 127.0.0.1 to ensure consistency with how the user accesses the site
    const url = 'http://127.0.0.1:8000/auth/user/';


    // Check if we're running on the server or client

    // For server-side requests, we need to use the 'next' option
    // to prevent caching and ensure fresh data
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        credentials: 'include' as RequestCredentials, // Include cookies in the request
        cache: 'no-store' as RequestCache, // Don't cache this request
        next: {revalidate: 0}
    };

    try {
        console.log('Fetching authenticated user from:', url);
        const response = await fetch(url, options);

        if (!response.ok) {
            console.log('Response not OK:', response.status);
            return null;
        }

        const data = await response.json();
        console.log('Authenticated user data:', data);

        // Return the data directly if authenticated is true, otherwise return null
        return data && data.authenticated ? data : null;
    } catch (error) {
        console.error('Error fetching authenticated user:', error);
        return null;
    }
}

export const getMoviesFromDB = async (): Promise<DBMovie[]> => {
    const url = 'http://127.0.0.1:8000/api/films/';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        next: {revalidate: 3600},
        // cache: 'no-store' as RequestCache // Disable caching
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data || [];
    } catch (error: any) {
        console.error('Error fetching movies from database:', error);
        return [];
    }
};

export const getMovieFromDB = async (id: number): Promise<DBMovie | null> => {
    const url = `http://127.0.0.1:8000/api/films/${id}/`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        next: {revalidate: 3600},
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status === 404) {
                return null; // Movie not found
            }
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data || null;
    } catch (error: any) {
        console.error('Error fetching movie from database:', error);
        return null;
    }
};

/**
 * Fetches all ratings for the current user
 * @param token - The authentication token from Clerk
 * @returns Promise<Rating[]> Array of user ratings
 */
export const getUserRatings = async (token: string): Promise<Rating[]> => {
    const url = 'http://127.0.0.1:8000/api/ratings/user/';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0} // Don't cache this request
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data || [];
    } catch (error: any) {
        console.error('Error fetching user ratings:', error);
        return [];
    }
};

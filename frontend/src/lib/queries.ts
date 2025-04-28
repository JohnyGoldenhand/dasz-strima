import {Movie} from "@/lib/types";

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
    const url = 'http://localhost:8000/auth/user/';

    // Check if we're running on the server or client
    const isServer = typeof window === 'undefined';

    // For server-side requests, we need to use the 'next' option
    // to prevent caching and ensure fresh data
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        credentials: 'include' as RequestCredentials, // Include cookies in the request
        cache: 'no-store' as RequestCache, // Don't cache this request
        ...(isServer ? { next: { revalidate: 0 } } : {}) // For server components
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

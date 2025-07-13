export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

export interface DBMovie {
    id: number;
    title: string;
    year: number;
    director: string;
    description: string;
    category: string;
    created_at: string;
    updated_at: string;
    added_by: number;
    want_to_watch: number[];
    watched: number[];
}

export interface Rating {
    id: number;
    user: number;
    film: number;
    rating: number;
    created_at: string;
    updated_at: string;
}

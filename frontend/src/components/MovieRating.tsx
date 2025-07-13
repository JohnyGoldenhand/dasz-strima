"use client";

import {useState} from "react";
import {Star} from "lucide-react";
import {cn} from "@/lib/utils";
import {useAuth} from "@clerk/nextjs";

interface MovieRatingProps {
    movieId: number;
}

export function MovieRating({movieId}: MovieRatingProps) {
    const [rating, setRating] = useState<number | null>(null);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const {getToken} = useAuth();

    const handleRatingChange = async (newRating: number) => {
        setIsSubmitting(true);
        setMessage(null);

        try {
            // Get token from Clerk
            const token = await getToken();

            if (!token) {
                setMessage("Authentication error. Please try again.");
                return;
            }

            // Send rating to backend
            const response = await fetch('http://127.0.0.1:8000/api/ratings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    film: movieId,
                    rating: newRating
                })
            });

            if (response.ok) {
                setRating(newRating);
                setMessage("Rating submitted successfully!");
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.detail || 'Failed to submit rating'}`);
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Rate this movie:</p>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="p-1 focus:outline-none"
                        disabled={isSubmitting}
                    >
                        <Star
                            size={24}
                            className={cn(
                                "transition-colors",
                                (hoveredRating !== null && star <= hoveredRating) ||
                                (hoveredRating === null && rating !== null && star <= rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            )}
                        />
                    </button>
                ))}
            </div>
            {rating && !message && (
                <p className="text-sm text-muted-foreground">
                    You rated this movie {rating} out of 5 stars
                </p>
            )}
            {message && (
                <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

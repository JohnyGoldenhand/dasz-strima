import {Container} from "@/components/Container";
import {LoginDiscordButton} from "@/components/Navigation/LoginDiscordButton";
import {getAuthenticatedUser} from "@/lib/queries";

export default async function UserPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return <LoginDiscordButton/>;
    }

    return (
        <main>
            <Container className="py-8">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-6">User Profile</h1>

                    <div className="flex flex-col items-center p-6 bg-accent rounded-lg shadow-md mb-6">
                        {user?.avatar && user?.discord_id ? (
                            <img
                                src={`https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png`}
                                alt="Discord Avatar"
                                className="w-24 h-24 rounded-full mb-4"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                                <span className="text-2xl">
                                    {user?.discord_username?.charAt(0) || user?.username?.charAt(0) || "?"}
                                </span>
                            </div>
                        )}

                        <h2 className="text-xl font-semibold">{user?.discord_username}</h2>
                        <p className="text-sm text-muted-foreground">@{user?.username}</p>
                    </div>
                </div>
            </Container>
        </main>
    );
}

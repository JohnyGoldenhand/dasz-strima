import {Container} from "@/components/Container";
import {UserProfile} from "@clerk/nextjs";


export default async function UserPage() {

    return (
        <main>
            <Container className="py-8">
                <div className="flex-1 w-full">
                    <h1 className="text-2xl font-bold mb-6">User Profile</h1>
                    <div className="w-full items-center justify-center flex ">
                        <UserProfile routing={"hash"}/>
                    </div>
                </div>
            </Container>
        </main>
    );
}

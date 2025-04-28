import {ThemeToggler} from "@/components/ThemeToggler";
import {Container} from "@/components/Container";

export const Navigation = () => (
    <nav className={"sticky top-0 left-0 bg-accent  shadow-md z-10"}>
        <Container className={"flex justify-between items-center py-4"}>
            <h1 className={"text-xl font-bold"}>Dasz strima</h1>
            <ThemeToggler/>
        </Container>
    </nav>
)
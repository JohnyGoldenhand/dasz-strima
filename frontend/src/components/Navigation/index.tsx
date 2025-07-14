import {ThemeToggler} from "@/components/ThemeToggler";
import {Container} from "@/components/Container";


export const Navigation = () => {


    return (
        <nav className={"sticky top-0 left-0 bg-gradient-to-r from-transparent to-accent shadow-md z-10"}>
            <Container className={"flex justify-around items-center py-4"}>
                <input type={"search"} placeholder={"Search"}
                       className={"w-2xl bg-slate-300 px-4 py-2 text-slate-950 rounded-2xl overflow-hidden"}/>
                <div className={"flex gap-4 items-center"}>
                    <ThemeToggler/>
                </div>
            </Container>
        </nav>
    );
}

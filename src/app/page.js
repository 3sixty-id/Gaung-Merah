import { Suspense } from "react";
import HomeWithParams from "./HomeWithParams";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeWithParams />
        </Suspense>
    );
}

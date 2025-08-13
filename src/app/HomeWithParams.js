"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeWithParams() {
    const searchParams = useSearchParams();
    const event_id = searchParams.get("event_id");

    const [src, setSrc] = useState(
        `/games/gaungmerah/index.html${event_id ? `?event_id=${event_id}` : ""}`
    );

    useEffect(() => {
        const timestamp = Date.now();
        const params = new URLSearchParams();

        if (event_id) params.append("event_id", event_id);
        params.append("ts", timestamp.toString());

        setSrc(`/games/gaungmerah/index.html?${params.toString()}`);
    }, [event_id]);

    return (
        <div
            style={{
                height: "100vh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
            }}
        >
            <iframe
                src={src}
                style={{
                    width: "100vw",
                    height: "100vh",
                    border: "none",
                    display: "block",
                }}
                title="Gaungmerah Game"
                scrolling="no"
                frameBorder="0"
            />
        </div>
    );
}

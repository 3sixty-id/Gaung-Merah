"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GamePage() {
    const searchParams = useSearchParams();
    const event_id = searchParams.get("event_id");

    useEffect(() => {
        // Build URL to static HTML with event_id and timestamp
        const params = new URLSearchParams();
        if (event_id) params.append("event_id", event_id);

        // Add timestamp to prevent caching
        params.append("ticket", Date.now().toString());

        const url = `/game?${params.toString()}`;
        // Redirect the browser to the static HTML
        window.location.href = url;
    }, [event_id]);

    return (
        <div style={styles.container}>
            <div style={styles.loader}></div>
            <p style={styles.text}>Loading Game...</p>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#cf1408",
        color: "#fff",
    },
    text: {
        marginTop: 20,
        fontSize: "2em",
        fontWeight: "bold",
        textAlign: "center",
    },
    loader: {
        width: 50,
        height: 50,
        border: "5px solid #fff",
        borderTop: "5px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
};

// Add keyframes globally using a style tag (since we are in plain JS)
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(styleSheet);
}

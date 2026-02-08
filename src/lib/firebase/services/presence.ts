
import {
    doc,
    onSnapshot,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../config";

// ============================================
// REAL-TIME PARTNER STATUS
// ============================================

export function subscribeToPartnerStatus(
    partnerUid: string,
    callback: (isOnline: boolean, lastSeen: Date | null) => void
) {
    return onSnapshot(doc(db, "partners", partnerUid), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            // Handle the case where lastSeen might be missing or not a timestamp yet
            const lastSeen = data.lastSeen?.toDate?.() || null;
            callback(data.isOnline, lastSeen);
        } else {
            callback(false, null);
        }
    });
}

// ============================================
// HEARTBEAT (Keep alive)
// ============================================

export function startHeartbeat(persona: string) {
    // Update presence every 60 seconds
    const interval = setInterval(async () => {
        try {
            await setDoc(
                doc(db, "partners", persona),
                {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                },
                { merge: true }
            );
        } catch (e) {
            console.warn("Heartbeat failed:", e);
        }
    }, 60000);

    // Initial update
    setDoc(doc(db, "partners", persona), {
        isOnline: true,
        lastSeen: serverTimestamp(),
    }, { merge: true }).catch(console.error);


    // Set offline on page unload
    if (typeof window !== "undefined") {
        window.addEventListener("beforeunload", async () => {
            // Best effort, might not complete
            navigator.sendBeacon && navigator.sendBeacon(''); // Simplified beacon if needed, but Firestore REST API is complex
            // Firestore handles some offline sensing automatically but this is explicit
            // We can't reliably await here
        });
    }

    return () => clearInterval(interval);
}

import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.LASTFM_USERNAME;
  const apiKey = process.env.LASTFM_API_KEY;

  if (!username || !apiKey) {
    // Fallback: Mock Spotify now playing
    const isPlaying = Math.random() > 0.3; // 70% chance of playing something for demo
    
    const mockTracks = [
      { title: "Resonance", artist: "HOME", url: "https://open.spotify.com/track/1yPgzR4n8Fq5BshF5qC6aD" },
      { title: "After Dark", artist: "Mr.Kitty", url: "https://open.spotify.com/track/2N45tW8V9B7tWJ1v8N45tW" },
      { title: "Starboy", artist: "The Weeknd", url: "https://open.spotify.com/track/7a9x64x238z4n8Fq5BshF5" },
      { title: "Midnight City", artist: "M83", url: "https://open.spotify.com/track/1ey9x64x238z4n8Fq5BshF" },
      { title: "Weightless", artist: "Marconi Union", url: "https://open.spotify.com/track/6Ue8bshF5qC6aD9x64x238" }
    ];

    if (isPlaying) {
      const track = mockTracks[Math.floor(Math.random() * mockTracks.length)];
      return NextResponse.json({
        isPlaying: true,
        title: track.title,
        artist: track.artist,
        songUrl: track.url
      });
    }

    return NextResponse.json({
      isPlaying: false,
      title: "Not Playing",
      artist: "Spotify"
    });
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
      {
        next: { revalidate: 10 }, // Cache response for 10 seconds to avoid rate limiting
      }
    );

    if (!response.ok) {
      throw new Error(`Last.fm API returned status ${response.status}`);
    }

    const data = await response.json();
    const track = data.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json({
        isPlaying: false,
        title: "Not Playing",
        artist: "Spotify"
      });
    }

    // Check if the user is currently listening to the track
    const isPlaying = track["@attr"]?.nowplaying === "true";
    const title = track.name;
    const artist = track.artist?.["#text"] || "Unknown Artist";
    // Find the largest image in the array
    const albumUrl = track.image?.[3]?.["#text"] || track.image?.[2]?.["#text"] || "";
    const songUrl = track.url || "https://www.spotify.com";

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      albumUrl,
      songUrl,
    });
  } catch (error: unknown) {
    console.error("Error fetching Last.fm now playing track:", error);
    return NextResponse.json(
      { isPlaying: false, error: "Failed to fetch currently playing track" },
      { status: 500 }
    );
  }
}

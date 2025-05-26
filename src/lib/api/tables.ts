import {
  Album,
  Artist,
  Country,
  Genre,
  Playlist,
  PlaylistTrack,
  Track,
  TrackGenre,
  User,
} from "@/lib/types";

export async function fetchArtists(): Promise<Artist[]> {
  const res = await fetch("/api/tables/artists");
  if (!res.ok) throw new Error("Failed to fetch artists");
  return await res.json();
}

export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch("/api/tables/albums");
  if (!res.ok) throw new Error("Failed to fetch albums");
  return await res.json();
}

export async function fetchGenres(): Promise<Genre[]> {
  const res = await fetch("/api/tables/genres");
  if (!res.ok) throw new Error("Failed to fetch genres");
  return await res.json();
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  const res = await fetch("/api/tables/playlists");
  if (!res.ok) throw new Error("Failed to fetch playlists");
  return await res.json();
}
export async function fetchTracks(): Promise<Track[]> {
  const res = await fetch("/api/tables/tracks");
  if (!res.ok) throw new Error("Failed to fetch tracks");
  return await res.json();
}
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("/api/tables/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
}
export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch("/api/tables/countries");
  if (!res.ok) throw new Error("Failed to fetch countries");
  return await res.json();
}

export async function fetchPlaylistTracks(): Promise<PlaylistTrack[]> {
  const res = await fetch("/api/tables/playlistTracks");
  if (!res.ok) throw new Error("Failed to fetch playlist tracks");
  const raw = await res.json();
  return raw.map((item: PlaylistTrack) => ({
    ...item,
    id: `${item.playlistId}_${item.trackId}`,
  }));
}

export async function fetchTrackGenres(): Promise<TrackGenre[]> {
  const res = await fetch("/api/tables/trackGenres");
  if (!res.ok) throw new Error("Failed to fetch track genres");
  const raw = await res.json();
  return raw.map((item: TrackGenre) => ({
    ...item,
    id: `${item.trackId}_${item.genreId}`,
  }));
}

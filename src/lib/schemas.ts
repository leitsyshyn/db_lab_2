import { z } from "zod";

// Reusable primitives
const id = z.string().uuid();
const date = z.coerce.date().optional();
const requiredString = z.string().min(1).max(255);

// Artist
export const ArtistCreateSchema = z.object({
  name: requiredString,
  country: z.string().optional(),
  bio: z.string().optional(),
  image: z.string().url().optional(),
});
export const ArtistUpdateSchema = ArtistCreateSchema.partial();
export const ArtistSchema = ArtistCreateSchema.extend({
  id,
  createdAt: date,
  updatedAt: date,
});

// Album
export const AlbumCreateSchema = z.object({
  title: requiredString,
  image: z.string().url().optional(),
  artistId: id,
});
export const AlbumUpdateSchema = AlbumCreateSchema.partial();
export const AlbumSchema = AlbumCreateSchema.extend({
  id,
  createdAt: date,
  updatedAt: date,
});

// Track
export const TrackCreateSchema = z.object({
  title: requiredString,
  duration: z.number().int().positive(),
  albumPosition: z.number().int().positive().optional(),
  albumId: id,
});
export const TrackUpdateSchema = TrackCreateSchema.partial();
export const TrackSchema = TrackCreateSchema.extend({
  id,
  createdAt: date,
  updatedAt: date,
});

// Genre
export const GenreCreateSchema = z.object({
  name: requiredString,
});
export const GenreUpdateSchema = GenreCreateSchema.partial();
export const GenreSchema = GenreCreateSchema.extend({
  id,
});

// TrackGenre (junction)
export const TrackGenreCreateSchema = z.object({
  trackId: id,
  genreId: id,
});
export const TrackGenreSchema = TrackGenreCreateSchema;

// User
export const UserCreateSchema = z.object({
  username: requiredString,
  email: z.string().email(),
  password: requiredString,
  bio: z.string().optional(),
  image: z.string().url().optional(),
});
export const UserUpdateSchema = UserCreateSchema.partial();
export const UserSchema = UserCreateSchema.extend({
  id,
  createdAt: date,
  updatedAt: date,
});

// Playlist
export const PlaylistCreateSchema = z.object({
  name: requiredString,
  userId: id,
});
export const PlaylistUpdateSchema = PlaylistCreateSchema.partial();
export const PlaylistSchema = PlaylistCreateSchema.extend({
  id,
  createdAt: date,
  updatedAt: date,
});

// PlaylistTrack (junction)
export const PlaylistTrackCreateSchema = z.object({
  playlistId: id,
  trackId: id,
  trackOrder: z.number().int().positive().optional(),
});
export const PlaylistTrackSchema = PlaylistTrackCreateSchema.extend({
  createdAt: date,
});

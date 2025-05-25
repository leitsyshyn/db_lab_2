import { Country } from "@/app/generated/prisma/client";
import { z } from "zod";

// Reusable primitives
const id = z.string().uuid();
const date = z.coerce.date().optional();
const requiredString = z.string().min(1).max(255);
const country = z.nativeEnum(Country);

// Artist
export const ArtistCreateSchema = z.object({
  name: requiredString,
  country: country.optional(),
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
export const TrackGenreUpdateSchema = TrackGenreCreateSchema.partial();

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
export const PlaylistTrackUpdateSchema = PlaylistTrackCreateSchema.partial();

// Simple Queries
export const simpleQuery1Schema = AlbumSchema;
export const simpleQuery2Schema = ArtistSchema;
export const simpleQuery3Schema = PlaylistSchema;
export const simpleQuery4Schema = UserSchema;
export const simpleQuery5Schema = TrackSchema;

// Set Comparison Queries
export const setComparisonQuery1Schema = PlaylistSchema;
export const setComparisonQuery2Schema = UserSchema;
export const setComparisonQuery3Schema = z.object({
  firstArtistName: requiredString,
  secondArtistName: requiredString,
});

// Simple Query Params
export const simpleQuery1ParamsSchema = z.object({
  minTrackCount: z.coerce.number().int().positive(),
});
export const simpleQuery2ParamsSchema = z.object({
  minDate: z.coerce.date(),
});
export const simpleQuery3ParamsSchema = z.object({
  minGenreCount: z.coerce.number().int().positive(),
});
export const simpleQuery4ParamsSchema = z.object({
  country: country,
});
export const simpleQuery5ParamsSchema = z.object({
  genreName: z.string(),
  minTrackDuration: z.coerce.number().int().positive(),
});

// Set Comparison Query Params
export const setComparisonQuery1ParamsSchema = z.object({
  username: requiredString,
});
export const setComparisonQuery2ParamsSchema = z.object({
  albumName: requiredString,
});
export const setComparisonQuery3ParamsSchema = z.object({
  minDate: z.coerce.date(),
});

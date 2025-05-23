import type { z } from "zod";
import {
  ArtistCreateSchema,
  ArtistUpdateSchema,
  ArtistSchema,
  AlbumCreateSchema,
  AlbumUpdateSchema,
  AlbumSchema,
  TrackCreateSchema,
  TrackUpdateSchema,
  TrackSchema,
  GenreCreateSchema,
  GenreUpdateSchema,
  GenreSchema,
  TrackGenreCreateSchema,
  UserCreateSchema,
  UserUpdateSchema,
  UserSchema,
  PlaylistCreateSchema,
  PlaylistUpdateSchema,
  PlaylistSchema,
  PlaylistTrackCreateSchema,
  PlaylistTrackSchema,
} from "./schemas";

// Artist
export type ArtistCreate = z.infer<typeof ArtistCreateSchema>;
export type ArtistUpdate = z.infer<typeof ArtistUpdateSchema>;
export type Artist = z.infer<typeof ArtistSchema>;

// Album
export type AlbumCreate = z.infer<typeof AlbumCreateSchema>;
export type AlbumUpdate = z.infer<typeof AlbumUpdateSchema>;
export type Album = z.infer<typeof AlbumSchema>;

// Track
export type TrackCreate = z.infer<typeof TrackCreateSchema>;
export type TrackUpdate = z.infer<typeof TrackUpdateSchema>;
export type Track = z.infer<typeof TrackSchema>;

// Genre
export type GenreCreate = z.infer<typeof GenreCreateSchema>;
export type GenreUpdate = z.infer<typeof GenreUpdateSchema>;
export type Genre = z.infer<typeof GenreSchema>;

// TrackGenre (junction)
export type TrackGenreCreate = z.infer<typeof TrackGenreCreateSchema>;
export type TrackGenre = TrackGenreCreate;

// User
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type User = z.infer<typeof UserSchema>;

// Playlist
export type PlaylistCreate = z.infer<typeof PlaylistCreateSchema>;
export type PlaylistUpdate = z.infer<typeof PlaylistUpdateSchema>;
export type Playlist = z.infer<typeof PlaylistSchema>;

// PlaylistTrack (junction)
export type PlaylistTrackCreate = z.infer<typeof PlaylistTrackCreateSchema>;
export type PlaylistTrack = z.infer<typeof PlaylistTrackSchema>;

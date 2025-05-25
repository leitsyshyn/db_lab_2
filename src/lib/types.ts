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
  simpleQuery1Schema,
  setComparisonQuery1Schema,
  setComparisonQuery2Schema,
  setComparisonQuery3Schema,
  simpleQuery2Schema,
  simpleQuery3Schema,
  simpleQuery4Schema,
  simpleQuery5Schema,
  simpleQuery1ParamsSchema,
  simpleQuery2ParamsSchema,
  simpleQuery3ParamsSchema,
  simpleQuery4ParamsSchema,
  simpleQuery5ParamsSchema,
  setComparisonQuery1ParamsSchema,
  setComparisonQuery2ParamsSchema,
  setComparisonQuery3ParamsSchema,
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

// Simple Queries
export type SimpleQuery1 = z.infer<typeof simpleQuery1Schema>;
export type SimpleQuery2 = z.infer<typeof simpleQuery2Schema>;
export type SimpleQuery3 = z.infer<typeof simpleQuery3Schema>;
export type SimpleQuery4 = z.infer<typeof simpleQuery4Schema>;
export type SimpleQuery5 = z.infer<typeof simpleQuery5Schema>;

// Set Comparison Queries
export type SetComparisonQuery1 = z.infer<typeof setComparisonQuery1Schema>;
export type SetComparisonQuery2 = z.infer<typeof setComparisonQuery2Schema>;
export type SetComparisonQuery3 = z.infer<typeof setComparisonQuery3Schema>;

// Simple Query Params
export type SimpleQuery1Params = z.infer<typeof simpleQuery1ParamsSchema>;
export type SimpleQuery2Params = z.infer<typeof simpleQuery2ParamsSchema>;
export type SimpleQuery3Params = z.infer<typeof simpleQuery3ParamsSchema>;
export type SimpleQuery4Params = z.infer<typeof simpleQuery4ParamsSchema>;
export type SimpleQuery5Params = z.infer<typeof simpleQuery5ParamsSchema>;

// Set Comparison Query Params
export type SetComparisonQuery1Params = z.infer<
  typeof setComparisonQuery1ParamsSchema
>;
export type SetComparisonQuery2Params = z.infer<
  typeof setComparisonQuery2ParamsSchema
>;
export type SetComparisonQuery3Params = z.infer<
  typeof setComparisonQuery3ParamsSchema
>;

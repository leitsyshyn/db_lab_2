-- prisma/sql/getUsersWithPlaylistsWithArtist.sql
-- parameter: artistId ($1)
SELECT DISTINCT
  u.*
FROM "User" u
JOIN "Playlist" p
  ON p."userId" = u."id"
JOIN "PlaylistTrack" pt
  ON pt."playlistId" = p."id"
JOIN "Track" t
  ON t."id" = pt."trackId"
JOIN "Album" a
  ON a."id" = t."albumId"
WHERE a."artistId" = $1;
SELECT DISTINCT
  p.*
FROM "Playlist" p
JOIN "PlaylistTrack" pt
  ON pt."playlistId" = p.id
JOIN "Track" t
  ON t.id = pt."trackId"
JOIN "Album" a
  ON a.id = t."albumId"
JOIN (
  SELECT
    t2."albumId"
  FROM "Track" t2
  JOIN "TrackGenre" tg
    ON tg."trackId" = t2.id
  GROUP BY
    t2."albumId"
  HAVING
    COUNT(DISTINCT tg."genreId") >= $1
) multiGenreAlbums
  ON multiGenreAlbums."albumId" = a.id;
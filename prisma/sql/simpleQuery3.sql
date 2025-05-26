SELECT DISTINCT
  p.*
FROM
  "Playlist" p
  JOIN "PlaylistTrack" pt
    ON pt."playlistId" = p.id
  JOIN "TrackGenre" tg
    ON tg."trackId"    = pt."trackId"
GROUP BY
  p.id
HAVING
  COUNT(DISTINCT tg."genreId") >= $1;

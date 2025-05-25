-- prisma/sql/getPlaylistsHavingGenresSameAsUser.sql
-- parameter: username ($1)
WITH user_genres AS (
  SELECT DISTINCT tg."genreId"
  FROM "User" u
  JOIN "Playlist" p      ON p."userId" = u."id"
  JOIN "PlaylistTrack" pt ON pt."playlistId" = p."id"
  JOIN "TrackGenre" tg    ON tg."trackId"    = pt."trackId"
  WHERE u."username" = $1
)
SELECT p2.*
FROM "Playlist" p2
WHERE
  NOT EXISTS (
    SELECT 1
    FROM user_genres ug
    WHERE NOT EXISTS (
      SELECT 1
      FROM "PlaylistTrack" pt2
      JOIN "TrackGenre"    tg2 ON tg2."trackId" = pt2."trackId"
      WHERE pt2."playlistId" = p2."id"
        AND tg2."genreId"     = ug."genreId"
    )
  )
  AND
  NOT EXISTS (
    SELECT 1
    FROM "PlaylistTrack" pt2
    JOIN "TrackGenre"    tg2 ON tg2."trackId" = pt2."trackId"
    WHERE pt2."playlistId" = p2."id"
      AND NOT EXISTS (
        SELECT 1
        FROM user_genres ug
        WHERE ug."genreId" = tg2."genreId"
      )
  )
;

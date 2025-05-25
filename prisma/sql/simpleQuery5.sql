-- prisma/sql/getTracksNotInGenreHavingMinDuration.sql
-- parameters: genreName ($1), minDuration ($2)

SELECT
  t.*
FROM "Track" t
WHERE t."duration" >= $2
  AND NOT EXISTS (
    SELECT 1
    FROM "TrackGenre" tg
    JOIN "Genre" g
      ON g."id" = tg."genreId"
    WHERE tg."trackId" = t."id"
      AND g."name" = $1
  );

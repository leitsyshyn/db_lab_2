-- prisma/sql/getTracksOfGenreWithLength.sql
-- parameter: genreId ($1), lengthThreshold ($2) 
SELECT 
  t.*
FROM
  "Track" t
JOIN
  "TrackGenre" tg ON t."id" = tg."trackId"
WHERE
  tg."genreId" = $1
  AND t."duration" > $2;
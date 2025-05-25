WITH given_users AS (
  SELECT DISTINCT
    u."id" AS user_id
  FROM "Artist" AS ar
  JOIN "Album" AS al    ON al."artistId"    = ar."id"
  JOIN "Track" AS t     ON t."albumId"      = al."id"
  JOIN "PlaylistTrack" AS pt ON pt."trackId" = t."id"
  JOIN "Playlist" AS p  ON p."id"           = pt."playlistId"
  JOIN "User" AS u      ON u."id"           = p."userId"
  WHERE ar."name" = $1
),
artist_users AS (
  SELECT DISTINCT
    ar."id" AS artist_id,
    u."id" AS user_id
  FROM "Artist" AS ar
  JOIN "Album" AS al    ON al."artistId"    = ar."id"
  JOIN "Track" AS t     ON t."albumId"      = al."id"
  JOIN "PlaylistTrack" AS pt ON pt."trackId" = t."id"
  JOIN "Playlist" AS p  ON p."id"           = pt."playlistId"
  JOIN "User" AS u      ON u."id"           = p."userId"
)
SELECT DISTINCT
  a.*
FROM "Artist" AS a
WHERE a."name" <> $1
  AND NOT EXISTS (
    SELECT 1
    FROM given_users AS gu
    WHERE NOT EXISTS (
      SELECT 1
      FROM artist_users AS au
      WHERE au."artist_id" = a."id"
        AND au."user_id"   = gu.user_id
    )
  )
  AND NOT EXISTS (
    SELECT 1
    FROM artist_users AS au2
    WHERE au2."artist_id" = a."id"
      AND NOT EXISTS (
        SELECT 1
        FROM given_users AS gu2
        WHERE gu2.user_id = au2.user_id
      )
  )
ORDER BY a."name";

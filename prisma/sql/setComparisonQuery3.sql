WITH artist_user AS (

    SELECT DISTINCT
           a.id        AS artist_id,
           pl."userId" AS user_id
    FROM   "Artist"        a
    JOIN   "Album"         al ON al."artistId" = a.id
    JOIN   "Track"         t  ON t."albumId"   = al.id
    JOIN   "PlaylistTrack" pt ON pt."trackId"  = t.id
    JOIN   "Playlist"      pl ON pl.id         = pt."playlistId"
    WHERE pl."createdAt" >= $1
)
SELECT
    ar1.name AS "firstArtistName",
    ar2.name AS "secondArtistName"
FROM   "Artist" ar1
JOIN   "Artist" ar2
       ON ar1.id < ar2.id                 
WHERE  NOT EXISTS (                       
          SELECT 1
          FROM   artist_user au1
          WHERE  au1.artist_id = ar1.id
            AND  NOT EXISTS (
                   SELECT 1
                   FROM   artist_user au2
                   WHERE  au2.artist_id = ar2.id
                     AND  au2.user_id   = au1.user_id
                 )
       )
  AND  NOT EXISTS (                     
          SELECT 1
          FROM   artist_user au2
          WHERE  au2.artist_id = ar2.id
            AND  NOT EXISTS (
                   SELECT 1
                   FROM   artist_user au1
                   WHERE  au1.artist_id = ar1.id
                     AND  au1.user_id   = au2.user_id
                 )
       );

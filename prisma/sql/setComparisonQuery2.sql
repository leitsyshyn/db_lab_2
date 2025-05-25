WITH target_tracks AS (
  SELECT t.id
  FROM "Track" t
  JOIN "Album" al ON t."albumId" = al.id
  WHERE al.title = $1
)
SELECT DISTINCT u.*
FROM "User" u
JOIN "Playlist" p ON p."userId" = u.id
WHERE NOT EXISTS (
  SELECT 1
  FROM target_tracks tt
  WHERE NOT EXISTS (
    SELECT 1
    FROM "PlaylistTrack" pt
    WHERE pt."playlistId" = p.id
      AND pt."trackId"    = tt.id
  )
);

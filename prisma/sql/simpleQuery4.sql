SELECT DISTINCT
  u.*
FROM "User" u
JOIN "Playlist" p
  ON p."userId" = u.id
JOIN "PlaylistTrack" pt
  ON pt."playlistId" = p.id
JOIN "Track" t
  ON t.id = pt."trackId"
JOIN "Album" al
  ON al.id = t."albumId"
JOIN "Artist" ar
  ON ar.id = al."artistId"
WHERE ar."country" = CAST($1 AS "Country");

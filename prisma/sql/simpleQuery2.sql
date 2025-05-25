SELECT DISTINCT
  a.*
FROM "Artist" a
JOIN "Album" al ON al."artistId" = a.id
WHERE al."createdAt" > $1;

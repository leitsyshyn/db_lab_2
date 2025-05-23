-- prisma/sql/getArtistsWithAlbumsAfterDate.sql
-- parameter: dateThreshold ($1)
SELECT DISTINCT
  a.id,
  a."name",
  a."createdAt",
  a."updatedAt",
  a."bio",
  a."image"
FROM "Artist" a
JOIN "Album" al ON al."artistId" = a."id"
WHERE al."createdAt" > $1;

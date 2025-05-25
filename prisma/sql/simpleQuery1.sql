SELECT
  a.*
FROM "Album" a
JOIN "Track" t
  ON t."albumId" = a.id
GROUP BY a.id
HAVING COUNT(t.id) > $1;
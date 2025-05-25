-- DropForeignKey
ALTER TABLE "PlaylistTrack" DROP CONSTRAINT "PlaylistTrack_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistTrack" DROP CONSTRAINT "PlaylistTrack_trackId_fkey";

-- DropForeignKey
ALTER TABLE "TrackGenre" DROP CONSTRAINT "TrackGenre_genreId_fkey";

-- DropForeignKey
ALTER TABLE "TrackGenre" DROP CONSTRAINT "TrackGenre_trackId_fkey";

-- AddForeignKey
ALTER TABLE "TrackGenre" ADD CONSTRAINT "TrackGenre_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackGenre" ADD CONSTRAINT "TrackGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

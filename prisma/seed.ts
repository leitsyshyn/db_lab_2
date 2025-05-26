// prisma/seed.ts
import { PrismaClient } from "../src/app/generated/prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const now = new Date();

// Configuration constants
const NUM_ARTISTS = 20;
const MIN_ALBUMS_PER_ARTIST = 1;
const MAX_ALBUMS_PER_ARTIST = 10;
const MIN_TRACKS_PER_ALBUM = 1;
const MAX_TRACKS_PER_ALBUM = 15;

const NUM_USERS = 20;
const MIN_PLAYLISTS_PER_USER = 1;
const MAX_PLAYLISTS_PER_USER = 5;
const MIN_TRACKS_PER_PLAYLIST = 5;
const MAX_TRACKS_PER_PLAYLIST = 20;

// Static list of genres
const GENRES = [
  "Pop",
  "Rock",
  "Jazz",
  "Classical",
  "Hip Hop",
  "Electronic",
  "Country",
  "R&B",
  "Reggae",
  "Blues",
] as const;

async function main() {
  // --- Seed genres ---
  const createdGenres = await Promise.all(
    GENRES.map((name) => prisma.genre.create({ data: { name } }))
  );
  const genreIds = createdGenres.map((g) => g.id);

  // Collect all track IDs for playlist population
  const allTrackIds: string[] = [];

  // --- Seed artists, albums, tracks ---
  for (let i = 0; i < NUM_ARTISTS; i++) {
    // generate random timestamps
    const createdAt = faker.date.between({ from: "1970-01-01", to: now });
    const updatedAt = faker.date.between({ from: createdAt, to: now });

    // pick a random ISO country code and name
    const countryCode = faker.location.countryCode("alpha-2");
    const countryName = faker.location.country();

    // create artist and connect (or create) its country
    const artist = await prisma.artist.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos({ width: 400, height: 400 }),
        createdAt,
        updatedAt,
        country: {
          connectOrCreate: {
            where: { code: countryCode }, // unique by code
            create: { code: countryCode, name: countryName },
          },
        },
      },
    });

    // how many albums this artist has
    const numAlbums = faker.number.int({
      min: MIN_ALBUMS_PER_ARTIST,
      max: MAX_ALBUMS_PER_ARTIST,
    });

    for (let a = 0; a < numAlbums; a++) {
      const albumCreated = faker.date.between({ from: createdAt, to: now });
      const albumUpdated = faker.date.between({ from: albumCreated, to: now });

      const album = await prisma.album.create({
        data: {
          title: faker.lorem.words({ min: 2, max: 5 }),
          image: faker.image.urlPicsumPhotos({ width: 640, height: 640 }),
          createdAt: albumCreated,
          updatedAt: albumUpdated,
          artist: { connect: { id: artist.id } },
        },
      });

      // how many tracks this album has
      const numTracks = faker.number.int({
        min: MIN_TRACKS_PER_ALBUM,
        max: MAX_TRACKS_PER_ALBUM,
      });

      for (let t = 0; t < numTracks; t++) {
        const trackCreated = faker.date.between({
          from: albumCreated,
          to: now,
        });
        const trackUpdated = faker.date.between({
          from: trackCreated,
          to: now,
        });

        // assign 1–3 random genres
        const genreCount = faker.number.int({ min: 1, max: 3 });
        const uniqueGenreIds = faker.helpers.arrayElements(
          genreIds,
          genreCount
        );

        const track = await prisma.track.create({
          data: {
            title: faker.music.songName(),
            duration: faker.number.int({ min: 60, max: 600 }),
            albumPosition: t + 1,
            createdAt: trackCreated,
            updatedAt: trackUpdated,
            album: { connect: { id: album.id } },
            genres: {
              create: uniqueGenreIds.map((id) => ({
                genre: { connect: { id } },
              })),
            },
          },
        });

        allTrackIds.push(track.id);
      }
    }
  }

  // --- Seed users and playlists ---
  for (let u = 0; u < NUM_USERS; u++) {
    const createdAt = faker.date.between({ from: "2000-01-01", to: now });
    const updatedAt = faker.date.between({ from: createdAt, to: now });

    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.sentence(),
        image: faker.image.avatar(),
        createdAt,
        updatedAt,
      },
    });

    const numPlaylists = faker.number.int({
      min: MIN_PLAYLISTS_PER_USER,
      max: MAX_PLAYLISTS_PER_USER,
    });

    for (let p = 0; p < numPlaylists; p++) {
      const plCreated = faker.date.between({ from: createdAt, to: now });
      const plUpdated = faker.date.between({ from: plCreated, to: now });

      const trackCount = faker.number.int({
        min: MIN_TRACKS_PER_PLAYLIST,
        max: Math.min(MAX_TRACKS_PER_PLAYLIST, allTrackIds.length),
      });
      const selected = faker.helpers.arrayElements(allTrackIds, trackCount);

      await prisma.playlist.create({
        data: {
          name: faker.lorem.words({ min: 1, max: 3 }),
          createdAt: plCreated,
          updatedAt: plUpdated,
          user: { connect: { id: user.id } },
          tracks: {
            create: selected.map((trackId, idx) => ({
              track: { connect: { id: trackId } },
              trackOrder: idx + 1,
              createdAt: faker.date.between({ from: plCreated, to: now }),
            })),
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

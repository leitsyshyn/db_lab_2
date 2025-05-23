import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        Tables
        <li>
          <Link href="/tables/genres">Genres</Link>
        </li>
        <li>
          <Link href="/tables/artists">Artists</Link>
        </li>
        <li>
          <Link href="/tables/albums">Albums</Link>
        </li>
        <li>
          <Link href="/tables/tracks">Tracks</Link>
        </li>
        <li>
          <Link href="/tables/playlists">Playlists</Link>
        </li>
        <li>
          <Link href="/tables/users">Users</Link>
        </li>
        Queries Simple
        <li>
          <Link href="/queries/simple/artists">ArtistsWithAlbumsAfterDate</Link>
        </li>
      </ul>
    </div>
  );
}

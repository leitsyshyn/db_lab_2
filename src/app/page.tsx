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
        Simple Queries
        <li>
          <Link href="/queries/simple/query1">Query 1</Link>
        </li>
        <li>
          <Link href="/queries/simple/query2">Query 2</Link>
        </li>
        <li>
          <Link href="/queries/simple/query3">Query 3</Link>
        </li>
        <li>
          <Link href="/queries/simple/query4">Query 4</Link>
        </li>
        <li>
          <Link href="/queries/simple/query5">Query 5</Link>
        </li>
        Set Comparison Queries
        <li>
          <Link href="/queries/setComparison/query1">Query 1</Link>
        </li>
        <li>
          <Link href="/queries/setComparison/query2">Query 2</Link>
        </li>
        <li>
          <Link href="/queries/setComparison/query3">Query 3</Link>
        </li>
      </ul>
    </div>
  );
}

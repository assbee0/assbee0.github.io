import Link from "next/link";
import { getAllClasses } from "@/lib/data";

export default function Home() {
  const classes = getAllClasses();

  return (
    <div className="homepage-background">
      <h1 className="heading-animal" data-word="ZOOLOGY">
        <span className="title-text">スモモ動物図鑑</span>
      </h1>

      {classes.map(c => (
        <div key={c}>
          <h2 className="homepage-h2-class" data-word={c.toUpperCase()}>
            <Link href={`/${c}`}>{c}</Link></h2>
        </div>
      ))}
    </div>
  );
}
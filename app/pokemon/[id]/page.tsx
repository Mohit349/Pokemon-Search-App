import { baseUrl } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default async function PokemonDetail({ params }: any) {
  const urlParams = await params;
  const { id } = urlParams;
  const data = await fetch(`${baseUrl}/pokemon/${id}`);
  const detail = await data.json();

  return (
    <div className="bg-white">
      <div className="flex align-center p-5">
        <Link href="/" className="text-blue">
          {"Home "}
        </Link>
        <span>&nbsp;{" > "} &nbsp;</span>
        <span className="capitalize">{detail?.name}</span>
      </div>
      <div className="flex items-center justify-center bg-white py-10">
        <Image
          src={detail?.sprites?.other?.home?.front_shiny}
          height={400}
          width={400}
          alt="pokemon"
        />
      </div>
      <div className="bg-yellow-200 p-5">
        <div className="flex align-center text-sm">
          <p className="font-bold">Name:&nbsp;</p>
          <p className="capitalize">{detail?.name}</p>
        </div>
        <div className="flex align-center text-sm">
          <p className="font-bold">Type:&nbsp;</p>
          <p className="capitalize">
            {detail?.types?.map((typeObj: any) => typeObj.type.name).join(",")}
          </p>
        </div>

        <div className="flex align-center text-sm">
          <p className="font-bold">Abilities:&nbsp;</p>
          <p className="capitalize">
            {detail?.abilities
              ?.map((abilitiesObj: any) => abilitiesObj.ability.name)
              .join(",")}
          </p>
        </div>
        <div className="flex align-center text-sm">
          <p className="font-bold"> Some Moves:&nbsp;</p>
          <p className="capitalize">
            {detail?.moves
              ?.slice(0, 3)
              ?.map((movesObj: any) => movesObj.move.name)
              .join(",")}
          </p>
        </div>
        <div className="flex align-center text-sm">
          <p className="font-bold">Stats:&nbsp;</p>
          <p className="capitalize">
            {detail?.stats
              ?.map((statsObj: any) => statsObj.stat.name)
              .join(",")}
          </p>
        </div>
      </div>
    </div>
  );
}

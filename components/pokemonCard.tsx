import Image from "next/image";
import { useRouter } from "next/navigation";
interface PokemonCardProps {
  pokemon: any;
}
const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const router = useRouter();
  const pokemonImage = pokemon?.sprites?.other?.home;
  return (
    <div
      onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
      className="shadow-sm  bg-white rounded-xl cursor-pointer"
    >
      <div className="flex items-center justify-center bg-white rounded-tl-xl rounded-tr-xl py-10">
        <Image
          src={
            pokemonImage?.front_shiny ||
            pokemonImage?.front_default ||
            pokemon?.sprites?.front_shiny ||
            pokemon?.sprites?.front_default ||
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10158.png"
          }
          height={200}
          width={200}
          alt="pokemon"
        />
      </div>
      <div className="p-10 bg-gray-100 rounded-br-xl rounded-bl-xl">
        <p className="font-bold capitalize">{pokemon?.name}</p>
      </div>
    </div>
  );
};
export default PokemonCard;

"use client";
import { useData } from "../hooks/usePokemonData";
import PokemonCard from "@/components/pokemonCard";

export default function Home() {
  const {
    loading,
    fetchMoreLoading,
    pokemonDetails,
    fetchMore,
    nextPageUrl,
    pokemonTypes,
    filter,
    handleFilterChange,
    searchQuery,
    handleSearchChange,
  } = useData();

  return (
    <main className="bg-gray-200">
      <section className="pt-12">
        <div className="flex align-center justify-center ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Pokemon"
            className="mx-8 w-[50%] bg-gray-100 px-6 py-2 rounded-xl border outline-none"
          />
        </div>
        <div className="flex px-2 sm:px-16 py-4 items-center justify-center w-[50%] mx-auto">
          <label
            htmlFor="types"
            className="block mr-2 text-gray-900 font-medium text-sm sm:text-2xl"
          >
            Type
          </label>
          <select
            name="types"
            id="types"
            value={filter?.type}
            onChange={(e: any) => handleFilterChange("type", e.target.value)}
            className="bg-gray-50 text-gray-900 w-full py-2 px-4"
          >
            {pokemonTypes?.map((type: string, i: number) => {
              return (
                <option key={`${i}-${type}`} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
      </section>
      {pokemonDetails?.length ? (
        <section className="min-h-[91vh]">
          <div className="px-15 py-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {(!loading || (loading && fetchMoreLoading)) &&
              pokemonDetails?.map((pokemon: any, i: number) => {
                return <PokemonCard key={i} pokemon={pokemon} />;
              })}
          </div>
          {nextPageUrl &&
            !searchQuery &&
            (filter?.type === "All" || !filter?.type) && (
              <div className="flex align-center justify-center">
                <button
                  onClick={fetchMore}
                  disabled={loading}
                  className="bg-blue-500 mb-4  rounded px-6 py-2 text-white cursor-pointer font-medium hover:bg-blue-600 transition-all duration-300 ease-in-out"
                >
                  {loading ? "Loading More" : "Load More"}
                </button>
              </div>
            )}
        </section>
      ) : (
        <div className="flex align-center justify-center text-base font-medium min-h-[90vh]">
          <div>No data found</div>
        </div>
      )}
    </main>
  );
}

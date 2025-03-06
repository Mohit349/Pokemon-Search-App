"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/constants";
import _ from "lodash";

export const useData = () => {
  const [loading, setLoading] = useState(false);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setDetails] = useState([]);
  const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState(
    []
  );
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [pokemonTypes, setTypes] = useState(["All"]);
  const [filter, setFilter] = useState({ type: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // fetch pokemon list with limit 20
  const fetchPokemons = async (fetchUrl) => {
    try {
      setLoading(true);
      const data = await fetch(fetchUrl);
      const response = await data.json();
      setLoading(false);
      setPokemons((prev) => [...prev, ...response?.results]);
      setNextPageUrl(response?.next);
    } catch (error) {
      setLoading(false);
      setFetchMoreLoading(false);
      console.error("error while fetching pokemons", err);
    }
  };

  // fetch pokemon details
  const fetchPokemonDetails = async () => {
    setLoading(true);
    try {
      const details = await Promise.all(
        pokemons?.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res?.json();
        })
      );
      setLoading(false);
      setFetchMoreLoading(false);
      setDetails(details);
      setOriginalPokemonListDetails(details);
    } catch (error) {
      console.error("error while fetching pokemon details", error);
    }
  };
  // fetch pokemon types
  const fetchPokemonTypes = async () => {
    try {
      const data = await fetch(`${baseUrl}/type/?limit=30`);
      const res = await data?.json();
      const types = res?.results?.map(
        (one) => one.name?.charAt(0)?.toUpperCase() + one?.name.slice(1)
      );
      setTypes((prev) => [...prev, ...types]);
    } catch (error) {
      console.error("error while fetching pokemon types", error);
    }
  };
  // fetch more pokemons
  const fetchMore = () => {
    if (nextPageUrl) {
      setFetchMoreLoading(true);
      fetchPokemons(nextPageUrl);
    }
  };
  //filter pokemons
  const filterPokemon = () => {
    const { type } = filter;
    const query = searchQuery.toLowerCase();
    let filteredPokemon = originalPokemonListDetails;
    if (type && type !== "All") {
      filteredPokemon = filteredPokemon?.filter((pokemon) => {
        return pokemon?.types?.some(
          (t) => t?.type?.name === type?.toLowerCase()
        );
      });
    }
    if (query) {
      filteredPokemon = filteredPokemon?.filter((pokemon) => {
        return pokemon?.name?.toLowerCase()?.includes(query);
      });
    }
    setDetails(filteredPokemon);
  };
  const handleFilterChange = (filterKey, value) => {
    setFilter({ [filterKey]: value });
  };
  // search pokemons
  const searchPokemon = async (query) => {
    if (!query) {
      setSearchQuery("");
      setDetails(originalPokemonListDetails);
      return;
    }
    const filteredPokemon = originalPokemonListDetails.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
    setDetails(filteredPokemon);
  };

  // debounce search
  const debouncedSearch = _.debounce((value) => {
    filterPokemon();
    searchPokemon(value);
  }, 500);

  // handle change for search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchPokemons(`${baseUrl}/pokemon`);
    fetchPokemonTypes();
  }, []);
  useEffect(() => {
    if (pokemons?.length) {
      fetchPokemonDetails();
    }
  }, [pokemons]);
  useEffect(() => {
    filterPokemon();
  }, [filter]);
  return {
    loading,
    fetchMoreLoading,
    fetchPokemons,
    pokemonDetails,
    fetchMore,
    nextPageUrl,
    pokemonTypes,
    handleFilterChange,
    filter,
    searchQuery,
    handleSearchChange,
  };
};

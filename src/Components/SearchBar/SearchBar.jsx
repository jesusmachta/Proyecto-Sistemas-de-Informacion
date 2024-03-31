import React from "react";
import { CiSearch } from "react-icons/ci";
import "./SearchBar.css"

function SearchBar({agrupaciones, setFilteredAgrupaciones}) {
  const handleFilter = (value) => {
    const filteredAgrupaciones = agrupaciones.filter((agrupacion) =>
      agrupacion.nombre.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredAgrupaciones(filteredAgrupaciones);
  };
  return (
    <div className="search_bar_wrapper">
      <CiSearch size={24} color="#F79002" />
      <input
        placeholder="buscar agrupación..."
        className="search_bar"
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;

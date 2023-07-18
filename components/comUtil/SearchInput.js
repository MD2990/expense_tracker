import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { SearchInputField } from "./ComUtil";
import { myFilter } from "../../lib/helpers";

export default function SearchInput({ data }) {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.searchResults = myFilter({
      arr: data,
      searchTerm: state.searchTerm,
    });
  }, [data, snap.searchTerm]);

  const handleChange = (e) => {
    state.searchTerm = e.target.value;
  };

  return (
    <>
      <SearchInputField theValue={snap.searchTerm} onChange={handleChange} />
    </>
  );
}

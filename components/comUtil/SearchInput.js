import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "@components/store";
import { myFilter } from "@lib/helpers";
import { SearchInputField } from "./ComUtil";

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

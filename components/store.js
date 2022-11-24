import { proxy } from "valtio";

const state = proxy({

  paid: undefined,
  searchTerm: "",
  searchResults: [],
  data: [],
  bill: [],
  currentPage: parseInt(0),
  pageCount: null,
  PER_PAGE: 8,
  offset: 0,
  emp: [],
  sal: [],
  emp_id: null,
  
  exp: [],
  empName: [],
  isDeleted: false,
  paidOrNotFiltered: false,
});
export default state;

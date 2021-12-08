import Swal from "sweetalert2";

export function getRandomMinAndMaxNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function addNumbers(a, b, c) {
  if (isNaN(a) || isNaN(b) || isNaN(c)) return 0;
  if (typeof a !== "number" || typeof b !== "number" || c !== "number")
    return 0;

  const sum = parseInt(a) + parseInt(b) + parseInt(c);
  return sum;
}

export const myFilter = ({ arr, searchTerm }) => {
  const results = arr.filter((e) => {
    return Object.keys(e).some((key) =>
      e[key]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toString().toLowerCase())
    );
  });

  return results;
};


export const today = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  //call the function to add the leading zero
  const d = dd < 10 ? "0" + dd : dd;

  const date = yyyy + "-" + mm + "-" + d;
  return date;
};
// get the  inputed date and return the date in the format of yyyy-mm-dd
export const getDate = (theDate) => {
  var today = new Date(theDate);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  //call the function to add the leading zero
  const d = dd < 10 ? "0" + dd : dd;

  const date = yyyy + "-" + mm + "-" + d;
  return theDate;
};


export async function handleFormDelete({
  deleteUrl,
  id,
  handleDelete,
  router,
  secondDelete,
 
}) {
  await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete({ deleteUrl, id });
      
      if (secondDelete) {
        secondDelete();
      }
    router && router.back();
  
  }
  });
}
export const convertToNumber = (str) => {
  return Number(str.replace(/[^0-9.-]+/g, ""));
};

//create a function to save a value in a local storage
export const setItem = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

//retrieve a value from a local storage
export const getItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

// remove a value from a local storage
export const removeItem = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// clear all values from a local storage
export const clearAll = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

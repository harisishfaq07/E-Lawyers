export const logIn = (data ,uid) => {
  return {
    type: "LOGIN",
    payload: data,
    uid : uid
  };
};

export const logOut = () => {
  return {
    type: "LOGOUT",
  };
};

// export const searchResult = (keyword, data, advancefilterData) => {
//   return {
//     type: "SEARCHRESULT",
//     payload: data,
//     keyword: keyword,
//     advancefilterData: advancefilterData,
//   };
// };

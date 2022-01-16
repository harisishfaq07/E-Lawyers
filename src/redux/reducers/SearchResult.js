const initState = {
  searchResultData: "",
  searchKeyword: "",
  advancefilterData: "",
};

const SearchResult = (state = initState, action) => {
  switch (action.type) {
    case "SEARCHRESULT": {
      return {
        ...state,
        searchKeyword: action.keyword,
        advancefilterData: action.advancefilterData,
        searchResultData: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
export default SearchResult;

const initState = {
  IsUserLogIn: false,
  UserData: "",
  userId : ""
};

const UserLogIn = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        IsUserLogIn: true,
        UserData: action.payload,
        userId : action.uid
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        IsUserLogIn: false,
        UserData: "",
        userId : ""
      };
    }
    default:
      return { ...state };
  }
};
export default UserLogIn;

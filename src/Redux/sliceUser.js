const initialState = {
  isLogin: {
    token: '',
  },
  isUser: {
    name: '',
    email: '',
    ava: '',
    role: '',
    phone: '',
    provider: [],
  },
};

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'setToken':
      return {
        ...state,
        isLogin: {
          ...state.isLogin,
          token: action.data,
        },
      };
      break;
    case 'setUser':
      return {
        ...state,
        isUser: action.data,
      };
      break;
    case 'logout':
      return initialState;
      break;
    default:
      return state;
      break;
  }
};

export default Authentication;

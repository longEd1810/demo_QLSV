const initState = {
    user: JSON.parse(localStorage.getItem('user')),
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;

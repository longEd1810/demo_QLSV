export function loginUser(payload) {
    return {
        type: 'USER_LOGIN',
        payload: payload,
    };
}

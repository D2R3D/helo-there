

const initialState = {
    username: '',
    profile_pic: '',
    user: null
  }
  

//action consts
const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

//action builders]

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
         return{...state, user: action.payload}
        default:
            return state; 
    }
};

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
export function logout() {
    return{
        type: LOGOUT
    }
}




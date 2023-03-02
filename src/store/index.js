import {
    createStore
} from 'redux'

import {
    USERLOGIN,
    USERLOGOUT,
    COLLAPSED,
} from '@/store/action/userAction'
let userinfo = localStorage.getItem('userinfo')
try {
    userinfo = JSON.parse(userinfo)
} catch {
    userinfo = null
}
// 初始化state
const initstate = {
    userinfo,
    collapsed: false
}
const reducer = function (state = initstate, action) {
    switch (action.type) {
        case USERLOGIN:
            localStorage.setItem('userinfo', JSON.stringify(action.data))
            return {
                ...state,
                userinfo: action.data
            }
            break;
        case USERLOGOUT:
            localStorage.removeItem('userinfo')
            return {
                ...state,
                userinfo: null
            }
            break;
        case COLLAPSED:
            return {
                ...state,
                collapsed: !state.collapsed
            }
            break;
    }
    return state
}
const store = createStore(reducer)
export default store
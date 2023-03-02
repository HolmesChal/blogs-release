export const USERLOGIN = 'USERLOGIN'
export const USERLOGOUT = 'USERLGOIN'
export const COLLAPSED = 'COLLAPSED'

export function userLogin(userinfo) {
    return {
        type: USERLOGIN,
        data: userinfo
    }
}

export function userLogout() {
    return {
        type: USERLOGOUT
    }
}


export function changeCollapsed() {
    return {
        type: COLLAPSED
    }
}
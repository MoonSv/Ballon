import axios from 'axios'
import { getRedirectPath } from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const DEL_MSG = 'DEL_MSG';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initState = {
    user_id:'',
    code:'',
    redirectTo:'',
    isAuth:false,
    msg:'',
    username:'',
    email:'',
    password:'',
    first_name:'',
    last_name:'',
    phone_number:'',
    address:'',
    gender:''

}
//reducer
export function user(state=initState, action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state, code:1, msg:'Register Success', isAuth:true, redirectTo:'/login'};
        case LOGIN_SUCCESS:
            return {...state, code:1, msg:'登陆成功', isAuth:true, redirectTo:'/home', ...action.payload};
        case UPDATE_USER_SUCCESS:
            return {...state, code:1, msg:'Your profile has been updated', isAuth:true, redirectTo:'/profile', ...action.payload};
        case LOGOUT_SUCCESS:
            return {...state, code: 1, isAuth:false};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, code:0, isAuth:false, msg:action.msg};
        case DEL_MSG:
            return {...state, msg:''};
        default:
            return state
    }
    return state
}

// 这是action creator
function registerSuccess(data) {
    return {type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
}
function logoutSuccess() {
    return {type:LOGOUT_SUCCESS}
}
// function loadData(data) {
//     return {type:LOAD_DATA, payload:data}
// }
function errorMsg(msg) {
    return {type: ERROR_MSG, msg:msg}
}
function updateUserSuccess(data) {
    return {type:UPDATE_USER_SUCCESS, payload:data}
}


// 这是action
export function register({username, email, password}) {
    if(!username||!password) {
        return errorMsg('Please input username/password')
    }
    // if(password!==repeatpassword){
    //     return errorMsg('password not same')
    // }
    return dispatch=>{
        axios.post('/user/usr/register/', {username, email, password}).then(
            res=>{
                if(res.status==200 && res.data.code == 0){
                    dispatch(registerSuccess({username, email, password}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}

export function login({username, password}) {

    return dispatch=>{
        axios.post('/user/usr/login/', {username, password}).then(
            res=>{
                if(res.status==200 && res.data.code==0){

                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
// 更新用户profile(不包括头像)
export function updateUser({first_name,last_name, address, phone_number, gender}) {
    // if(password!==repeatpassword){
    //     return errorMsg('password not same')
    // }
    return dispatch=>{
        axios.post('/user/edit_profile/', {first_name,last_name, address, phone_number, gender}).then(
            res=>{
                if(res.status==200 && res.data.code == 0){
                    dispatch(updateUserSuccess({first_name,last_name, address, phone_number, gender}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
// 用户登出请求后端更改cookie
export function logout() {
    return dispatch=>{
        axios.get('/user/logout/').then(
            res=>{
                if(res.status==200 && res.data.code == 0){
                    dispatch(logoutSuccess())
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}

export function loadData(data) {
    return {type:LOAD_DATA, payload:data}
}
export function delMsg() {
    console.log('正在清除msg...');
    return {type: DEL_MSG}
}

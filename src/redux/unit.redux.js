import axios from 'axios'

const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const USERLIST_SUCCESS = 'USERLIST_SUCCESS';
const FACILITIES_SUCCESS = 'FACILITIES_SUCCESS';
const CITY_SUCCESS = 'CITY_SUCCESS';
const DELETEUNIT_SUCCESS = 'DELETEUNIT_SUCCESS';
const DEL_MSG = 'DEL_MSG';
const SHOWUNIT_SUCCESS = 'SHOWUNIT_SUCCESS';
const DEL_UNITINFO = 'DEL_UNITINFO';
const ADDUNIT_SUCCESS = 'ADDUNIT_SUCCESS';
const EDITUNIT_SUCCESS = 'EDITUNIT_SUCCESS';
const ORDERUNIT_SUCCESS = 'ORDERUNIT_SUCCESS';
const DEL_REDIRECT = 'DEL_REDIRECT';
const PAYORDER_SUCCESS = 'PAYORDER_SUCCESS';
const SHOWORDER_SUCCESS = 'SHOWORDER_SUCCESS';

const initState = {
    unitList: [],
    facilities: [],
    unitFacilities: [],
    cities: [],
    unit_info: [],
    msg:'',
    searchResult:[],
    orderDetail:[],
    isOrdered: false,
    payedOrders: [],
    canceledOrders: []
}
//reducer
export function unit(state=initState, action) {
    switch (action.type){
        case SEARCH_SUCCESS:
            return {...state, redirectTo: '/searchResult', searchResult:action.payload};
        case UPDATE_SUCCESS:
            return {...state, ...action.payload.data};
        case USERLIST_SUCCESS:
            // console.log('前端收到了数据...');
            // console.log(action.payload);
            return {...state, unitList: action.payload.units_list};
        case FACILITIES_SUCCESS:
            return {...state, facilities: action.payload.all_fac};
        case CITY_SUCCESS:
            return {...state, cities: action.payload};
        case DELETEUNIT_SUCCESS:
            return {...state, msg: 'Delete success'};
        case SHOWUNIT_SUCCESS:
            return {...state, unit_info: action.payload.unit_info, unitFacilities: action.payload.facilities};
        case ADDUNIT_SUCCESS:
            return {...state, code:1, msg: 'Add Success'};
        case EDITUNIT_SUCCESS:
            return {...state, code:1, msg: 'Unit information has been updated'};
        case ORDERUNIT_SUCCESS:
            return {...state, orderDetail: action.payload, isOrdered:true};
        case PAYORDER_SUCCESS:
            return {...state, isOrdered: false};
        case SHOWORDER_SUCCESS:
            return {...state, payedOrders: action.payload.payed_orders, canceledOrders: action.payload.canceled_orders};
        case ERROR_MSG:
            return {...state, code:0, isAuth:false, msg:action.msg};
        case DEL_MSG:
            return {...state, msg:''};
        case DEL_UNITINFO:
            console.log('删除unit_info');
            return {...state, unit_info:[]};
        case  DEL_REDIRECT:
            return {...state, redirectTo: ''};
        default:
            return state
    }
    return state
}

function userListSuccess(data){
    console.log('yeah');
    console.log(data);
    return {type:USERLIST_SUCCESS, payload:data}
}
function searchSuccess(data) {
    return {type: SEARCH_SUCCESS, payload:data}
}
function getFacilitiesSuccess(data) {
    return {type: FACILITIES_SUCCESS, payload:data}
}
function getCitiesSuccess(data) {
    return {type: CITY_SUCCESS, payload:data}
}
function deleteUnitSuccess() {
    return {type: DELETEUNIT_SUCCESS}
}
function showUnitSuccess(data) {
    return {type: SHOWUNIT_SUCCESS, payload:data}
}
function addUnitSuccess() {
    return {type: ADDUNIT_SUCCESS}
}
function editUnitSuccess() {
    return {type: EDITUNIT_SUCCESS}
}
function orderUnitSuccess(data) {
    return {type: ORDERUNIT_SUCCESS, payload:data}
}
function payOrderSuccess(data) {
    return {type: PAYORDER_SUCCESS, payload:data}
}
function showOrderSuccess(data) {
    return {type: SHOWORDER_SUCCESS, payload:data}
}


// 这是action creator

function errorMsg(msg) {
    return {type: ERROR_MSG, msg:msg}
}
/*
*       "city":"Eden",
        "check_in": "2018-08-27",
        "check_out": "2018-08-07",
        "capacity": 4,
        "price_low":1,
        "price_high":200,
        "city":"Eden",
        "facilities":["wifi","park","breakfast"],
        "tags":["sunset","beach"]
        -----------------------------------------
        '/user_request/search/'
* */
// 搜素unit， 兼备高级搜索功能
export function test_unit({ city, check_in, check_out, capacity, price_low, price_high, facilities, tags }) {

    return dispatch=>{
        console.log('redux接受到的搜索数据');
        console.log({ city, check_in, check_out, capacity, price_low, price_high, facilities, tags });
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/search_result', { city, check_in, check_out, capacity, price_low, price_high, facilities, tags }).then(
        // axios.post('/user_request/search/', { city, check_in, check_out, capacity, price_low, price_high, facilities, tags }).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    dispatch(searchSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
// 更新搜索信息
export function updateSearchInfo(key, value) {
    return dispatch=>{
        dispatch({type:UPDATE_SUCCESS, payload:{key: value}})
    }
}

// 获取用户unitList
export function getUserUnitList(user_id){
    return dispatch=>{
        // console.log('redux接受到的搜索数据');
        // axios.post('/advertise/show_unit_list/', user_id).then(
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/userUnitList', user_id).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(userListSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function getFacilities(){
    return dispatch=>{
        // console.log('redux接受到的搜索数据');
        axios.get('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/user_request/get_facilities').then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(getFacilitiesSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function getCities(){
    return dispatch=>{
        // console.log('redux接受到的搜索数据');
        axios.get('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/getCities').then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(getCitiesSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function deleteUnit(unit_id){
    return dispatch=>{
        // console.log('redux接受到的搜索数据');
        axios.post('/advertise/delete_unit/', unit_id).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(deleteUnitSuccess())
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function delMsg() {
    console.log('正在清除msg...');
    return {type: DEL_MSG}
}
export function delUnitInfo() {
    console.log('正在清除unit_info...');
    return {type: DEL_UNITINFO}
}
export function showUnit(unit_id){
    return dispatch=>{
        console.log('redux接受到的showUnit数据');
        console.log(unit_id)
        // axios.post('/advertise/show_unit/', unit_id).then(
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/show_unit', unit_id).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(showUnitSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function addUnit({ owner, title, address, city, country, post_code, description, capacity, price, facilities }){
    return dispatch=>{
        console.log('redux接受到的新增unit数据');
        console.log(owner);
        console.log(title);

        // axios.post('/advertise/add_unit/', { title, address, city, country, post_code, description, capacity, price, facilities }).then(
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/show_unit', { owner, title, address, city, country, post_code, description, capacity, price, facilities }).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(addUnitSuccess())
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function updateUnit({ owner, unit_id, title, address, city, country, post_code, description, capacity, price, facilities }){
    return dispatch=>{
        console.log('redux接受到的编辑unit数据');
        console.log(owner);
        console.log(unit_id);
        // axios.post('/advertise/edit_unit/', { owner, unit_id, title, address, city, country, post_code, description, capacity, price, facilities }).then(
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/show_unit', { owner, unit_id, title, address, city, country, post_code, description, capacity, price, facilities }).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(editUnitSuccess())
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function orderUnit({ unit_id, buyer, date_start, date_end, remark, price }){
    return dispatch=>{
        console.log('redux接受到的提交order数据');
        console.log(unit_id);
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/book_unit', { unit_id, buyer, date_start, date_end, remark, price }).then(
        // axios.post('/order/book_unit/', { unit_id, buyer, date_start, date_end, remark }).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(orderUnitSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function clearRedirect() {
    console.log('正在清除redirect...');
    return {type: DEL_REDIRECT}
}
export function payOrder(order_id){
    return dispatch=>{
        console.log('redux接受到的提交PayOrder数据');
        console.log(order_id)
        axios.post('/order/pay_order/', order_id).then(
            // axios.post('/order/book_unit/', { unit_id, buyer, date_start, date_end, remark }).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(payOrderSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
export function showOrders(userId){
    return dispatch=>{
        // console.log('redux接受到的提交PayOrder数据');
        // console.log(userId)
        // axios.post('/order/show_orders/', userId).then(
        axios.post('https://www.easy-mock.com/mock/5b8f897bac9eb84c69d88e4d/comp9900/show_orders', userId).then(
            res=>{
                if(res.status==200 && res.data.code==0){
                    // console.log(res.data.data)
                    dispatch(showOrderSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        )
    }
}
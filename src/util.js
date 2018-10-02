export function getRedirectPath({type, avatar}) {
    // 根据用户信息，返回跳转地址
    // user.type /student /trainer
    // user.avatar /bossinfo /geniusinfo
    // let url = (type=='trainer')?'/trainer':'student';
    // 没头像，就去完善信息
    let url = '/user'
    if (!avatar) {
        url += 'info'
    }
    return url
}
import { RefreshToken } from "./RefreshToken";

const GetTokenInfo = async (users, userHandler) => {

    //console.log("get token info start");

    fetch('https://kapi.kakao.com/v1/user/access_token_info', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${users.kakaoToken}` },
    })
        .then(res => res.json())
        .then(data => {
            if(data.code == -401) {
                RefreshToken(users, userHandler);
            }
        });
}

export { GetTokenInfo };
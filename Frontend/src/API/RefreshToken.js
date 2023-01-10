import { REST_API_KEY } from '../OAuth'
// import { PostUserToken } from '../User/PostUserToken';

const RefreshToken = async (users, userHandler) => {

    console.log("refresh Kakao Token start");

    fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=refresh_token&client_id=${REST_API_KEY}&refresh_token=${users.kakaoRefreshToken}`,
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            userHandler(
                {
                    token:users.token,
                    kakaoToken:data.access_token,
                    kakaoRefreshToken: users.kakaoRefreshToken,
                    id: users.id,
                    name: users.name,
                    profileImg: users.profileImg,
                    email: users.email,
                    age: users.age,
                    gender: users.gender,
                    isFirst: users.isFirst,
                    push: users.push,
                    login: users.login,
                }
            )
            // PostUserToken(users.token, users.kakaoRefreshToken, users, userHandler);
        });

        return true;
}


export { RefreshToken };
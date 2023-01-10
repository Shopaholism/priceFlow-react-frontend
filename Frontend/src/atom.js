import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const emailState = atom({
    key: 'emails',
    default: [],
})

export const userState = atom({
    key: 'userState',
    default: 
        {
            token: '',
            kakaoToken: '',
            kakaoRefreshToken: '',
            id: 0,
            name: '',
            profileImg: '',
            email: '',
            age: '',
            gender: '',
            isFirst: true,
            push: false,
            login: false,
        }
    ,
    effects_UNSTABLE: [persistAtom],
})
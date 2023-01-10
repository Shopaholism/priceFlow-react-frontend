// import MainPage from './components/pages/community/MainPage';
// import MyPage from './components/pages/mypage/MyPage';
// import ManageSurvey from './components/pages/management/ManageSurvey';
// // import ManageSurvey from './components/pages/management/ManageSurveyPage';
// import ViewPostPage from './components/pages/community/ViewPostPage';
// import CreatePostPage from './components/pages/community/CreatePostPage';
// import SelectSurveyPage from './components/pages/community/SelectSurveyPage';
// // import StoreSurveyPage from './components/pages/management/StoreSurveyPage';
import NotFound from './components/common/NotFound';
import { KakaoLogin } from '../src/components/route/KakaoLogin'
import { KakaoLogout } from './components/route/KakaoLogout'
import { userState } from '../src/atom'
import Home from './components/pages/home/Home';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RecoilRoot } from "recoil";
import { MainPage } from '../src/components/route/MainPage'
import {MyPage} from '../src/components/route/MyPage'
import {Portfolio} from '../src/components/route/Portfolio'
// import CreateSurvey, { SurveyShared } from './components/pages/create/CreateSurvey';
// import TemporarySurvey from './components/pages/management/TemporarySurvey';
// import ResultSurvey from './components/pages/result/ResultSurvey';
import React from 'react';
// import RespondentSurvey, { RespondentClose, RespondentComplete, RespondentNotOpen } from './components/pages/create/RespondentSurvey';
import { styled } from '@mui/material/styles';





import Header from './components/common/Header';
import Footer from './components/common/Footer';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CreatePost } from './components/route/CreatePost';
const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflowX: 'hidden',
  minHeight: '100%',
  // paddingTop: APP_BAR_MOBILE + 5,
  // paddingBottom: theme.spacing(3),
  // paddingLeft: theme.spacing(3),
  // paddingRight: theme.spacing(3),
  // [theme.breakpoints.up('lg')]: {
  //   // paddingTop: APP_BAR_DESKTOP + 15,
  // },
}));


function App() {
  const users = useRecoilValue(userState);
  return (
     //<Provider store={store}>
     <>
      
      
      <div className='min-h-screen'>
        <RecoilRoot>
        <BrowserRouter>
        <Header />
                <Routes>
                      {/* <Route path="respondent/:surveyId" element={<RespondentSurvey mode={2}/>} />
                      <Route path="respondent/answer/:surveyId/:submitId" element={<RespondentSurvey mode={3}/>} />
                      <Route path="respondentcomplete" element={<RespondentComplete />} />
                      <Route path="respondentclose" element={<RespondentClose />} />
                      <Route path="respondentnotopen" element={<RespondentNotOpen />} /> */}
                      <Route path="/" element={<MainPage />} />
                      <Route path="/main" element={<MainPage />} />
                      <Route path="/kakaologin" element={<KakaoLogin />} />
                      <Route path="/kakaologout" element={<KakaoLogout />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/mypage" element={<MyPage />} />
                      <Route path="/portfolio" element = {<Portfolio/>}/>
                      <Route path="/createPost" element= {<CreatePost/>}/>
                      {/* <Route path="community" element={<MainPage />} />
                      <Route path="mypage" element={<MyPage />} />
                      <Route path="post/:postId" element={<ViewPostPage />} />
                      <Route path="selectSurvey" element={<SelectSurveyPage />} />
                      <Route path="post/createPost/:surveyId" element={<CreatePostPage />} />
                      <Route path="manage" element={<ManageSurvey />} />
                      <Route path="temporary" element={<TemporarySurvey />}/>
                      <Route path="survey" element={<CreateSurvey />} />
                      <Route path="survey/:surveyId" element={<CreateSurvey load={"yes"}/>} />
                      <Route path="survey" element={<CreateSurvey />} />
                      <Route path="comfysurvey" element={<CreateSurveyTemplates />} />
                      <Route path="surveyshared" element={<SurveyShared />} />
                      <Route path="/resultSurvey/:surveyId" element={<ResultSurvey />}/>
                      <Route path="/manage/survey/:surveyId" element={<RespondentSurvey mode={0}/>} /> */}
                      {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                      <Route path="*" element={<NotFound />}></Route>
                  </Routes>
            
        </BrowserRouter>
        </RecoilRoot>
      </div>
      <Footer />
     </>
  );
}

export default App;

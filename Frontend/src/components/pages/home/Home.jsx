import { KAKAO_AUTH_URL } from '../../../OAuth'
import { Button, Modal } from 'react-bootstrap';
import { userState } from '../../../atom';
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
export default function Home() {

  const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};
  let navigate = useNavigate();
  const [nonUser, setNonUser] = useState(false);
  const users = useRecoilValue(userState);
  
  return (

    
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
      {/* hero content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter pr-1tracking-tighter mb-4" data-aos="zoom-y-out"> 편안한 설문조사 서비스 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> COMFY  </span></h1> 
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150"> COMFY에서 설문지를 제작하고 관리하고 다른 사람들에게 공유할 수 있습니다.</p>
             <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
              
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}
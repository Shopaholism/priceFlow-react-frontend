import { Button } from 'react-bootstrap';
import Fade from "react-reveal/Fade"; // Import reasct-reveal(Fade)
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from "styled-components";
import category from '../../promo_category.png';
import mobile from '../../promo_mobile.png';
import multi from '../../promo_multi.png';
import main from '../../promo_main.png';
import preview from '../../promo_preview.png';
import share from '../../promo_share.png';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';


const IntroBlock = styled.div`
  margin: 0px 0px 300px 0px;
  text-align : center;  
  
  h1 {
	margin: 10px;
	text-align : center;
    font-weight: 330;
    font-size: 45px;
  }  

  h2 {
    margin: 10px;
	margin-top: 200px;
	text-align : center;
    font-weight: 300;
    font-size: 50px;
  }

  h3 {
	text-align : center;
    font-weight: 200;
    font-size: 25px;
  }

  h6 {
	text-align : center;
    font-weight: 200;
    font-size: 70px;
  }

  img {
	// display: block;
	margin-left: 10%;
	margin-right: 10%;
	// margin-bottom: 80px;
	height: 80%;
	width: 80%;

  }

  @media (max-width: 768px) {
	margin: 0px 0px 100px 0px;
  
	main {
		margin-left: 20px;
		margin-right: 20px;		
		text-align : center;
		font-weight: 400;
		font-size: 60px;
	  }
	 
	sub-main {
		margin-left: 10px;
		margin-right: 10px;
		text-align : center;
		font-weight: 370;
		font-size: 30px;
	  }
	  
	h1 {
	  margin: 10;
	  margin-right: 20px;
	  margin-left: 20px;
	  text-align : center;
	  font-weight: 330;
	  font-size: 30px;
	}  
  
	h2 {
	  margin-top: 150px;
	  margin-right: 20px;
	  margin-left: 20px;
	  text-align : center;
	  font-weight: 300;
	  font-size: 25px;
	}
  
	h3 {
	  text-align : center;
	  margin-right: 20px;
	  margin-left: 20px;
	  font-weight: 200;
	  font-size: 15px;
	}
  
	h6 {
		text-align : center;
		font-weight: 200;
		font-size: 35px;
	}


	img {
	  height: 90%;
	  width: 90%;
	  margin-left: 5%;
	  margin-right: 5%;
	}

  }
`
function AboutProduct() {

	let navigate = useNavigate();
	// 유저 상태관리

	const users = useRecoilValue(userState);
	const userHandler = useSetRecoilState(userState);

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<div className="body" style={{ marginTop: '30px' }}>
			<div>
				<Fade big>
					<IntroBlock>
					{/* <h2>사용자에게 편의를 주는 솔루션을</h2>
						<h6><strong>헤이폼</strong>이 제안합니다 😎</h6>
						<br/> */}
						<img src={main} style={{width:'85%'}} />

						<br/>
						<div style={{ textAlign: 'center' }}>
							<btn><Button variant='secondary' style={{marginTop:"30px"}}
								size="lg" onClick={users.login ? () => navigate("/create") : handleLogin}>
								로그인 / 시작하기
							</Button></btn>
						</div>
						
					</IntroBlock>

				</Fade>

				<Fade bottom cascade>
					<IntroBlock>
						<h1>
							설문을 <strong>제작하고 <br />
								공유하고 <br />
								결과 분석 조회</strong>까지 한 번에!
						</h1>
						<br />
						<h3>
							헤이폼에서 설문을 제작해보세요.<br />
							설문 공유는 <strong>QR 코드와 URL 링크</strong>를 통해 <br />
							편하게 공유할 수 있습니다. <br />
						</h3>
						<br/>
						<img src={share} style={{width:'60%'}}/>
					</IntroBlock>


					<IntroBlock>
						<h1>
							<strong>설문에 적합한 디자인 제공</strong>
						</h1>
						<br />
						<h3>
							설문 제목을 작성하고 설문 질문을 생성하는 동시에 <br />
							<strong>설문에 맞는 카테고리</strong>를 제공합니다.<br/>
							카테고리에 맞는 디자인으로 설문의 즐거움을 느껴보세요. <br />
						</h3>
						<br></br>
						<img src={category} />
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>설문 미리보기</strong>
						</h1>
						<br />
						<h3>
							설문지가 제작되는 과정이 궁금하신가요? <br />
							설문 제목을 작성하고 설문 질문을 생성하는 동시에 <br />
							설문지를 <strong>실시간으로 확인</strong>할 수 있습니다.
						</h3>
						<br/>
						<img src={preview} style={{width:'60%'}} />
					</IntroBlock>


					{/* <IntroBlock>
						<h1>
							<strong>모바일</strong>
						</h1>
						<br />
						<h3>
							설문지가 제작되는 과정이 궁금하신가요? <br />
							설문 제목을 작성하고 설문 질문을 생성하는 동시에 <br />
							설문지를 실시간으로 확인할 수 있습니다.
						</h3>
						<br></br>
						<img src={mobile} />
					</IntroBlock>
 */}


					<IntroBlock>
						<h1>
							<strong>다양한 기기 지원</strong>
						</h1>
						<br />
						<h3>
							<strong>PC, 태블릿, 모바일</strong> <br />
							사용자의 화면 크기에 맞는 디자인을 제공합니다. <br />
							다양한 기기로 헤이폼의 설문 서비스를 이용해보세요.
						</h3>
						<br></br>
						<img src={multi} />
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>카카오 계정 로그인</strong>
						</h1>
						<br />
						<h3>
							설문 응답하려는데 회원가입까지 해야한다고요? <br />
							헤이폼은 <strong>회원가입 절차가 필요없습니다.</strong> <br />
							카카오 계정으로 로그인 후 바로 서비스를 이용하세요.
						</h3>
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>설문 결과 자동 분석</strong>
						</h1>
						<br />
						<h3>
							설문 결과를 취합하고 분석하는데 <br></br>많은 시간을 소비하시나요? <br /><br/>
							헤이폼은 제출된 설문 응답을 <strong><br></br>자동으로 취합하고 분석</strong>합니다. <br /><br/>
							결과 보고서는 문항별 특화된 방식으로 분석합니다. <br />
							<strong>응답자의 성별 및 연령대</strong> 또한 확인이 가능합니다.
						</h3>
					</IntroBlock>
				</Fade>

				<IntroBlock>
					<Fade bottom>
						<h1>
							<strong>AI 기반 솔루션</strong>
						</h1>
						<br />
						<h3>
							수많은 설문조사의 <strong>데이터</strong>를 기반으로 <br />
							사용자에게 <strong>편리함</strong>과 <strong>신뢰성</strong>을 제공합니다. <br /><br/>
							설문 제작 시 발생하는 고민을 줄여주고, <br />
							설문지를 한 눈에 파악할 수 있도록 도와줍니다. <br />
						</h3>
						<br />
						{/* <br />
					<Fade left>
						<img src="promotion1.png" align="left" />
					</Fade>

					<br />
					<Fade right>
						<img src="promotion2.png" align="right" />
					</Fade> */}
					</Fade>
				</IntroBlock>
			</div >
		</div >
	)
}

export { AboutProduct };

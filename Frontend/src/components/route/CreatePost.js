import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Modal, Nav, Row } from 'react-bootstrap';
// import { Helmet } from 'react-helmet';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { DateRangeSelector } from '../route/DateRangeSelector';
import { userState } from '../../atom';
// import { DropdownCmpt } from '../components/DropdownCmpt.js';
// import { Preview } from '../components/Survey/Preview.js';

// @css
import './CreatePost.css';
// @mui
// import { styled } from '@mui/material/styles';

// const Main = styled('div')(({ theme }) => ({
// 	paddingLeft: theme.spacing(2),
// 	paddingRight: theme.spacing(2),
// 	paddingBottom: theme.spacing(3),
//    // paddingRight: theme.spacing(3),
//    [theme.breakpoints.up('lg')]: {
//       paddingLeft: theme.spacing(6),
//       paddingRight: theme.spacing(6),
//    },
// }));

const Main = styled.div`
  paddingLeft: 10px;
  paddingRight: 10px;
  paddingBottom: 10px;
`

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0.0.0.0);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: rgba(0.0.0.0);
  }
  display: none;
`;

const ItemBlock = styled.div`

  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
	background-color: #535353;
    ${Remove} {
      display: initial;
    }
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 18px;
  color: white;
  margin-bottom: 1%;
  margin-left: 15px;
  ${(props) =>
		props.done &&
		css`
      color: #ced4da;
    `}
`;

function CreatePost() {

	const childRef = useRef();
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}, []));

	let [savedQsList, setSavedQsList] = useState([]);
	let [curQs, setCurQs] = useState('');
	let [curQsItemList, setCurQsItemList] = useState([]);
	let [curSelectedType, setCurSelectedType] = useState('Type');
	let [makeQsSwitch, setMakeQsSwitch] = useState(false);
	let [qsType, setQsType] = useState('');
	let [survey, setSurvey] = useState([]);
	let [viewSwitch, setViewSwitch] = useState('create');
	const [shareWay, setShareWay] = useState('null');
	let count = window.localStorage.getItem("count");

	//post에 사용
	let [surveyTitle, setSurveyTitle] = useState(null);
	let [surveyDescription, setSurveyDescription] = useState(null);
	let [surveyId, setSurveyId] = useState(0);
	let surveyState = useRef(-1);
	window.localStorage.setItem("count", 1);

	//저장시 모달 보여주기에서 사용
	const [show, setShow] = useState(false);
	const [showCreate, setShowCreate] = useState(false);

	let navigate = useNavigate();

	// handleSurveySaveButton, handleSurveyCreateButton에서 사용 즉, PostSurvey, UpdateSurvey API에서 사용함
	let surveyJson = new Object();
	let surveyDto = new Object();

	// surveyDto
	surveyDto.survey_state = null;
	surveyDto.end_time = '12:12:12 12:12:00';
	surveyDto.end_time = '12:12:12 12:12:00';
	surveyDto.category = null;
	surveyDto.description = null;
	surveyDto.survey_title = null;

	// surveyDto.survey_id = null;
	// surveyDto.survey_url = null;

	let questionDtos = new Array();
	let choiceDtos = new Array();
	let choiceDtos2 = new Array();

	// const link = useRecoilValue(linkState);
	const [link, setLink] = useState("");

	const myRef = useRef({});
	const users = useRecoilValue(userState);

	// //질문 등록 버튼
	// const [plusButton, setPlusButton] = useState("+");

	// const setPlusBtn = () => {
	// 	if (plusButton === "+") {
	// 		setPlusButton("질문 등록");
	// 	}
	// 	else if (plusButton === "질문 등록") {
	// 		myRef.current.createQuestion();
	// 		setPlusButton("+");
	// 	}
	// }

	useEffect(() => {
		if (!users.login) {
			window.location.href = KAKAO_AUTH_URL;
		}
	}, [])

	useEffect(() => {
		setCurQs('');
		setCurQsItemList([]);
	}, [curSelectedType, makeQsSwitch, showCreate])

	//체크박스 하나만 선택
	const checkOnlyOne = (checkThis) => {
		const checkboxes = document.getElementsByName('shareWay')
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== checkThis) {
				checkboxes[i].checked = false
			}
		}
	}

	//체크박스 체크 여부 확인
	//체크여부에 따라서 setShareWay()
	function is_checked() {

		const linkCheckbox = document.getElementById('linkCheckBox');
		const qrCheckBox = document.getElementById('qrCheckBox');

		// const link_checked = linkCheckbox.checked;
		const link_checked = true;
		const qr_checked = qrCheckBox.checked;

		if (qr_checked == true) {
			setShareWay("QR");
		} else {
			setShareWay("writer");
		}
		// else {
		// 	setShareWay("null");
		// }
	}

	//공유 시간 및 날짜
	//렌더링되는 시점의 날짜 및 시간 가져오기
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let nextMonth = ('0' + (today.getMonth() + 2)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);
	let hours = ('0' + today.getHours()).slice(-2);
	let minutes = ('0' + today.getMinutes()).slice(-2);
	let seconds = ('0' + today.getSeconds()).slice(-2);

	let dateString = year + '-' + month + '-' + day;
	let timeString = hours + ':' + minutes;
	let nextDateString = year + '-' + nextMonth + '-' + day;
	let current_time_temp = dateString + ' ' + timeString + ':' + seconds;

	// 설문 공유때 사용되는 시작 시간 및 종료 시간
	// start_time: 배포 시작 날짜 및 시간, 예시 "2022-12-11 12:00:00"
	let start_time_temp = dateString + ' ' + timeString + ':00';
	// 배포 마감 날짜 및 시간
	let end_time_temp = nextDateString + ' ' + timeString + ':00';

	const [startDate, setStartDate] = useState(dateString);
	const [startTime, setStartTime] = useState(timeString);
	const [endDate, setEndDate] = useState(nextDateString);
	const [endTime, setEndTime] = useState(timeString);

	const [RecommendCategory, setRecommendCategory] = useState('');
	const [RecommendMent, setRecommendMent] = useState('');
	const [isRecommended, setIsRecommended] = useState(false);
	const [cate, setCate] = useState("");

	

	

	// 설문 저장하기 버튼을 누를 때
	function handleSurveySaveButton() {
		// setShow(true);
		setViewSwitch('공유');
	}

	// 설문 제작 완료 버튼을 누를때 (공유탭))
	function handleSurveyCreateButton() {

		surveyDto.survey_state = null;
		surveyDto.start_time = null;
		surveyDto.end_time = null;
		surveyDto.description = surveyDescription;
		surveyDto.survey_title = surveyTitle;

		start_time_temp = startDate + ' ' + startTime + ':00'
		end_time_temp = endDate + ' ' + endTime + ':00';

		surveyDto.start_time = start_time_temp;
		console.log('프로젝트 시작시간', surveyDto.start_time);
		surveyDto.end_time = end_time_temp;
		console.log()
		// 아래의 세가지 변수는 설문 state 판별을 위한 조건문에 사용
		// 0: 진행중 1: 배포전 2: 종료
		let start_time = new Date(start_time_temp);
		let end_time = new Date(end_time_temp);
		let current_time = new Date(current_time_temp);

		// console.log('현재', surveyState.current);
	}

	return (
		<>
			<Nav justify variant="tabs" defaultActiveKey="create" onSelect={(e) => setViewSwitch(e)}>
				<Nav.Item className="center">
					<Nav.Link eventKey="share">프로젝트 기간 설정</Nav.Link>
				</Nav.Item>
			</Nav>


					<>
						<div className="config-area" style={{ width: "100%", minHeight:'120vh', backgroundColor: "#F8F8FD", display: "flex", justifyContent: "center" }}>

							<div style={{ margin: "auto", marginTop: "50px", marginBottom: "10px" }}>
								<h6 style={{ fontWeight: "bold" }}>날짜를 드래그하거나 클릭하세요! 😉</h6>
								<div className="text-center p-4" >
									<DateRangeSelector startDateHandler={setStartDate} endDateHandler={setEndDate} startTimeHandler={setStartTime} endTimeHandler={setEndTime}/>
									{/* <div style={{ marginTop: '10px' }}>
										<input className="form-check-input" id="qrCheckBox" name="shareWay" type="checkbox" value="" onChange={(e) => {
											checkOnlyOne(e.target)
											is_checked()
										}} /> QR코드 생성하기
									</div> */}
									<div>
									<Button variant="secondary" className="center"
										style={{ marginTop: '10px' }}
										onClick={() => {
											handleSurveyCreateButton()
										}}>게시글 게시</Button></div>
								</div>
							</div>
						</div>

					

						
					</>
			
			{/* <PostSurvey ref={childRef} setLink={setLink} surveyJson={surveyJson} /> */}
		</>
	)
}

export { CreatePost };


import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { DropdownCmpt } from '../DropdownCmpt';
import Likertchart from './Likertchart';
import Slider from './Slider';
import Star from './Star';
import './WriteSurvey.css';

let isEnter = false;

const WriteSurvey = forwardRef((props, ref) => {
	let surveyTypeList = ["단답식", "객관식", "별점", "리커트", "감정바"];
	let [selectedType, setSelectedType] = useState(props.type);
	let [qsItemList, setQsItemList] = useState([]);
	let [qs, setQs] = useState('');
	let frm, arr;

	// console.log(props.type);

	useEffect(() => {
		// setQsItemList([]);
		setSelectedType(props.type);
		props.setCurSelectedType(selectedType);
		frm = document.getElementsByName("enter-event");
		arr = Array.prototype.slice.call(frm);
		
		if(isEnter==true) {
			for (var i = 0; i < frm.length; i++) {
				// console.log(i, frm[i]);
				isEnter=false;
				frm[i].focus();
			}
		}
		
		console.log("isEnter", isEnter);

		
	}, [props])

	useEffect(() => {
		setQs('')
		setQsItemList([]);
		props.setCurSelectedType(selectedType);
	}, [selectedType])

	useImperativeHandle(ref, () => ({
		createQuestion
	}));

	async function createQuestion() {
		if (qs != '') {
			let copy = [...props.savedQsList];
			copy.push({ type: selectedType, qs: qs, qsItemList: qsItemList })
			props.setSavedQsList(copy);
			setSelectedType('Type');
			props.setMakeQsSwitch(false);
		}
	}

	const onKeyPress = (e) => {

		// console.log(formControl);

		// var frm = document.getElementsByName("enter-event");
		// console.log("두번째", document.getElementById(2));
		// console.log(frm);
		// var arr = Array.prototype.slice.call(frm);
		// console.log(arr);

		if (e.key == 'Enter') {
			isEnter=true;
			console.log("isEnter", isEnter)

			let copy = [...qsItemList, ''];
			setQsItemList(copy);
			props.setCurQsItemList(copy);
			arr.map((idx, value) => {
				// console.log("idx", idx);
			})
		}

	}

	function CheckEnter(frm) {
		for (var i = 0; i < frm.length; i++) {
			// console.log(i, frm[i]);
			frm[i].focus();
		}
	}


	return (
		<div style={{ paddingTop: "5%" }}>

			{/* <DropdownCmpt list={surveyTypeList} title={selectedType}
				style={{ paddingBottom: "1%" }} setSelected={setSelectedType} defaultTitle="Type" /> */}
			{
				{
					"단답식":
						<Form.Control className='question-title' type="text" placeholder="질문을 입력해주세요." style={{ height: "5%"}}
							onChange={(e) => { setQs(e.target.value); props.setCurQs(e.target.value); }} />,
					"객관식":
						<>
							<Form.Control className='question-title' key={"key"} id={0} type="text" placeholder="질문을 입력해주세요." style={{ height: "5%" }} onKeyPress={onKeyPress}
								onChange={(e) => { setQs(e.target.value); props.setCurQs(e.target.value); }} />
							<div className='enter-text' style={{ color: "white" }}>* 문항을 추가하고 싶다면 Enter를 눌러주세요!</div>
							{/* <Button siz3="sm" style={{ marginTop: "2%", marginBottom: "2%" }} size="sm" onClick={() => {
								let copy = [...qsItemList, ''];
								setQsItemList(copy);
								props.setCurQsItemList(copy);
							}
							}> 문항추가 </Button> */}
							{
								qsItemList.map((choice, idx) => {

									return (

										<div style={{ width: "80%", margin: "auto", marginTop: "5%" }} className="input-group mb-3">
											<span className="input-group-text">#</span>
											<input className="choice-text form-control" key={idx} id={idx + 1} name="enter-event" type="text" placeholder="문항을 입력해주세요." aria-describedby="button-addon2"
												style={{ background: "rgba(0,0,0,0)", color: "white", border: "none", boxShadow: "none" }}
												onChange={(e) => {
													console.log(idx + 1);
													let copy = [...qsItemList];
													copy[idx] = e.target.value;
													setQsItemList(copy);
													props.setCurQsItemList(copy);
												}}
												onKeyPress={onKeyPress}
												
												value={choice} />
											<button className="btn btn-outline-secondary" type="button" id="button-addon2"
												style={{ background: "rgba(0,0,0,0)", border: "none", boxShadow: "none" }}
												onClick={() => {
													let copy = [...qsItemList];
													copy.splice(idx, 1);
													setQsItemList(copy);
													props.setCurQsItemList(copy);
												}}
											><MdDelete style={{ width:'20px', height:'20px', marginRight:'20px'}} /></button>
										</div>
									)
								})
							}
						</>,
					"별점": <>
						<Form.Control className='question-title' type="text" placeholder="질문을 입력해주세요." style={{ height: "5%" }}
							onChange={(e) => { setQs(e.target.value); props.setCurQs(e.target.value); }} />
						<Star value={"0"} /></>,
					"리커트": <>
						<Form.Control className='question-title' type="text" placeholder="질문을 입력해주세요." style={{ height: "5%", marginBottom:'10px'}}
							onChange={(e) => { setQs(e.target.value); props.setCurQs(e.target.value); }} />
						<div style={{marginLeft:'4%', marginRight:'1%'}}><Likertchart value={'0'} back='black' /></div></>,
					"감정바": <>
						<Form.Control className='question-title' type="text" placeholder="질문을 입력해주세요." style={{ height: "5%" }}
							onChange={(e) => { setQs(e.target.value); props.setCurQs(e.target.value); }} />
						<div style={{ marginTop:'10px', marginLeft:"8%", marginRight:"10%", width: "80%" }}>
							<Slider value={'0'} category={props.category} />
						</div>
					</>

				}[selectedType]
			}
			{
				<div className='register'>
					<Button className='register-btn'
						onClick={() => {
							if (qs != '') {
								let copy = [...props.savedQsList];
								copy.push({ type: selectedType, qs: qs, qsItemList: qsItemList })
								props.setSavedQsList(copy);
								setSelectedType('Type');
								props.setMakeQsSwitch(false);
							}
						}}>질문 등록</Button>
				</div>
			}
			<br />
		</div>
	)
});

export { WriteSurvey };


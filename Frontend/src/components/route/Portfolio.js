// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import Carousel from 'react-bootstrap/Carousel'
// components
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./Portfolio.css";
import { sizeWidth } from '@mui/system';
import { upload } from '@testing-library/user-event/dist/upload';
// @mui


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: theme.customShadows,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    // minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------
function Portfolio() {

    const [show, setShow] = useState(false);
    const users = useRecoilValue(userState);

    let navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');
    let history = useNavigate(); 
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const [tag, setTag] = useState([]);
    const [comment,setComment] = useState();
    var images = []
    var filename = "";
    const handleChangeFile = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for(var i=0;i<event.target.files.length;i++){
    if (event.target.files[i]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
      // 파일 상태 업데이트
      reader.onloadend = () => {
        // 2. 읽기가 완료되면 아래코드가 실행됩니다.
        const base64 = reader.result;
        
        if (base64) {
            console.log(base64)
        //  images.push(base64.toString())
        var base64Sub = base64.toString()
           
        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
        //  setImgBase64(newObj);
          // 파일 base64 상태 업데이트
        //  console.log(images)
        }
      }
    }
  }

  }
  const resetTag  = () => {
    document.getElementById('innerinput').value = '';
  }
  useEffect(resetTag, [tag])

  const setTags = (e) => {
    if(e.key == ' ' || e.key == 'Enter'){
      if(document.getElementById('innerinput').value != ''){
        setTag(tag => [...tag, e.target.value]);
      }else{
        alert("태그를 입력해주세요")
        return false;
      }
     
     
    }
  }
  const deleteTag = (index) => {
    var array = [...tag];
    array.splice(index, 1);
    setTag(array)
  }

  const setComments = (e) => {
    setComment(e.target.value)
  }

  const WriteBoard = async()=> {
    if(imgFile == null){
      alert("이미지를 등록 해주세요");
      return false;
    }
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));
  
    fd.append(
      "tag",
    tag
    );
    fd.append(
      "comment",
      comment
    );

    const fd2 = new FormData();
//     await axios.post('http://localhost:8080/board/WriteBoard.do', fd, {
//   headers: {
//     "Content-Type": `multipart/form-data; `,
//   }
// })
// .then((response) => {
//    if(response.data){
//     history.push("/MainBoard");
//   }
// })
// .catch((error) => {
//   // 예외 처리
// })
  } 
    useEffect(() => {
        if (!users.login) {
            window.location.href = KAKAO_AUTH_URL;
        }

    }, [])

    return (
        <>

            <StyledRoot>
                {/* <img src={logo}
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                /> */}

                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}님
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 50, marginRight: 100}}>
                            안녕하세요. <strong>{users.name}</strong>님
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            포트폴리오 작성란 🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={users.email} inputProps={{ }} />
                            <TextField label="성별" defaultValue={users.gender} inputProps={{ }} />
                            <TextField label="연령대" defaultValue={users.age} inputProps={{ }} />
                            <TextField label="학교" defaultValue={""} inputProps={{ }} />
                            <TextField label="기술 스택" defaultValue={""} inputProps={{ }} />
                        </Stack>

                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">알림 수신</Typography>
                            <Checkbox name="push" />
                        </Stack> */}

                        
                    </StyledContent>
                </Container>
            </StyledRoot>
            <div class="FlexRow_c">
      <div class="FlexCol_c">
        <input type="file" id="file" style={{display:'none'}} onChange={handleChangeFile} multiple="multiple" />
        <label for="file" class="FlexCol_c" style={{border:'2px solid black',width:'700px',height:'300px',marginTop:'100px',fontSize:'40px'}}><strong>FILE UPLOAD</strong></label>
        <div  class="outer-input FlexRow_ac" style={{minHeight:'70px',width:'700px',padding:'0px',textAlign:'left',overflow:'auto'}}>
        <input class="innerinput" id="innerinput" style={{border:'0px',height:'30px',width:'120px',paddingLeft:'12px'}} placeholder="#tag" onKeyPress={setTags}></input>
          {tag.map(((item,index) => {
              return (<span><span class='tag'>{item}</span><Button onClick={() => deleteTag(index)} class="delete"  style={{color:"red",fontSize:"20px"}}/></span>)
          }))}
        </div>
        
      </div>
      <div class="borderBox" style={{width:'700px', height:"560px",marginTop:'100px',marginLeft:'60px',border:'2px solid black'}}>
      <Carousel interval={null}>
      {imgBase64.map((item) => {
       return(
        <Carousel.Item>
            <h2>{filename}</h2>
       
      </Carousel.Item>
       )
      }) }
</Carousel>
      </div>
      </div>
            <TextField style ={{marginLeft: 250, width: 1200}} label="하고 싶은 말" defaultValue={""} inputProps={{ }} />

            {/* <Modal show={show} onHide={() => { setShow(false) }}  >
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <h3>로그아웃 하시겠습니까? 😢<br /></h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false); navigate('/kakaologout') }}>확인</Button>
                    <Button variant="light" onClick={() => { setShow(false) }}>취소</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export { Portfolio };


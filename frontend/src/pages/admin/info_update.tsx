import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React  from 'react';
import '../../App.css';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;  // 5MB

const Info_Update: React.FC = () => {
    const navigate = useNavigate();


    const [companyName, setNameValue] = React.useState('');
    const nameChange = (newValue: string) => {
        setNameValue(newValue);
    };

    const [companyUrl, setUrlValue] = React.useState('');
    const urlChange = (newValue: string) => {
        setUrlValue(newValue);
    };

    const [companyInfo, setInfoValue] = React.useState('');
    const infoChange = (newValue: string) => {
        setInfoValue(newValue);
    };

    const [companySales, setSalesValue] = React.useState('');
    const salesChange = (newValue: string) => {
        setSalesValue(newValue);
    };
    const [companyPay, setPayValue] = React.useState('');
    const payChange = (newValue: string) => {
        setPayValue(newValue);
    };
    const [companyResign, setResignValue] = React.useState('');
    const resignChange = (newValue: string) => {
        setResignValue(newValue);
    };

    const [companyCeo, setCeoValue] = React.useState('');
    const ceoChange = (newValue: string) => {
        setCeoValue(newValue);
    };

    const [companyAdr, setAdrValue] = React.useState('');
    const adrChange = (newValue: string) => {
        setAdrValue(newValue);
    };

    const [companyContent, setContentValue] = React.useState('');
    const contentChange = (newValue: string) => {
        setContentValue(newValue);
    };

    const [file, setFile] = React.useState<File>();
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    }, [file]);
    
    const removeFileName = (originalFileName:string):string => {
        const lastIndex = originalFileName.lastIndexOf(".");
      
        if(lastIndex < 0) {
          return "";
        }

        return originalFileName.substring(lastIndex+1).toLowerCase();
    }

    const fileExtensionValid = ({name} : {name : string}):boolean =>{
        // 파일 확장자
        const extension = removeFileName(name);

        if(!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === '') {
          return false;
        }
        return true;
    }

    const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const files = (target.files as FileList)[0];
    
        if(files === undefined) {
          return ;
        }
    
        if(!fileExtensionValid(files)) {
          target.value = '';
          alert(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`)
          return;
        }
    
        if(files.size > FILE_SIZE_MAX_LIMIT) {
          target.value = '';
          alert('업로드 가능한 최대 용량은 5MB입니다. ')
          return;
        }
    
        setFile(files);
    };

    const complete = (event: React.MouseEvent) => {
        const companyData = new Map<string, string>();
        companyData.set('companyName', companyName);
        companyData.set('companyUrl', companyUrl);
        companyData.set('companyInfo', companyInfo);
        companyData.set('companySales', companySales);
        companyData.set('companyPay', companyPay);
        companyData.set('companyResign', companyResign);
        companyData.set('companyCeo', companyCeo);
        companyData.set('companyAdr', companyAdr);
        companyData.set('companyContent', companyContent);
        companyData.set('companyLogo', imageUrl);

        navigate('/info',  { state: companyData })
    };

    return (
    <div className='writeform'>
        <Box sx={{ display: 'flex',
                   position:'relative', 
                   width:800, 
                   height:780,
                   margin:'auto', 
                   textAlign:'center', 
                   border: 1, 
                   borderRadius: 5, 
                   backgroundColor:'#ffffff', 
                   flexDirection: 'column', 
                   mt:5,
                   px:5
                }}
        >
            <Stack direction='column' marginTop={10} marginBottom={-10} marginLeft={5} >
                <TextField id="company-name" onChange={(newValue) => nameChange(newValue.target.value)} label="기업명" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-url" onChange={(newValue) => urlChange(newValue.target.value)} label="홈페이지주소" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-infomation" onChange={(newValue) => infoChange(newValue.target.value)} label="기업정보" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-sales" onChange={(newValue) => salesChange(newValue.target.value)} label="매출" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-pay" onChange={(newValue) => payChange(newValue.target.value)} label="연봉" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-resign" onChange={(newValue) => resignChange(newValue.target.value)} label="퇴사율" variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-ceo" label="대표" onChange={(newValue) => ceoChange(newValue.target.value)} variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-adress" label="주소" onChange={(newValue) => adrChange(newValue.target.value)} variant="outlined" size="small" sx={{ width:700, }} margin="dense"/>
                <TextField id="company-content" label="기업내용" onChange={(newValue) => contentChange(newValue.target.value)} variant="outlined" size="small" sx={{ width:700, height:200 }} margin="dense"/>
                <Button
                    variant="contained"
                    component="label"
                    sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343', mt:-19, mb:5, maxWidth:700 }}
                    >
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={loadImage}
                    />
                </Button>
                <Button onClick={(event) => complete(event)} variant="contained" component="label" sx={{ color:'#ffff', backgroundColor: '#26a69a', borderColor:'#434343', maxWidth:700}}>
                        수정
                </Button>
            </Stack>
            

        </Box>
    </div>

);
}
export default Info_Update;
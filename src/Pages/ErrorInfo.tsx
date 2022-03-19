import logo from '../Styles/images/logo.png';
import { Link } from 'react-router-dom';

export default function ErrorInfo() {
  return (
    <div className='errorInfo'>
      <img src={logo} alt='logo'></img>
      <p className='errorMsg'>로그인이 필요한 서비스 입니다.</p>
      <button type='button' className='gotoLogin'><Link to='/'>로그인하기</Link></button>
    </div>
  )
}
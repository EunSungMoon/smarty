import logo from '../../Styles/images/logo.png';

export default function Header() {
  return (
    <header id='header'>
      <div className='container headerWrap'>
        <img className='logoImg' src={logo} alt="smarty logo"></img>
        <button type='button' className='logoutBtn'>로그아웃</button>
      </div>
    </header>
  )
}
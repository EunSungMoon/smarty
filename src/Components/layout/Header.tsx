import logo from '../../Styles/images/logo.png';

export default function Header() {

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.location.href = '/'
  }

  return (
    <>
      <header id='header'>
        <div className='container headerWrap'>
          <img className='logoImg' src={logo} alt="smarty logo"></img>
          <button type='button' className='logoutBtn' onClick={handleLogout}>๋ก๊ทธ์์</button>
        </div>
      </header>
    </>
  )
}
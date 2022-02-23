import logo from '../../Styles/images/logo.png';

export default function Header() {
  return (
    <header id='header'>
      <div className='container'>
        <img src={logo} alt="smarty logo"></img>
      </div>
    </header>
  )
}
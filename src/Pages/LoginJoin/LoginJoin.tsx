import logo from '../../Styles/images/logo.png';

export default function LoginJoin() {
  return (
    <div className='container loginWrap'>
      <div className='logoWrap'>
        <img src={logo} alt='logo'></img>
      </div>
      <form>
        <div className='inputWrap'>
          <input
            type='text'
            name='id'
            placeholder='아이디'
            className='inputBox'
          />
        </div>

        <div className='inputWrap'>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            className='inputBox'
          />
        </div>

        <div className='btnWrap'>
          <button className='deepGreen-btn size-btn'>로그인</button>
          <div className='dashline'></div>
          <button className='lightGreen-btn size-btn'>회원가입</button>
        </div>

        {/* <div>
          <div>
            <input
              type='text'
              name='password'
              placeholder='비밀번호 확인'
            />
          </div>
        </div> */}

      </form>

    </div>
  )
}
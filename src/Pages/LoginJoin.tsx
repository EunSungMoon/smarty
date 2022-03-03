import React, { useState } from 'react';
import logo from '../Styles/images/logo.png';
import { useHistory } from 'react-router-dom';
import validate from '../models/validate';

import useJoin from '../Hooks/useJoin';

export default function LoginJoin() {
  const { values, errors, handleChange, handleSubmit } = useJoin({
    initialValues: { username: '', password: '', passwordCheck: '' },
    onSubmit: () => {},
    validate
  })

  const [clicked, setclicked] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');

  const history = useHistory();

  const handlePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  const handleSignUpButton = () => {
    setclicked(!clicked);
  }

  return (
    <div className='loginWrap'>
      <div className='logoWrap'>
        <img src={logo} alt='logo'></img>
      </div>
      <form id={clicked ? 'join' : 'login'} onSubmit={handleSubmit}>
        <div className='inputWrap'>
          <input
            type='text'
            name='username'
            placeholder='아이디'
            className='inputBox'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p className='errorMsg'>{errors.username}</p>}
        </div>

        <div className='inputWrap'>
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            className='inputBox'
            onChange={handleChange}
          />
          {errors.password && <p className='errorMsg'>{errors.password}</p>}
        </div>

        {clicked ?
          <div className='inputWrap' onChange={handlePasswordChk}>
            <input
              type='password'
              name='passwordCheck'
              placeholder='비밀번호 확인'
              className='inputBox'
              onChange={handleChange}
            />
            {errors.passwordCheck && <p className='errorMsg'>{errors.passwordCheck}</p>}
            {noMatchPassword && <p className='errorMsg'>*비밀번호가 일치하지 않습니다.</p>}
            <p className='passwordInfo'>비밀번호는 8개 이상의 영문자/숫자/특수문자를 사용합니다.</p>
          </div>
          : null
        }

        <div className='btnWrap'>
          <button type='submit' className='deepGreen-btn size-btn'>{clicked ? '회원가입' : '로그인'}</button>
          <div className='dashline'></div>
          <button type='button' className='lightGreen-btn size-btn' onClick={handleSignUpButton}>{clicked ? '로그인 화면' : '회원가입'}</button>
        </div>
      </form>
    </div >
  )
}
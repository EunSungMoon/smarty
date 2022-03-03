import React, { useState } from 'react';
import logo from '../Styles/images/logo.png';
import validate from '../models/validate';

import useJoin from '../Hooks/useJoin';
import axios from 'axios';

export default function LoginJoin() {

  const [clicked, setclicked] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [checkID, setCheckID] = useState(false);
  const [test, setTest] = useState(false)


  const { values, errors, handleChange, handleSubmit } = useJoin({
    initialValues: { username: '', password: '', passwordCheck: '' },
    onSubmit: () => { },
    validate
  })

  const handlePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  const handleSignUpButton = () => {
    setclicked(!clicked);
  }

  const handleCheckID = async () => {
    try {
      const loadAxios = await axios.post('http://15.164.62.156:8000/api/uniquecheck/',
        {
          username: values.username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(loadAxios)
      if (loadAxios.status === 200) {
        setCheckID(true)
        setTest(true)
      } else if (loadAxios.status === 400) {
        setTest(false)
      }
    } catch (error) {
      setCheckID(false)
      console.log(error)
    }
  }

  const changeBtnName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== values.username) {
      setCheckID(false)
    }
  }

  return (
    <div className='loginWrap'>
      <div className='logoWrap'>
        <img src={logo} alt='logo'></img>
      </div>
      <form id={clicked ? 'join' : 'login'} onSubmit={handleSubmit}>
        <div className='inputWrap' onChange={changeBtnName}>
          <input
            type='text'
            name='username'
            placeholder='아이디'
            className='inputBox'
            value={values.username}
            onChange={handleChange}
          />

          {clicked ?
            <>
              <button
                type='button'
                onClick={handleCheckID}
                className={checkID ? '' : 'disaled'}
              >
                {checkID ? '확인완료' : '중복확인'}
              </button>
              {
                values.username === '' ?
                  null : (!checkID ? null : test ? <p>사용가능</p> : <p>사용불가</p>)
              }
            </>
            : null
          }
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

        {
          clicked ?
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
          <button
            type='submit'
            className={`deepGreen-btn size-btn ${!clicked || checkID ? '' : 'disaled'}`}
            disabled={!clicked || checkID ? false : true}
          >
            {clicked ? '회원가입' : '로그인'}
          </button>

          <div className='dashline'></div>

          <button
            type='button'
            className='lightGreen-btn size-btn'
            onClick={handleSignUpButton}
          >
            {clicked ? '로그인 화면' : '회원가입'}
          </button>
        </div>
      </form >
    </div >
  )
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import logo from "../Styles/images/logo.png";
import validate from "../models/validate";
import useJoin from "../Hooks/useJoin";

export default function LoginJoin() {
  const [clicked, setclicked] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");

  const {
    values,
    errors,
    errorDisappear,
    checkID,
    loginFail,
    loginFailMsg,
    changeBtnName,
    handleChange,
    handleSubmit,
    handleCheckID,
  } = useJoin({
    initialValues: { username: "", password: "", passwordCheck: "" },
    onSubmit: () => {},
    validate,
  });

  const handlePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoMatchPassword(e.target.value !== values.password);
    setPasswordCheck(e.target.value);
  };

  return (
    <div className="loginWrap">
      <div className="logoWrap">
        <img src={logo} alt="logo"></img>
      </div>
      <form id={clicked ? "join" : "login"} onSubmit={handleSubmit}>
        <div className="inputWrap loginInput">
          <input
            type="text"
            name="username"
            placeholder="아이디"
            className="inputBox"
            value={values.username}
            onChange={handleChange}
          />
          {clicked ? (
            <div
              className={`userCheck ${clicked ? "fadeIn" : ""}`}
              onChange={changeBtnName}
            >
              <button
                type="button"
                onClick={handleCheckID}
                className={`uesrCheckBtn ${
                  checkID && errorDisappear ? "abledBtn" : "disaledBtn"
                }`}
              >
                {checkID && errorDisappear ? "확인완료" : "중복확인"}
              </button>
            </div>
          ) : null}
          {clicked && errorDisappear ? (
            checkID ? (
              <p className="errorMsg-ok">*사용할 수 있는 아이디(ID)입니다.</p>
            ) : (
              <p className="errorMsg-not">*사용할 수 없는 아이디(ID)입니다.</p>
            )
          ) : null}
          {/* {errors.username && <p className='errorMsg-not'>{errors.username}</p>} */}
        </div>

        <div className="inputWrap">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="inputBox"
            onChange={handleChange}
          />
          {clicked && errors.password && (
            <p className="errorMsg-not">{errors.password}</p>
          )}
        </div>

        {clicked ? (
          <div
            className={`inputWrap ${clicked ? "moveDown fadeIn" : ""}`}
            onChange={handlePasswordChk}
          >
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              className="inputBox"
              onChange={handleChange}
            />
            {errors.passwordCheck && (
              <p className="errorMsg-not">{errors.passwordCheck}</p>
            )}
            {noMatchPassword && (
              <p className="errorMsg-not">*비밀번호가 일치하지 않습니다.</p>
            )}
            <p className="passwordInfo">
              비밀번호는 8개 이상의 영문자/숫자/특수문자를 사용합니다.
            </p>
          </div>
        ) : null}
        <div className={`btnWrap ${clicked ? "moveDown" : ""}`}>
          {!clicked && loginFail ? (
            <p className="errorMsg-not">*{loginFailMsg}</p>
          ) : null}
          <button
            type="submit"
            className={`deepGreen-btn size-btn ${
              !clicked ||
              (checkID &&
                errorDisappear &&
                values.passwordCheck &&
                !noMatchPassword)
                ? ""
                : "disaled"
            }`}
            disabled={
              !clicked ||
              (checkID &&
                errorDisappear &&
                values.passwordCheck &&
                !noMatchPassword)
                ? false
                : true
            }
          >
            {clicked ? "회원가입" : "로그인"}
          </button>

          <div className="dashline"></div>

          <button
            type="button"
            className={`lightGreen-btn size-btn ${
              clicked ? "" : "margin-bottom"
            }`}
            onClick={() => setclicked(!clicked)}
          >
            {clicked ? "로그인 화면" : "회원가입"}
          </button>
        </div>
      </form>
    </div>
  );
}

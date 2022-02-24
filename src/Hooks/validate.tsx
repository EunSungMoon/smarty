export default function validate({ email, password, passwordCheck }) {
  const errors = {
    email,
    password,
    passwordCheck
  };

  if (!email) {
    errors.email = '이메일 주소가 입력되지 않았습니다.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '사용할 수 없는 아이디(ID)입니다.'
  }
  if (!password) {
    errors.password = '비밀번호가 입력되지 않았습니다.'
  } else if (password.length < 8) {
    errors.password = '8자 이상의 패스워드를 사용해야 합니다.'
  }
  if (!passwordCheck) {
    errors.passwordCheck = '비밀번호가 입력되지 않았습니다.'
  } else if (passwordCheck.length < 8) {
    errors.passwordCheck = '8자 이상의 패스워드를 사용해야 합니다.'
  }
  return errors;
}
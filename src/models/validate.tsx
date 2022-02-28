export interface validateValues {
  username: string;
  password: string;
  passwordCheck: string;
}

export default function validate({ username, password, passwordCheck }: validateValues) {
  const errors = {
    username,
    password,
    passwordCheck
  };

  if (!username) {
    errors.username = "이메일이 입력되지 않았습니다.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) {
    errors.username = "입력된 이메일이 유효하지 않습니다.";
  }

  if (!password) {
    errors.password = "비밀번호가 입력되지 않았습니다.";
  } else if (password.length < 8) {
    errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
  }

  if (!passwordCheck) {
    errors.passwordCheck = "비밀번호가 입력되지 않았습니다.";
  } else if (passwordCheck.length < 8) {
    errors.passwordCheck = "8자 이상의 패스워드를 사용해야 합니다.";
  }
  return errors;
}
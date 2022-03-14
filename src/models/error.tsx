import { todolistType } from "../Hooks/useSubmit";

export default function validate({ title }: todolistType) {
  let errors = {
    title
  };

  if (title.length === 0) {
    errors.title = "*할일이 입력되지 않았습니다.";
  }
  else {
    errors.title = ''
  }
  return errors;
}
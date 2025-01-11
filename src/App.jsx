import styles from './app.module.css';
import { useState, useRef } from "react";


const sendFormData = (formData) => {
  console.log(formData);
};

const initialState = {
  email: '',
  password: '',
  repeatedPassword: ''
}

export const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
    resetState() {
      setState(initialState);
    }
  };
};

function App() {
  const { getState, updateState } = useStore();
  const [errors, setErrors] = useState(null);
  const submitButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  };
  const { email, password, repeatedPassword } = getState();
  const onChange = ({ target }) => {

    updateState(target.name, target.value);

    let error = null;
    if (target.name === 'email') {
      if (/\S+@\S+\.\S+/ig.test(target.value)) {
        error = null;
      }
    } else if (target.name === 'password') {
      if (target.value.length >= 8) {
        error = null;
      } else if (/^(?=.*[a-z\u0400-\u04FF])(?=.*[\d])[a-zA-Z\u0400-\u04FF\d]*$/ig.test(target.value)) {
        error = null;
      } 
    } else if (target.name === 'repeatedPassword') {
      if (password === target.value) {
        submitButtonRef.current.focus();
      }
    }
    setErrors(error);
  };

  const onBlur = ({ target }) => {
    let error = null;
    if (target.name === 'email') {
      if (target.value.length < 6) {
        error = 'Некорректный email. Минимальная длина должна быть не менее 6 символов';
      }
      else if (!/\S+@\S+\.\S+/ig.test(target.value)) {
        error = 'Некорректный формат email. Допустимый формат: example@domain.com';
      }
    } else if (target.name === 'password') {
      if (target.value.length < 8) {
        error = 'Пароль должен быть не менее 8 символов';
      } else if (!/^(?=.*[a-z\u0400-\u04FF])[a-zA-Z\u0400-\u04FF\d]*$/ig.test(target.value)) {
        error = 'Пароль должен содержать хотя бы одну букву';
      } else if (!/^(?=.*[\d])[a-zA-Z\u0400-\u04FF\d]*$/ig.test(target.value)) {
        error = 'Пароль должен содержать хотя бы одну цифру';
      } else if (repeatedPassword.length > 0 && repeatedPassword !== target.value) {
        error = 'Пароли не совпадают';
      }
    } else if (target.name === 'repeatedPassword') {
      if (target.value.length === 0) {
        error = 'Повторите пароль';
      } else if (password !== target.value) {
        error = 'Пароли не совпадают';
      }
    }
    setErrors(error);
  }


  return (
    <div className={styles.app}>
      <div className={styles.registartion}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={onSubmit} className={styles.form}>

          <input
            type="email"
            name="email"
            id="email"
            className={styles.input}
            placeholder='Email'
            value={email}
            onChange={onChange}
            onBlur={onBlur}
          />
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
            placeholder="Пароль"
            value={password}
            onChange={onChange}
            onBlur={onBlur}
          />
          <input
            type="password"
            name="repeatedPassword"
            id="repeatedPassword"
            className={styles.input}
            placeholder="Повторите пароль"
            value={repeatedPassword}
            onChange={onChange}
            onBlur={onBlur}
          />
          {errors && <div className={styles.errorLabel}>{errors}</div>}
          <button ref={submitButtonRef} type="submit" disabled={errors !== null} className={styles.form__btn}>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default App;

import styles from './app.module.css';
import * as yup from 'yup';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

const fieldsScheme = yup.object().shape({
  email: yup.string()
    .email('Некорректный формат email. Допустимый формат: example@domain.com')
    .min(6, 'Некорректный email. Минимальная длина должна быть 6 символов'),
  password: yup.string()
    .matches(/^(?=.*[a-z\u0400-\u04FF])[a-zA-Z\u0400-\u04FF\d]*$/ig, 'Пароль должен содержать хотя бы одну букву')
    .matches(/^(?=.*[\d])[a-zA-Z\u0400-\u04FF\d]*$/ig, 'Пароль должен содержать хотя бы одну цифру')
    .min(8, 'Пароль должен быть не менее 8 символов'),
  repeatedPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(
    {
      defaltValues: {
        email: '',
        password: '',
        repeatedPassword: '',
      },
      resolver: yupResolver(fieldsScheme),
    }
  )
  const onSubmit = (formData) => {
    console.log(formData);
  }
  let emailErrorText = errors.email?.message;
  let passwordErrorText = errors.password?.message;
  let repeatedPasswordErrorText = errors.repeatedPassword?.message;

  return (
    <div className={styles.app} >
      <div className={styles.registartion}>
        <h1 className={styles.title}>Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <input
            type="email"
            name="email"
            id="email"
            className={styles.input}
            placeholder='Email'
            {...register('email')}
          />
          <input
            type="password"
            name="password"
            id="password"
            className={styles.input}
            placeholder="Пароль"
            {...register('password')}
          />
          <input
            type="password"
            name="repeatedPassword"
            id="repeatedPassword"
            className={styles.input}
            placeholder="Повторите пароль"
            {...register('repeatedPassword')}
          />
          {emailErrorText && <div className={styles.errorLabel}>{emailErrorText}</div>}
          {passwordErrorText && <div className={styles.errorLabel}>{passwordErrorText}</div>}
          {repeatedPasswordErrorText && <div className={styles.errorLabel}>{repeatedPasswordErrorText}</div>}
          <button type="submit" className={styles.form__btn} disabled={!!emailErrorText && !!passwordErrorText && !!repeatedPasswordErrorText}>Зарегистрироваться</button>
        </form>
      </div>
    </div >
  );
}

export default App;

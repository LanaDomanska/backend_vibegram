import * as Yup from "yup";

const usernameOrEmailSchema = Yup.string()
  .required("Введите имя пользователя или email")
  .test(
    "is-email-or-username",
    "Введите корректный email или username",
    function (value) {
      if (!value) return false;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9_.]{3,30}$/.test(value);
      return isEmail || isUsername;
    }
  );

const emailSchema = Yup.string()
  .email("Некорректный адрес электронной почты")
  .required("Email обязателен");

const passwordSchema = Yup.string()
  .min(6, "Пароль должен быть не короче 6 символов")
  .required("Пароль обязателен");

export const registerSchema = Yup.object({
  email: emailSchema,
  username: Yup.string()
    .min(3, "Имя пользователя должно быть не короче 3 символов")
    .max(20, "Слишком длинное имя")
    .matches(/^[a-zA-Z0-9_.]{3,30}$/, "Допустимы только буквы, цифры, _ и .")
    .required("Имя пользователя обязательно"),
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
});

export const loginSchema = Yup.object({
  usernameOrEmail: usernameOrEmailSchema,
  password: passwordSchema,
});

export const resetPasswordSchema = Yup.object({
  email: emailSchema,
});

export const newPasswordSchema = Yup.object({
  token: Yup.string().required("Токен обязателен"),
  newPassword: passwordSchema,
});

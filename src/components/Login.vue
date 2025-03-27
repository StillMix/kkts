<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// Реактивные переменные
const login = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

// Функция для аутентификации
const authenticate = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/login",
      { login: username, password: password },
      { withCredentials: true }
    );

    console.log("Ответ от сервера:", response.data);

    // Если сервер возвращает токен или данные
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      const usersArr = [
        {
          role: response.data.role,
          fullname: response.data.fullname,
          name: response.data.name,
          gmail: response.data.gmail,
          login: response.data.login,
          vk: response.data.vk,
          group: response.data.group,
          id: response.data.id,
        },
      ];

      // Сохраняем в localStorage
      localStorage.setItem("user", JSON.stringify(usersArr));

      if (response.data.access_token) {
        router.push("/hello");
      }
    }
  } catch (error: any) {
    if (error.response) {
      // Сервер ответил, но с ошибкой (например, 401)
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      // Ошибка сети / проблема с сервером
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
};

// Обработчик события входа
const handleLogin = () => {
  authenticate(login.value, password.value);
};
</script>

<template>
  <div class="login">
    <div class="login__logo">
      <img alt="logo" class="login__logo__img" src="../assets/logoB.svg" />
    </div>
    <p class="login__title">ДОБРО ПОЖАЛОВАТЬ!</p>
    <p class="login__subtitle">
      Для использования дневника, войдите в систему!
    </p>
    <form @submit.prevent="handleLogin" class="login__form">
      <label class="login__form__label">
        <p class="login__form__label__title">Логин</p>
        <input
          class="login__form__label__input"
          placeholder="Введите логин"
          type="text"
          v-model="login"
        />
      </label>
      <label class="login__form__label">
        <p class="login__form__label__title">Пароль</p>
        <input
          class="login__form__label__input"
          placeholder="Введите пароль"
          type="password"
          v-model="password"
        />
      </label>
      <button class="login__form__forgetpass" type="button">
        Забыл пароль!?
      </button>
      <button type="submit" class="login__form__btnsub">ВОЙТИ</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logo {
    margin-top: 7.282vw;
    width: 88.835vw;
    height: 5.097vw;
    &__img {
      height: 5.097vw;
      width: 19.417vw;
    }
  }
  &__title {
    font-family: var(--font-family);
    font-weight: 900;
    font-size: 7.282vw;
    color: #2c3b88;
    width: 88.835vw;
    text-align: left;
    margin-top: 4.854vw;
  }
  &__subtitle {
    font-family: var(--font-family);
    font-weight: 500;
    font-size: 4.369vw;
    color: #000;
    opacity: 0.5;
    width: 88.835vw;
    text-align: left;
  }
  &__form {
    width: 88.835vw;
    margin-top: 9.709vw;
    &__label {
      width: 100%;
      display: block;
      &__title {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 4.369vw;
        color: #000;
        opacity: 0.5;
      }
      &__input {
        width: 100%;
        height: 13.835vw;
        border-radius: 48.544vw;
        fill: #fff;
        border: 2px solid #e8e8e8;
        padding-left: 6.311vw;
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 4.369vw;
        color: #2c3b88;
        margin-top: 1.699vw;
      }
      &__input::placeholder {
        color: #000;
        opacity: 0.2;
      }
    }
    &__label:nth-child(2) {
      margin-top: 6.068vw;
    }
    &__forgetpass {
      width: 88.835vw;
      margin-top: 1.699vw;
      font-family: var(--font-family);
      font-weight: 600;
      font-size: 4.369vw;
      text-align: right;
      color: #2c3b88;
    }
    &__check {
      display: flex;
      &__input {
        display: none;
      }
      &__custom {
        display: inline-block;
        width: 4.854vw;
        height: 4.854vw;
        border: 2px solid #2c3b88;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
      }
      &__input:checked + &__custom::before {
        content: "";
        display: block;
        width: 4.854vw;
        height: 4.854vw;
        background-color: #2c3b88;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &__text {
        font-family: var(--font-family);
        font-weight: 500;
        font-size: 4.369vw;
        color: #000;
        opacity: 0.5;
        margin-left: 2.427vw;
      }
    }
    &__btnsub {
      width: 88.835vw;
      border-radius: 48.544vw;
      height: 13.107vw;
      background: #2c3b88;
      margin-top: 5.583vw;
      font-family: var(--font-family);
      font-weight: 900;
      font-size: 4.369vw;
      text-align: center;
      color: #fff;
    }
  }
}
</style>

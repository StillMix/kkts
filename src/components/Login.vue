<script setup>
const handleLogin = (e) => {};
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
        />
      </label>
      <label class="login__form__label">
        <p class="login__form__label__title">Пароль</p>
        <input
          class="login__form__label__input"
          placeholder="Введите пароль"
          type="password"
        />
      </label>
      <button class="login__form__forgetpass" type="button">
        Забыл пароль!?
      </button>
      <label class="login__form__check">
        <input class="login__form__check__input" type="checkbox" />
        <span class="login__form__check__custom"></span>
        <p class="login__form__check__text">Запомнить меня</p>
      </label>
      <button type="submit" class="login__form__btnsub">ВОЙТИ</button>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login__logo {
  margin-top: 7.282vw;
  width: 88.835vw;
  height: 5.097vw;
}
.login__logo__img {
  height: 5.097vw;
  width: 19.417vw;
}

.login__title {
  font-family: var(--second-family);
  font-weight: 900;
  font-size: 7.282vw;
  color: #2c3b88;
  width: 88.835vw;
  text-align: left;
  margin-top: 4.854vw;
}

.login__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.369vw;
  color: #000;
  opacity: 0.5;
  width: 88.835vw;
  text-align: left;
}

.login__form {
  width: 88.835vw;
  margin-top: 9.709vw;
}

.login__form__label {
  width: 100%;
  display: block;
}

.login__form__label:nth-child(2) {
  margin-top: 6.068vw;
}

.login__form__label__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.369vw;
  color: #000;
  opacity: 0.5;
}

.login__form__label__input {
  width: 100%;
  height: 13.835vw;
  border-radius: 48.544vw;
  fill: #fff;
  border: 2px solid #e8e8e8;
  padding-left: 6.311vw;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.369vw;
  color: #2c3b88;
  margin-top: 1.699vw;
}

.login__form__label__input::placeholder {
  color: #000;
  opacity: 0.2;
}

.login__form__forgetpass {
  width: 88.835vw;
  margin-top: 1.699vw;

  font-family: var(--second-family);
  font-weight: 600;
  font-size: 4.369vw;
  text-align: right;
  color: #2c3b88;
}

.login__form__check {
  display: flex;
}

.login__form__check__input {
  display: none;
}

.login__form__check__custom {
  display: inline-block;
  width: 4.854vw;
  height: 4.854vw;
  border: 2px solid #2c3b88;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}

.login__form__check__input:checked + .login__form__check__custom::before {
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

.login__form__check__text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.369vw;
  color: #000;
  opacity: 0.5;
  margin-left: 2.427vw;
}

.login__form__btnsub {
  width: 88.835vw;
  border-radius: 48.544vw;
  height: 13.107vw;
  background: #2c3b88;
  margin-top: 5.583vw;

  font-family: var(--second-family);
  font-weight: 900;
  font-size: 4.369vw;
  text-align: center;
  color: #fff;
}
</style>

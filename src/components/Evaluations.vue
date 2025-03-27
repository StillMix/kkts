<script setup lang="ts">
import { watch, ref, computed } from "vue";
import Menu from "./Menu.vue";
// import { student, StudentGroup, StudentGroupOcenki } from "../initialCards";
import PopupOcenki from "./PopupOcenki.vue";
import axios from "axios";

const isMenuOpen = ref<boolean>(false);
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const currentUser = computed(() => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
});

const role = ref<string>(localStorage.getItem("role") ?? "");
const currentOcen = ref<any>(null);
const currentSubj = ref<any>(null);
const isPopupOcenOpen = ref<boolean>(false);
const errorMessage = ref("");
const subjectOcenk = ref<{ [key: string]: any }>({});

const studentoc = ref<any[]>([]);

const getSubject = async (id: string) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/students/${id}/subjects/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        withCredentials: true,
      }
    );

    if (response.data.message === "Предметы получены") {
      console.log("Ответ от сервера:", response.data.subjects);
      studentoc.value = response.data.subjects;
      // После получения предметов, выполняем запросы для оценок
      await Promise.all(
        studentoc.value.map((subject) => getOcenk(id, subject.id))
      );
    }
  } catch (error: any) {
    if (error.response) {
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
};

const togglePopupOcen = (less: any, ocen: any): void => {
  currentOcen.value = ocen;
  currentSubj.value = less;
  isPopupOcenOpen.value = !isPopupOcenOpen.value;
  if (isPopupOcenOpen.value) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
};

const ocenkinum = ref<number[]>([]);
const srbal = ref<number>(0);

// Функция для вычисления среднего балла
const ocenkiScet = () => {
  ocenkinum.value = [];
  studentoc.value.forEach((oc) => {
    ocenkinum.value.push(parseFloat(oc.srbal));
  });

  const sum = ocenkinum.value.reduce((acc, curr) => acc + curr, 0);
  srbal.value =
    Math.round(
      (ocenkinum.value.length ? sum / ocenkinum.value.length : 0) * 100
    ) / 100;

  console.log("Средний балл:", srbal.value);
};

watch(studentoc, () => {
  if (role.value === "user") {
    ocenkiScet();
  }
});

const classworkteacher = ref<any[]>([]);
const groupforteacher = ref<any[]>([]);
const students = ref<any[]>([]);

const getinfoteacher = async (id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/students/`, {
      withCredentials: true,
    });

    if (response.data.message === "Студенты получены") {
      const studentsList = response.data.users;

      // Группировка студентов по их группе
      const groupedStudents = studentsList.reduce((acc: any, student: any) => {
        const groupName = student.group;

        if (!acc[groupName]) {
          acc[groupName] = {
            group: groupName,
            students: [],
          };
        }

        acc[groupName].students.push(student);
        return acc;
      }, {});

      // Преобразуем объект в массив
      students.value = Object.values(groupedStudents);
    }
  } catch (error: any) {
    if (error.response) {
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/teachers/${id}/group`,
      { withCredentials: true }
    );

    if (response.data.message === "Группы получены") {
      groupforteacher.value = response.data.group;
    }
  } catch (error: any) {
    if (error.response) {
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/teachers/${id}/classwork`,
      { withCredentials: true }
    );
    if (response.data.message === "Классное руководство получены") {
      classworkteacher.value = response.data.classryk;
    }
  } catch (error: any) {
    if (error.response) {
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
};

const getOcenk = async (id: string, idSub: string) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/students/${id}/subjects/${idSub}/ocenki/`,
      { withCredentials: true }
    );
    if (response.data.ocenki) {
      console.log("Ответ от сервера:", response.data.ocenki);
      subjectOcenk.value[idSub] = response.data.ocenki;
    }
  } catch (error: any) {
    if (error.response) {
      errorMessage.value =
        error.response.data.detail || "Ошибка аутентификации!";
    } else {
      errorMessage.value = "Не удалось подключиться к серверу!";
    }
    console.error("Ошибка при аутентификации:", errorMessage.value);
  }
};

if (role.value === "user") {
  console.log(currentUser.value[0].id);
  getSubject(currentUser.value[0].id);
} else if (role.value === "teacher") {
  getinfoteacher(currentUser.value[0].id);
}

interface Student {
  id: string;
  name: string;
  group: string;
  students: any[]; // Тут лучше указать конкретный тип массива студентов
}

const lengthStudentsForGroup = (group: string): string => {
  const student = students.value.find((i: Student) => i.group === group);
  const count = student ? student.students.length : 0;

  // Функция для правильного склонения слова "ученик"
  const getStudentLabel = (num: number): string => {
    if (num % 10 === 1 && num % 100 !== 11) return `${num} ученик`;
    if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100))
      return `${num} ученика`;
    return `${num} учеников`;
  };

  return getStudentLabel(count);
};
</script>

<template>
  <div class="evaluations">
    <Menu :isOpen="isMenuOpen" @update:isOpen="isMenuOpen = $event" />
    <PopupOcenki
      :isOpene="isPopupOcenOpen"
      :ocenk="currentOcen || {}"
      :subject="currentSubj || {}"
      @update:isOpene="isPopupOcenOpen = $event"
    />
    <header class="evaluations__header">
      <button @click="toggleMenu" class="evaluations__header__btn">
        <img alt="menu" src="../assets/menu.svg" />
      </button>
      <p class="evaluations__header__title">Оценки</p>
    </header>
    <div v-if="role === 'user'" class="evaluations__srbal">
      <img src="../assets/evaluations.svg" class="evaluations__srbal__imgbck" />
      <p class="evaluations__srbal__num">{{ srbal }}</p>
      <p class="evaluations__srbal__title">Средний балл</p>
    </div>

    <div class="evaluations__cards">
      <div class="evaluations__cards__classwork" v-if="classworkteacher">
        <p class="evaluations__cards__classwork__title">Класс. Руководство</p>
        <button
          class="evaluations__cards__classwork__btn"
          v-for="(subject, index) in classworkteacher"
          :key="index"
        >
          <div class="evaluations__cards__classwork__btn__color"></div>
          <div class="evaluations__cards__classwork__btn__info">
            <p class="evaluations__cards__classwork__btn__info__title">
              {{ subject.name }}
            </p>
            <p class="evaluations__cards__classwork__btn__info__kolvo">
              {{ lengthStudentsForGroup(subject.name) }}
            </p>
          </div>
        </button>
      </div>
      <div class="evaluations__cards__groups" v-if="groupforteacher">
        <p class="evaluations__cards__groups__title">Другие группы</p>
        <button
          class="evaluations__cards__groups__btn"
          v-for="(subject, index) in groupforteacher"
          :key="index"
        >
          <div class="evaluations__cards__groups__btn__color"></div>
          <div class="evaluations__cards__groups__btn__info">
            <p class="evaluations__cards__groups__btn__info__title">
              {{ subject.name }}
            </p>
            <p class="evaluations__cards__groups__btn__info__kolvo">
              {{ lengthStudentsForGroup(subject.name) }}
            </p>
          </div>
        </button>
      </div>
      <button
        v-if="role === 'user'"
        v-for="(subject, index) in studentoc"
        :key="index"
        class="evaluations__cards__card"
        @click="
          togglePopupOcen(
            subject,
            JSON.parse(JSON.stringify(subjectOcenk[subject.id]))
          )
        "
      >
        <div
          :style="{ backgroundColor: subject.color }"
          class="evaluations__cards__card__color"
        ></div>
        <div class="evaluations__cards__card__infoco">
          <p class="evaluations__cards__card__infoco__title">
            {{ subject.predmet }}
          </p>
          <div class="evaluations__cards__card__infoco__ocen">
            <p class="evaluations__cards__card__infoco__ocen__pokaz">
              <img src="../assets/star.svg" />
              {{
                subject.srbal >= 4.5
                  ? "Отлично"
                  : subject.srbal >= 3.5
                  ? "Хорошо"
                  : subject.srbal >= 2.5
                  ? "Удовлет."
                  : subject.srbal >= 2
                  ? "Неудовлет."
                  : "Неверная оценка"
              }}
            </p>
            <p class="evaluations__cards__card__infoco__ocen__pokaz">
              <img src="../assets/ocenka.svg" />
              Всего оценок:
              {{
                Array.isArray(subjectOcenk[subject.id])
                  ? subjectOcenk[subject.id].length
                  : 0
              }}
            </p>
          </div>
        </div>
        <div class="evaluations__cards__card__srbal">
          <p class="evaluations__cards__card__srbal__text">
            {{ subject.srbal }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.evaluations {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f3f5ff;
  position: relative;
  &__header {
    margin-top: 5.34vw;
    width: 92.961vw;
    display: flex;
    align-items: center;
    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.825vw;
      height: 5.825vw;
      img {
        width: 5.825vw;
        height: 5.825vw;
        object-fit: contain;
      }
    }
    &__title {
      margin-left: 4.854vw;
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 5.825vw;
      color: #484848;
    }
  }
  &__srbal {
    margin-top: 5.34vw;
    border-radius: 2.427vw;
    width: 92.961vw;
    height: 55.825vw;
    background: #2c3b88;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &__imgbck {
      width: 73.058vw;
      height: 73.058vw;
      transform: rotate(15deg);
      position: absolute;
      opacity: 0.3;
      left: -17.476vw;
      bottom: -15.049vw;
    }
    &__num {
      font-family: var(--font-family);
      font-weight: 500;
      font-size: 16.99vw;
      text-align: center;
      color: #fff;
    }
    &__title {
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 2.913vw;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  &__cards {
    width: 92.961vw;
    margin-top: 4.854vw;
    display: flex;
    padding-bottom: 6.083vh;
    flex-direction: column;
    gap: 2.427vw;
    &__classwork {
      display: flex;
      flex-direction: column;
      gap: 5px;
      &__title {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 30px;
        color: #484848;
      }
      &__btn {
        border-radius: 10px;
        width: 383px;
        height: 64px;
        background: #fff;
        display: flex;
        overflow: hidden;
        gap: 10px;
        display: flex;
        align-items: center;
        &__color {
          width: 4px;
          height: 89px;
          background: #ffb800;
        }
        &__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          &__title {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 24px;
            line-height: 100%;
            color: #000;
          }
          &__kolvo {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: rgba(0, 0, 0, 0.4);
            text-align: left;
          }
        }
      }
    }
    &__groups {
      display: flex;
      flex-direction: column;
      gap: 5px;
      &__title {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 30px;
        color: #484848;
      }
      &__btn {
        border-radius: 10px;
        width: 383px;
        height: 64px;
        background: #fff;
        display: flex;
        overflow: hidden;
        gap: 10px;
        display: flex;
        align-items: center;
        &__color {
          width: 4px;
          height: 89px;
          background: #2c3b88;
        }
        &__info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          &__title {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 24px;
            line-height: 100%;
            color: #000;
          }
          &__kolvo {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            color: rgba(0, 0, 0, 0.4);
            text-align: left;
          }
        }
      }
    }
    &__card {
      min-height: 21.602vw;
      background: #fff;
      width: 100%;
      border-radius: 2.427vw;
      display: flex;
      align-items: center;
      overflow: hidden;
      &__color {
        width: 0.971vw;
        height: 22.33vw;
        flex-shrink: 0;
      }
      &__infoco {
        width: 67.718vw;
        margin-left: 2.184vw;
        &__title {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 3.883vw;
          line-height: 100%;
          color: #000;
        }
        &__ocen {
          display: flex;
          width: 59.951vw;
          justify-content: space-between;
          margin-top: 1.942vw;
          &__pokaz {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 3.398vw;
            line-height: 100%;
            color: #000;
            opacity: 0.4;
            display: flex;
            align-items: center;
            img {
              width: 4.854vw;
              height: 4.854vw;
              margin-right: 0.971vw;
            }
          }
        }
      }
      &__srbal {
        margin-left: auto;
        margin-right: 2.427vw;
        &__text {
          font-family: var(--font-family);
          font-weight: 500;
          font-size: 5.825vw;
          line-height: 100%;
          text-align: right;
          color: #000;
        }
      }
    }
  }
}
</style>

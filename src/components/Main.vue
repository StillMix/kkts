<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Menu from "./Menu.vue";
import PopupLessInfo from "./PopupLessInfo.vue";
import axios from "axios";

const isMenuOpen = ref<boolean>(false);
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};

const role = ref<string>(localStorage.getItem("role") ?? "");
const currentUser = computed(() => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
});

const socket = new WebSocket(
  `ws://127.0.0.1:8000/ws/${currentUser.value[0].id}`
);

socket.onopen = () => {
  console.log("WebSocket connected");
  socket.send("Hello from client"); // Отправляем сообщение на сервер
};

socket.onmessage = (event) => {
  if (event.data) {
    let message = event.data || ""; // Выводим полученное сообщение

    // Проверка на исключение "Hello from server"
    if (message !== "Hello from server") {
      const parts = message.split(":");

      // Проверка на количество частей после разделения
      if (parts.length >= 2) {
        const key = parts[0];           
        const value = parts[1].trim();  

        console.log([key, value]);

        // Проверка на совпадение с "newlesson" и значением группы
        if (key === "newlesson") {
          if (value === currentUser.value[0].group) {
            console.log('совпало')
            days.value = [];
            fetchDays();
          }
        }
      } else {
        console.error("Невалидное сообщение: разделитель ':' не найден. Получено сообщение: ", message);
      }
    }
  }
};







socket.onclose = () => {
  console.log("WebSocket disconnected");
};

socket.onerror = (error) => {
  console.log("WebSocket error: ", error);
};

const currentLesson = ref<any>(null);
const isPopupLesOpen = ref<boolean>(false);

const togglePopupLess = (less: any): void => {
  if (role.value === "user") {
    currentLesson.value = less;
    isPopupLesOpen.value = !isPopupLesOpen.value;

    if (isPopupLesOpen.value) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
};

const now = ref(new Date());
let timer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date();
  }, 1000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Переменные для данных с сервера
const days = ref<any[]>([]);
const sessions = ref<Record<number, any[]>>({});

// Функция получения дней с сервера
const fetchDays = async (forceUpdate: boolean = false) => {
  // Если forceUpdate равно true, то всегда запрашиваем данные
  if (forceUpdate || days.value.length === 0) {
    try {
      const response = await axios.get("http://127.0.0.1:8000/teachers/");
      if (response.data.message === "Учителя получены") {
        localStorage.setItem("teachers", JSON.stringify(response.data.users));
      }
    } catch (error) {
      console.error("Ошибка при получении дней:", error);
    }
    try {
      const response = await axios.get("http://127.0.0.1:8000/lesson/");
      if (response.data.message === "Распиние получено") {
        days.value = response.data.lessons;
        fetchSessionsForDays();
      }
    } catch (error) {
      console.error("Ошибка при получении дней:", error);
    }
  }
};

// Функция получения занятий по каждому дню
const fetchSessionsForDays = async () => {
  for (const day of days.value) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/lesson/${day.id}/session/`
      );
      if (response.data.message === "Пары получены") {
        const lessons = response.data.session;
        sessions.value[day.id] = lessons;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// Загружаем данные при монтировании
onMounted(async () => {
  await fetchDays();
});

const getCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 - вс, 1 - пн, ..., 6 - сб
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const sundayOffset = 7 + mondayOffset - 1;

  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + sundayOffset);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
    today: formatDate(today),
  };
};

// Получаем текущую неделю
const currentWeek = getCurrentWeek();

// Фильтрация и сортировка занятий
const filteredSessions = computed(() => {
  const sortedDays = days.value
    .map((s) => ({
      ...s,
      sessionDate: s.date.split(".").reverse().join("-"), // Преобразуем дату в формат ISO
    }))
    .sort((a, b) => (a.sessionDate > b.sessionDate ? 1 : -1)); // Сортируем по дате
  return sortedDays
    .filter((s) => {
      const sessionDate = s.date; 
      return (
        sessionDate >= currentWeek.today &&
        sessionDate <= currentWeek.end
      );
    })
    .map((day) => ({
      ...day,
      session: (sessions.value[day.id] || [])
        .filter((lesson) => {
          // Фильтрация по группе
 
          if (role.value === "user") {
            // Проверяем, что currentUser является объектом типа StudentGroup

            if ("group" in currentUser.value[0] && currentUser.value[0].group) {
              if (lesson.group !== currentUser.value[0].group) return false;
            }
          } else if (role.value === "teacher") {
            if (
              lesson.teacher !== currentUser.value[0].id.toString() &&
              lesson.teacher2 !== currentUser.value[0].id.toString()
            ) {
              return false;
            }
          }
          
          // Фильтрация по времени (если сегодня, то убираем прошедшие)
          if (day.date === currentWeek.today) {
            return (
              lesson.end >
              now.value.toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            );
          }
          return true;
        })
        
        .sort(
          (a, b) =>
            Number(a.start.replace(":", "")) - Number(b.start.replace(":", ""))
        ),
    }))
    .filter((day) => day.session.length > 0);
});
const getStudentFirstName = computed(() => {
  if (!currentUser.value || !currentUser.value[0]?.fullname) return "";
  const parts = currentUser.value[0].fullname.split(" ");
  return parts.length > 1 ? parts[1] : currentUser.value[0].fullname;
});

const getCurrentLesson = (day: any) => {
  const today = new Date();
  const formattedToday = today.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  if (day.date === formattedToday) {
    const nowTime = Number(
      now.value
        .toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
        .replace(":", "")
    );

    return day.session.find(
      (lesson: any) =>
        Number(lesson.start.replace(":", "")) <= nowTime &&
        Number(lesson.end.replace(":", "")) > nowTime
    );
  }
};

const getTimeRemaining = (lessonEnd: string) => {
  const [endHours, endMinutes] = lessonEnd.split(":").map(Number);
  const nowTime = now.value;
  const endTime = new Date();
  endTime.setHours(endHours, endMinutes, 0, 0);

  let diff = Math.floor((endTime.getTime() - nowTime.getTime()) / 1000); // Разница в секундах

  if (diff <= 0) return "00:00:00"; // Если урок уже закончился

  const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
  diff %= 3600;
  const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
  const seconds = String(diff % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`; // ✅ Правильная шаблонная строка
};



interface Teacher {
  id: string;
  name: string;
}

const fetchTeacher = (id: string): string | undefined => {
  // Получаем данные о учителях из localStorage
  let teachers: Teacher[] = JSON.parse(localStorage.getItem("teachers") || "[]");

  // Ищем учителя с нужным id
  const teacher = teachers.find(i => i.id.toString() === id);
   console.log(teacher)
  // Если учитель найден, возвращаем его имя
  if (teacher) {
    return teacher.name;
  } else {
    return undefined;
  }
};



</script>

<template>
  <div class="main">
    <Menu :isOpen="isMenuOpen" @update:isOpen="isMenuOpen = $event" />
    <PopupLessInfo
      :isOpen="isPopupLesOpen"
      :lesson="currentLesson || {}"
      @update:isOpen="isPopupLesOpen = $event"
    />

    <header class="main__header">
      <button @click="toggleMenu" class="main__header__btn">
        <img alt="menu" src="../assets/menu.svg" />
      </button>
      <p class="main__header__title">Здравствуйте, {{ getStudentFirstName }}</p>
    </header>

    <div class="main__main">
      <div
        v-for="day in filteredSessions"
        :key="day.id"
        class="main__main__card"
      >
        <p class="main__main__card__data">
          {{
            new Date(day.date.split(".").reverse().join("-"))
              .toLocaleDateString("ru-RU", {
                weekday: "long",
                day: "2-digit",
                month: "short",
              })
              .replace(/^./, (char) => char.toUpperCase())
          }}
        </p>

        <div
          v-for="lesson in day.session"
          :key="lesson.start"
          @click="() => togglePopupLess(lesson)"
          class="main__main__card__session"
          :class="{ 'current-lesson': getCurrentLesson(day) === lesson }"
        >
          <div class="color" :style="{ backgroundColor: lesson.color }"></div>
          <div class="main__main__card__session__info">
            <div class="main__main__card__session__info__cont">
              <div class="main__main__card__session__info__cont__classes">
                <p
                  class="main__main__card__session__info__cont__classes__title"
                >
                  {{ lesson.name }}
                </p>
                <div
                  class="main__main__card__session__info__cont__classes__clock"
                >
                  <p
                    class="main__main__card__session__info__cont__classes__clock__teacher"
                  >
                    <img src="../assets/mainTeacher.svg" />
                    <span v-if="role === 'teacher'">{{ lesson.group }}</span>
                    <span v-else-if="role === 'user'"
                      >{{ fetchTeacher(lesson.teacher) }} {{ fetchTeacher(lesson.teacher2) }}</span
                    >
                  </p>

                  <p
                    class="main__main__card__session__info__cont__classes__clock__start"
                  >
                    <img src="../assets/mainClock.svg" />{{ lesson.start }} —
                    {{ lesson.end }}
                  </p>
                </div>
              </div>
              <div class="main__main__card__session__info__cont__class">
                <p class="main__main__card__session__info__cont__class__text">
                  {{ lesson.clases }}
                </p>
              </div>
            </div>
            <div v-if="getCurrentLesson(day) === lesson" class="countdown">
              <p class="countdown__text">
                <img src="../assets/mainClockO.svg" />Сейчас идёт · Осталось
                {{ getTimeRemaining(lesson.end) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p v-if="filteredSessions.length === 0" class="no-sessions">
        Занятий больше нет на этой неделе
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.color {
  width: 0.971vw;
}
.main {
  padding-bottom: 7.282vw;
  min-height: 100vh;
  background-color: #f3f5ff;
  display: flex;
  align-items: center;
  flex-direction: column;

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

  &__main {
    width: 100%;
    display: flex;
    gap: 5.34vw;
    margin-top: 5.34vw;
    flex-direction: column;
    align-items: center;

    &__card {
      display: flex;
      flex-direction: column;
      gap: 2.427vw;
      width: 92.961vw;

      &__data {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 7.282vw;
        color: #484848;
      }

      &__session {
        overflow: hidden;
        border-radius: 2.427vw;
        width: 92.961vw;
        display: flex;
        gap: 2.184vw;
        background: #fff;
        min-height: 21.602vw;
        &__info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          &__cont {
            display: flex;
            justify-content: space-between;
            width: 87.379vw;
            &__classes {
              &__title {
                font-family: var(--font-family);
                font-weight: 500;
                font-size: 3.883vw;
                line-height: 100%;
                color: #000;
              }
              &__clock {
                margin-top: 1.942vw;
                width: 61.165vw;
                display: flex;
                justify-content: space-between;
                &__teacher {
                  font-family: var(--font-family);
                  font-weight: 500;
                  font-size: 3.398vw;
                  line-height: 100%;
                  color: #000;
                  opacity: 0.4;
                  height: 4.854vw;
                  display: flex;
                  align-items: center;
                  img {
                    width: 4.854vw;
                    height: 4.854vw;
                    margin-right: 0.728vw;
                  }
                }
                &__start {
                  font-family: var(--font-family);
                  font-weight: 500;
                  font-size: 3.398vw;
                  line-height: 100%;
                  color: #000;
                  opacity: 0.4;
                  height: 4.854vw;
                  display: flex;
                  align-items: center;
                  flex-shrink: 0;
                  img {
                    width: 4.854vw;
                    height: 4.854vw;
                    margin-right: 0.728vw;
                  }
                }
              }
            }
            &__class {
              min-width: 18.689vw;
              height: 12.864vw;
              display: flex;
              align-items: center;
              justify-content: center;
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
        &.current-lesson {
          background: #2c3b88;
          min-height: 31.796vw;
          .main__main__card__session {
            &__info {
              &__cont {
                &__classes {
                  &__title {
                    color: #fff;
                  }

                  &__clock {
                    &__teacher {
                      color: #fff;
                    }
                    &__start {
                      color: #fff;
                    }
                  }
                }
                &__class {
                  &__text {
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .countdown {
          min-height: 8.495vw;
          margin-top: 2.427vw;
          border-top: 0.243vw solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: end;
          &__text {
            font-family: var(--font-family);
            font-weight: 500;
            font-size: 3.398vw;
            color: #fff;
            display: flex;
            align-items: center;
            img {
              width: 5.825vw;
              height: 5.825vw;
              margin-right: 0.728vw;
            }
          }
        }
      }
    }
  }

  .no-sessions {
    text-align: center;
    font-size: 3.883vw;
    color: gray;
  }
}
</style>

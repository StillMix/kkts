// session.ts

//studentme
export interface StudentGroupOcenkiPredmet {
  name: string;
  data: string;
  ocenka: string;
}

export interface StudentGroupOcenki {
  color: string;
  predmet: string;
  attes: string;
  srbal: string;
  ocenki: StudentGroupOcenkiPredmet[];
}

export interface StudentGroup {
  name: string;
  fullname: string;
  gmail: string;
  vk: string;
  group: string;
  ocenki: StudentGroupOcenki[];
}
export const student: StudentGroup[] = [
  {
    name: "Иванов А.И.",
    fullname: "Иванов Антон Иванович",
    gmail: "testemailEF@gmail.com",
    vk: "https://vk.com/id0",
    group: "1 ПЕД Б",
    ocenki: [
      {
        color: "#dc08d3",
        predmet:
          "Теоретические основы начального курса математики с методикой преподавания",
        attes: "Аттестован",
        srbal: "4.38",
        ocenki: [
          {
            name: "Контрольная работа",
            data: "11.01.2024",
            ocenka: "5",
          },
          {
            name: "Устное задание",
            data: "11.01.2024",
            ocenka: "2",
          },
          {
            name: "Тест",
            data: "11.01.2024",
            ocenka: "4",
          },
          {
            name: "Лабораторные занятия",
            data: "11.01.2024",
            ocenka: "3",
          },
          {
            name: "Лекционные занятия",
            data: "11.01.2024",
            ocenka: "5",
          },
          {
            name: "Практические занятия",
            data: "11.01.2024",
            ocenka: "3",
          },
        ],
      },
      {
        color: "#dca108",
        predmet: "Русский язык с методикой преподавания",
        attes: "Не аттестован",
        srbal: "3.3",
        ocenki: [
          {
            name: "Контрольная работа",
            data: "11.01.2024",
            ocenka: "5",
          },
          {
            name: "Устное задание",
            data: "11.01.2024",
            ocenka: "2",
          },
          {
            name: "Тест",
            data: "11.01.2024",
            ocenka: "4",
          },
          {
            name: "Лабораторные занятия",
            data: "11.01.2024",
            ocenka: "3",
          },
          {
            name: "Лекционные занятия",
            data: "11.01.2024",
            ocenka: "5",
          },
          {
            name: "Практические занятия",
            data: "11.01.2024",
            ocenka: "3",
          },
          {
            name: "Контрольная работа",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Устное задание",
            data: "12.01.2024",
            ocenka: "2",
          },
          {
            name: "Тест",
            data: "12.01.2024",
            ocenka: "4",
          },
          {
            name: "Лабораторные занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
          {
            name: "Лекционные занятия",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Практические занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
          {
            name: "Контрольная работа",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Устное задание",
            data: "12.01.2024",
            ocenka: "2",
          },
          {
            name: "Тест",
            data: "12.01.2024",
            ocenka: "4",
          },
          {
            name: "Лабораторные занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
          {
            name: "Лекционные занятия",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Практические занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
          {
            name: "Контрольная работа",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Устное задание",
            data: "12.01.2024",
            ocenka: "2",
          },
          {
            name: "Тест",
            data: "12.01.2024",
            ocenka: "4",
          },
          {
            name: "Лабораторные занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
          {
            name: "Лекционные занятия",
            data: "12.01.2024",
            ocenka: "5",
          },
          {
            name: "Практические занятия",
            data: "12.01.2024",
            ocenka: "3",
          },
        ],
      },
    ],
  },
];

//teacherme
export interface TeacherGroups {
  name: string;
}

export interface TeacherMEGroup {
  name: string;
  fullname: string;
  gmail: string;
  vk: string;
  groups: TeacherGroups[];
  klasRyk: TeacherGroups[];
}
export const teacherme: TeacherMEGroup[] = [
  {
    name: "Ефимцева И.Б.",
    fullname: "Ефимцева Ирина Борисовна",
    gmail: "testemailEF@gmail.com",
    vk: "https://vk.com/id0",
    groups: [
      {
        name: "1 ПЕД Б",
      },
      {
        name: "1 ПЕД В",
      },
    ],
    klasRyk: [{ name: "1 ПЕД Г" }],
  },
];

//lesson
export interface SessionItem {
  group: string;
  name: string;
  teacher: string;
  teacher2: string;
  start: string;
  end: string;
  class: string;
  adress: string;
  color: string;
}

export interface SessionGroup {
  date: string;
  session: SessionItem[];
}

// Экспортируем массив с расписанием
export const session: SessionGroup[] = [
  {
    date: "18.03.2025",
    session: [
      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Басова А.Е.",
        teacher2: "",
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "14:10",
        end: "17:00",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },

      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "17:00",
        end: "21:45",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "Глобина А.С.",
        start: "21:45",
        end: "23:59",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
    ],
  },
  {
    date: "19.03.2025",
    session: [
      {
        group: "1 ПЕД Г",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "08:30",
        end: "08:50",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Г",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "8:52",
        end: "13:45",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Г",
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "10:15",
        end: "11:45",
        class: "315",
        adress: "1 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dca108",
      },
      {
        group: "1 ПЕД Б",
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "14:00",
        end: "15:30",
        class: "315",
        adress: "1 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dca108",
      },
    ],
  },
  {
    date: "22.03.2025",
    session: [
      {
        group: "1 ПЕД Б",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Ц",
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Глобина А.С.",
        teacher2: "Ефимцева И.Б.",
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        adress: "2 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dc08d3",
      },
      {
        group: "1 ПЕД Ц",
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "10:15",
        end: "11:45",
        class: "315",
        adress: "1 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dca108",
      },
      {
        group: "1 ПЕД Ц",
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "",
        start: "14:00",
        end: "15:30",
        class: "315",
        adress: "1 Этаж · г. Курск, ул. Кирова, д. 5",
        color: "#dca108",
      },
    ],
  },
];

//Teacher

export interface TeacherItem {
  name: string;
}

export interface TeacherGroup {
  name: string;
  fullname: string;
  gmail: string;
  vk: string;
  group: TeacherItem[];
}
export const teacher: TeacherGroup[] = [
  {
    name: "Ефимцева И.Б.",
    fullname: "Ефимцева Ирина Борисовна",
    gmail: "testemailEF@gmail.com",
    vk: "https://vk.com/id0",
    group: [
      {
        name: "1 ПОВ Б",
      },
    ],
  },
  {
    name: "Басова А.Е.",
    fullname: "Басова Анастасия Евгеньевна",
    gmail: "testemailBA@gmail.com",
    vk: "https://vk.com/id1",
    group: [
      {
        name: "1 ПОВ Б",
      },
    ],
  },
  {
    name: "Глобина А.С.",
    fullname: "Глобина Анна Сергеевна",
    gmail: "testemailGL@gmail.com",
    vk: "https://vk.com/id2",
    group: [
      {
        name: "1 ПОВ Б",
      },
    ],
  },
];

//groups
export interface StudentGroups {
  name: string;
}

export interface Groups {
  name: string;
  students: StudentGroups[]
}

const groups:Groups[] = [
  {
    name: "1 ПЕД Б",
    students: [
      {
        name: "Ибрагим",
      },
      {
        name: "a",
      },
      {
        name: "b",
      },
    ],
  },
  {
    name: '1 PED C',
    students: [
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      }
    ]
  }
];

// session.ts

export interface SessionItem {
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
  group: string;
  date: string;
  session: SessionItem[];
}

export interface TeacherGroup {
  name: string;
  fullname: string;
  gmail: string;
  vk: string;
}

// Экспортируем массив с расписанием
export const session: SessionGroup[] = [
  {
    group: "1 ПЕД Б",
    date: "15.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Басова А.Е.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },

      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "17:00",
        end: "21:45",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: "Глобина А.С.",
        start: "21:45",
        end: "23:59",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      
    ],
  },
  {
    group: "1 ПЕД Б",
    date: "16.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "315",
        adress: '1 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dca108",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "14:00",
        end: "15:30",
        class: "315",
        adress: '1 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dca108",
      },
    ],
  },
  {
    group: "1 ПЕД Б",
    date: "17.03.2025",
    session: [
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "8:30",
        end: "10:00",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Теоретические основы начального курса математики с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: 'Ефимцева И.Б.',
        start: "12:15",
        end: "13:45",
        class: "КГУ373",
        adress: '2 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dc08d3",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "10:15",
        end: "11:45",
        class: "315",
        adress: '1 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dca108",
      },
      {
        name: "Русский язык с методикой преподавания",
        teacher: "Ефимцева И.Б.",
        teacher2: '',
        start: "14:00",
        end: "15:30",
        class: "315",
        adress: '1 Этаж · г. Курск, ул. Кирова, д. 5',
        color: "#dca108",
      },
    ],
  },
];


export const teacher: TeacherGroup[] = [
   {
    name: 'Ефимцева И.Б.',
    fullname: 'Ефимцева Ирина Борисовна',
    gmail: 'testemailEF@gmail.com',
    vk: 'https://vk.com/id0'
   },
   {
    name: 'Басова А.Е.',
    fullname: 'Басова Анастасия Евгеньевна',
    gmail: 'testemailBA@gmail.com',
    vk: 'https://vk.com/id1'
   },
   {
    name: 'Глобина А.С.',
    fullname: 'Глобина Анна Сергеевна',
    gmail: 'testemailGL@gmail.com',
    vk: 'https://vk.com/id2'
   },
];
const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUESTIONS: "/questions",
  QUESTIONS_CREATE: "/questions/create",
  QUESTION_DETAILS: (id: string) => "/questions/" + id,
};
export default ROUTES;

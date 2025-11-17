const ROUTES = {
  HOME: "/",
  TAGS: "/tags",
  LOGIN: "/login",
  REGISTER: "/register",
  QUESTIONS: "/questions",
  QUESTIONS_CREATE: "/questions/create",
  QUESTION_DETAILS: (id: string) => "/questions/" + id,
};
export default ROUTES;

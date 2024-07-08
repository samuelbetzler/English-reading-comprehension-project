const API_URLS = {
  SPRING_BOOT_BASE_URL: 'https://5f4e-102-177-174-114.ngrok-free.app/api',
  FLASK_BASE_URL: 'https://your-flask-ngrok-url.ngrok-free.app/api',
  QUIZZES: '/quizzes',
  STORIES: '/stories',
  QUESTIONS: '/questions',
  ANSWERS: '/answers',
  USERS: '/users',
  QUIZ_ATTEMPTS: '/attempts',
  QUIZ_PROGRESS: '/progress',
};

const ENDPOINT_MAPPING = {
  [API_URLS.QUIZZES]: 'SPRING_BOOT',
  [API_URLS.STORIES]: 'SPRING_BOOT',
  [API_URLS.QUESTIONS]: 'SPRING_BOOT',
  [API_URLS.ANSWERS]: 'SPRING_BOOT',
  [API_URLS.USERS]: 'FLASK',
  [API_URLS.QUIZ_ATTEMPTS]: 'FLASK',
  [API_URLS.QUIZ_PROGRESS]: 'FLASK',
};

function getFullUrl(endpoint: string): string {
  const baseUrl = ENDPOINT_MAPPING[endpoint] === 'SPRING_BOOT' 
    ? API_URLS.SPRING_BOOT_BASE_URL 
    : API_URLS.FLASK_BASE_URL;
  return `${baseUrl}${endpoint}`;
}



export { API_URLS, getFullUrl };
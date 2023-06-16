

export const environment: Environment = {
  production: false,

  backend: '',
  httpBackend: 'https://localhost:7105',
};

interface Environment {
  production: boolean,
  backend: string,
  httpBackend: string;
}
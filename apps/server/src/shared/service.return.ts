export type ServiceReturn_t<T> = {
  code: number;
  error?: string;
  data?: T;
};

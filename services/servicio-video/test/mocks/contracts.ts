// Mock stub for @telemed/contracts
export const EVENT_SUBJECTS = {};
export interface CloudEvent<T = any> {
  type: string;
  data: T;
}

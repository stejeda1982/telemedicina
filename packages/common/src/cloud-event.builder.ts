import { v4 as uuidv4 } from 'uuid';

// Builds CloudEvents 1.0 envelopes with the telemedicina source scheme.
// The correlation_id is taken from AsyncLocalStorage if available, else generated.
export interface CloudEvent<T = unknown> {
  specversion: '1.0';
  id: string;
  source: string;
  type: string;
  time: string;
  datacontenttype: 'application/json';
  data: T;
  correlation_id: string;
}

let currentCorrelationId: string | null = null;

export function setCorrelationId(id: string): void {
  currentCorrelationId = id;
}

export function getCorrelationId(): string {
  return currentCorrelationId || uuidv4();
}

export class CloudEventBuilder {
  static build<T>(subject: string, data: T, serviceName: string): CloudEvent<T> {
    return {
      specversion: '1.0',
      id: uuidv4(),
      source: `urn:telemedicina:${serviceName}`,
      type: subject,
      time: new Date().toISOString(),
      datacontenttype: 'application/json',
      data,
      correlation_id: getCorrelationId(),
    };
  }
}

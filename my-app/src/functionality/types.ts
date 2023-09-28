export interface parsedEvent {
  method: 'get' | 'contains' | string,
  query: string,
  selector?: 'should' | 'click' | 'type' | string,
  selectorValue1?: string,
  selectorValue2?: string,
}


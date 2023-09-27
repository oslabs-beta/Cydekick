export interface parsedEvent {
  method: 'get' | 'contains',
  query: string,
  selector?: 'should' | 'click' | 'type' ,
  selectorValue1?: string,
  selectorValue2?: string,
}


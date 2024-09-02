import { ResultCodes } from '@/types/enums/resultCodes';

/* Usadas en las respuestas de las server actions */
export interface Result {
  type?: string;
  resultCode?: ResultCodes;
}

'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { useHttpService } from '@/services';
import { ResultCodes } from '@/types/enums/resultCodes';
import { emailSchema, signupSchema } from '@/types/models/userSchema';
import type { Result } from '@/types/models/utils';

export async function signupStepOne(
  _state: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const emailVerified = emailSchema.safeParse({
    email: formData.get('emailField'),
  });
  if (!emailVerified.success) {
    return {
      type: 'error',
      resultCode: ResultCodes.INVALID_DATA,
    };
  }

  redirect(`/signup/${emailVerified.data.email}`);
}

export async function signupStepTwo(
  _state: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const { push } = useHttpService();
  const signupVerified = signupSchema.safeParse({
    name: formData.get('nameField'),
    email: formData.get('emailField'),
    birthdate: formData.get('brithdateField'),
    password: formData.get('passwordField'),
  });
  if (!signupVerified.success) {
    return {
      type: 'error',
      resultCode: ResultCodes.INVALID_DATA,
    };
  }
  // TODO: Arreglar cuando este listo el endpoint
  const _res = await push<unknown, z.infer<typeof signupSchema>>('/signup', signupVerified.data);
  if (_res && typeof _res === 'object' && 'success' in _res && _res?.success === true) {
    redirect(`/`);
  }

  return {
    type: 'error',
    resultCode: ResultCodes.INVALID_CREDENTIAL,
  };
}

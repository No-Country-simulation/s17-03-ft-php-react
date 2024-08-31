import { cleanup } from '@testing-library/react';
import { redirect } from 'next/navigation';
import { signupStepOne } from '@/app/(auth)/signup/actions';
import { ResultCodes } from '@/types/enums/resultCodes';

const VALID_EMAIL = "test@example.com";
const INVALID_EMAIL = "invalid-email";
jest.mock('next/navigation', () => ({
  redirect: jest.fn(url => url),
}));

jest.mock('@/types/models/userSchema', () => ({
  emailSchema: {
    safeParse: jest.fn(data => ({ success: data.email === VALID_EMAIL, data })),
  },
}));

describe('actions for signup page test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });
  it('should redirect to the correct URL when email is valid', async () => {
    const formData = new FormData();
    formData.append('emailField', VALID_EMAIL);

    const result = await signupStepOne(undefined, formData);

    // Verifica que se haya llamado al redirect con la URL correcta
    expect(redirect).toHaveBeenCalledWith(`/signup/${VALID_EMAIL}`);
    // Verifica que no haya retornado ningún error
    expect(result).toBeUndefined();
  });

  it('should not redirect when email is invalid', async () => {
    const formData = new FormData();
    formData.append('emailField', INVALID_EMAIL);

    const result = await signupStepOne(undefined, formData);

    expect(redirect).not.toHaveBeenCalledWith(`/signup/${INVALID_EMAIL}`);

    expect(result).toStrictEqual({
      type: 'error',
      resultCode: ResultCodes.INVALID_DATA,
    });
  });
});

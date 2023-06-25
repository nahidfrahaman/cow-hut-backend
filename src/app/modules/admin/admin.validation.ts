import z from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum(['admin'], {
      required_error: 'role is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    needPasswordChange: z.boolean().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'fistName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
      middleName: z.string().optional(),
    }),
    address: z.string({
      required_error: 'address is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};

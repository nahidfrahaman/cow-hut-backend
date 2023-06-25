import z from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum(['seller', 'buyer'], {
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
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum(['seller', 'buyer']).optional(),
    password: z.string().optional(),
    needPasswordChange: z.boolean().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};

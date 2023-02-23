import userSchema from 'models/user';

const loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      ...userSchema.mail,
      errorMessage: {
        minLength: 'Email is required',
        _: 'Email is invalid',
      },
    },
    password: {
      ...userSchema.password,
      errorMessage: {
        minLength: 'Password is required',
        _: 'Password is invalid',
      },
    },
  },
  additionalProperties: false,
};

export default loginSchema;

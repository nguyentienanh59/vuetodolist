const userSchema = {
  mail: {
    type: 'string',
    maxLength: 255,
    minLength: 1,
    pattern: '^[A-Za-z0-9_!#$%&*+/=?`\'{|}~^.-]+@[A-Za-z0-9.-]+$',
  },
  password: {
    type: 'string',
    minLength: 1,
  },
};

export default userSchema;

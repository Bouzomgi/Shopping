//VALIDATION
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

//REGISTER VALIDATION
const nameRegex = /^[\u0027|\u002D|\u0060|\u0020|A-Za-z]+$/;

const registerValidationSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(255)
      .pattern(nameRegex)
      .messages({
        'string.empty': 'Enter a first name',
        'string.max': 'First name must have at most 255 characters',
        'string.pattern.base': 'First name includes invalid characters'
      }),

    lastName: Joi.string()
      .trim()
      .required()
      .max(255)
      .pattern(nameRegex)
      .messages({
        'string.empty': 'Enter a last name',
        'string.max': 'Last name must have at most 255 characters',
        'string.pattern.base': 'Last name includes invalid characters'
      }),
  }),

  username: Joi.string()
    .trim()
    .required()
    .max(255)
    .alphanum()
    .messages({
      'string.empty': 'Enter a username',
      'string.max': 'Username must have at most 255 characters',
      'string.alphanum': 'Username may only include alphanumeric characters'
    }),

  email: Joi.string()
    .trim()
    .required()
    .email()
    .max(255)
    .messages({
      'string.empty': 'Enter an email',
      'string.email': 'Email is invalid',
      'string.max': 'Email must have at most 255 characters'
    }),

  password: Joi.object({
    initialPassword: Joi.string()
      .required()
      .min(6)
      .max(255)
      .pattern(/^[!-~]+$/)
      .messages({
        'string.empty': 'Enter a password',
        'string.min': 'Password must have at least 6 characters',
        'string.max': 'Password must have at most 255 characters',
        'string.pattern.base': 'Password may only contain letters, numbers, and common punctuation'
    }),

    confirmedPassword: Joi.string()
      .required()
      .valid(Joi.ref('initialPassword'))
      .messages({
        'string.empty': 'Confirm your password',
        'any.only': 'Passwords don\'t match'
      })
  })
});

//LOGIN VALIDATION
const loginValidationSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(255)
    .required(),
  password: Joi.string()
    .max(1024)
    .required()
});

module.exports.registerValidationSchema = registerValidationSchema;
module.exports.loginValidationSchema = loginValidationSchema;
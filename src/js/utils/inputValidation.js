export default function inputValidation(item) {
  if (item.classList.contains('form__input_email')) {
    return {
      isValid: /^[\w-]+@[\w.-]+\.[a-z]+$/.test(item.value),
      message: 'Неправильный формат email',
    };
  } if (item.classList.contains('form__input_password')) {
    return {
      isValid: /^[^<>]{8,}$/.test(item.value),
      message: 'Пароль должен содержать не менее 8 символов',
    };
  } if (item.classList.contains('form__input_name')) {
    return {
      isValid: /^[а-яa-z0-9_-]{2,30}$/i.test(item.value),
      message: 'Имя пользователя должно быть от 2 до 30 букв и не содержать спецсимволы',
    };
  }
  return { isValid: false, message: 'Ошибка' };
}

export default async function errorHandler(err, callback) {
  let error;
  // Если ошибка из фронтенда
  if (err.message) {
    error = `Ошибка: ${err.message}`;
  // Если ошибка из бэкенда
  } else {
    error = await err.then((parsedErr) => `Ошибка ${parsedErr.statusCode}: ${parsedErr.message}`);
  }
  // Если требуется вывод ошибки
  if (callback) {
    if (typeof callback === 'function') {
      callback(error);
    } else {
      callback.textContent = error;
    }
  }
  console.log(error);
}

const getData = (success, fail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      success(response);
    })
    .catch((err) => {
      fail(`Ошибка загрузки ${err}`);
    });
};

const sendData = (success, fail, body) => {
  fetch(
    'https://26.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        success('Ваше объявление размещено');
      } else if (response.status >= 500 && response.status <= 505) {
        fail('Не удалось получить данные. Попробуйте ещё раз');
      } else {
        fail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      fail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {
  getData,
  sendData
};


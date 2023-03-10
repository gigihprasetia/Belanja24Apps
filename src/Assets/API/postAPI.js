import API from './API';

export const inquiryBasic = async callback => {
  //   console.log(data);
  await API.post('/login/inquiry-basic', {role: 'USER'})
    .then(response => {
      callback(response);
    })
    .catch(err => console.log(err));
};

export const UpdateProfile = async (token = '', data, callback) => {
  //   console.log(data);
  await API.post('/customer-sys/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(update => {
      callback({status: true, response: update});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.message});
    });
};

export const addToCart = async (token = '', data, callback) => {
  await API.post('/customer-sys/buy-process/cart/add', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      callback(response);
    })
    .catch(err => callback(false));
};

/////AUTHENTICATION///////////

export const loginBasic = async (data, callback) => {
  //   console.log(data);
  await API.post('/login/basic', data)
    .then(response => {
      callback({status: true, response: response.data.data});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.message});
    });
};

export const RegisterBasic = async (data, callback) => {
  //   console.log(data);
  await API.post('/register/basic', data)
    .then(regist => {
      callback({status: true, response: regist.data});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.data});
    });
};

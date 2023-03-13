import axios from 'axios';
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

export const postPostalCode = async (params, data) => {
  await API.post('accessible/data-master/address-by-postal', params)
    .then(res => {
      if (res.data.message === 'Approved') {
        data(res.data.data);
      }
      console.log();
    })
    .catch(err => console.log(err, 'error'));
};

export const postAddress = async (token = '', params, data) => {
  await API.post('customer-sys/profile/address', params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => console.log(res, 'res'))
    .catch(err => console.log(err));
};

export const deleteAddress = async (token = '', params, data) => {
  await API.delete(`customer-sys/profile/address/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => console.log(res))
    .catch(err => console.log(err, 'error'));
};

export const setPrimaryAddress = async (token = '', params, data) => {
  // console.log(token, params);
  await API.post(
    `/customer-sys/profile/address/${params}/set-primary`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(val => console.log(val))
    .catch(err => console.log(err));
};

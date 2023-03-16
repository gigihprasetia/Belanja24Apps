import {useSelector} from 'react-redux';
import API from './API';

export const getPopularProduct = async (token = '', callback) => {
  await API.get('/guest-sys/fade/popular-product', {
    params: {provider_type: 'ECOMMERCE'},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(product => {
      // console.log(product);
      callback(product);
    })
    .catch(err => console.log(err));
};
export const getPopularStore = async (token = '', callback) => {
  await API.get('/guest-sys/fade/featured-provider', {
    params: {provider_type: 'ECOMMERCE'},
    headers: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then(store => callback(store))
    .catch(err => console.log(err));
};
export const getMostLikeProduct = async (token = '', load = '', callback) => {
  await API.get('/guest-sys/fade/browse-product', {
    params: {pointer: load, provider_type: 'ECOMMERCE'},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(store => {
      // console.log(store);
      callback(store);
    })
    .catch(err => console.log(err));
};
export const getDetailProduct = async (token = '', slug, callback) => {
  await API.get(`/guest-sys/fade/detail-product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(detail => callback(detail))
    .catch(err => console.log(err));
};
export const getRelatedProduct = async (token = '', product_id, callback) => {
  await API.get(`/guest-sys/fade/related-product`, {
    params: {product_id},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(related => callback(related))
    .catch(err => console.log(err));
};

export const validate = async (token = '', callback) => {
  await API.get(`/token/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(validate => callback(validate))
    .catch(err => console.log(err));
};
export const getProfile = async (token = '', callback) => {
  await API.get(`/customer-sys/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(profile => callback(profile.data.data))
    .catch(err => console.log(err));
};
export const getDataCart = async (token = '', callback) => {
  await API.get(`/customer-sys/buy-process/cart/index`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(profile => callback(profile.data.data))
    .catch(err => console.log(err));
};

export const getPaymentMethod = async (token = '', callback) => {
  await API.get(`/customer-sys/data-master/payment-methods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getAddress = async (token = '', callback) => {
  await API.get(`/customer-sys/profile/address`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: true, data: res.data.data}))
    .catch(err => console.log(err));
};
export const getAddresShipping = async (token = '', callback) => {
  await API.get(`/customer-sys/profile/address`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback(res.data.data))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};
export const InvoiceGenerate = async (token = '', chain_id, callback) => {
  await API.get(`/customer-sys/transaction/invoice/${chain_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

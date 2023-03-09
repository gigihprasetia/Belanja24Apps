import API from './API';

export const getPopularProduct = async callback => {
  await API.get('/guest-sys/fade/popular-product', {
    params: {provider_type: 'ECOMMERCE'},
  })
    .then(product => {
      // console.log(product);
      callback(product);
    })
    .catch(err => console.log(err));
};
export const getPopularStore = async callback => {
  await API.get('/guest-sys/fade/featured-provider', {
    params: {provider_type: 'ECOMMERCE'},
  })
    .then(store => callback(store))
    .catch(err => console.log(err));
};
export const getMostLikeProduct = async (load = '', callback) => {
  await API.get('/guest-sys/fade/browse-product', {
    params: {pointer: load, provider_type: 'ECOMMERCE'},
  })
    .then(store => {
      // console.log(store);
      callback(store);
    })
    .catch(err => console.log(err));
};
export const getDetailProduct = async (slug, callback) => {
  await API.get(`/guest-sys/fade/detail-product/${slug}`)
    .then(detail => callback(detail))
    .catch(err => console.log(err));
};
export const getRelatedProduct = async (product_id, callback) => {
  await API.get(`/guest-sys/fade/related-product`, {
    params: {product_id},
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

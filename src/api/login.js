import request from './request';

export function login({ accountId, password }) {
  return request({
    method: 'post',
    endpoint: '/api/auth/authenticate',
    data: {
      accountId,
      password,
    },
  });
}

export default undefined;

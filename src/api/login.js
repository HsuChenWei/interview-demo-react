import request from './request';

export function login({ userName, userPwd }) {
  return request({
    method: 'post',
    endpoint: '/api/member/user/login',
    data: {
      userName,
      userPwd,
    },
  });
}

export default undefined;

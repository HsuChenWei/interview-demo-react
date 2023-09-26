import request from './request';

export function register({ userName, userPwd }) {
  return request({
    method: 'post',
    endpoint: '/api/member/user/register',
    data: {
      userName,
      userPwd,
    },
  });
}

export default undefined;

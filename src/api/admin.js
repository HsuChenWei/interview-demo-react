import request from './request';

export async function getAllUserList(payload) {
  try {
    const response = await request({
      method: 'get',
      endpoint: '/api/admin/user',
      params: payload,
    });
    console.log('API Response in getAllUserList:', response);
    return response;
  } catch (error) {
    console.log('API Error in getAllUserList:', error);
    throw error;
  }
}
export function changeRole(payload, roleId) {
  if (payload === null || roleId === null) {
    return null;
  }
  return request({
    method: 'put',
    endpoint: `/api/admin/role/${roleId}`,
    data: { userType: payload },
  });
}

export default undefined;

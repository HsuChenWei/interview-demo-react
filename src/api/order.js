import request from './request';

export function getAdminBookings(payload) {
  return request({
    method: 'get',
    endpoint: '/api/admin/booking',
    params: payload,
  });
}
export function getMemberBookings(payload) {
  return request({
    method: 'get',
    endpoint: '/api/member/booking/user',
    params: payload,
  });
}

export function getOneBooking(id) {
  return request({
    method: 'get',
    endpoint: `/api/member/booking/${id}`,
  });
}

export function deleteMemberBooking(id) {
  return request({
    method: 'delete',
    endpoint: `/api/member/booking/delete/${id}`,
  });
}

export function deleteAdminBooking(id) {
  return request({
    method: 'delete',
    endpoint: `/api/admin/booking/delete/${id}`,
  });
}

export function updateMemberBooking(id, data) {
  return request({
    method: 'put',
    endpoint: `/api/member/booking/update/${id}`,
    data,
  });
}

export function updateAdminBooking(id, data) {
  return request({
    method: 'put',
    endpoint: `/api/admin/booking/update/${id}`,
    data,
  });
}

export default undefined;

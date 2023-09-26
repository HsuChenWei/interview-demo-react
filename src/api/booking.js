import request from './request';

export function addBooking(data) {
  return request({
    method: 'post',
    endpoint: '/api/member/booking',
    data,
  });
}

export function getRoomId(data) {
  return request({
    method: 'post',
    endpoint: '/api/member/booking',
    data,
  });
}
export function getAvailableTime(payload, roomId) {
  return request({
    method: 'get',
    endpoint: `/api/member/booking/${payload.roomId}/available-hourly-time-slots`,
    params: { roomId },
  });
}

export default undefined;

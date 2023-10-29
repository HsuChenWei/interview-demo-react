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
export function getAvailableTime(roomId) {
  return request({
    method: 'get',
    endpoint: `/api/member/booking/${roomId}/available-hourly-time-slots`,
    // params: { roomId },
  });
}

export default undefined;

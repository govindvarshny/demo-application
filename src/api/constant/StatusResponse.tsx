export const StatusHttp = {
  /* Server response */
  OK: '200',
  UNAUTHORIZED: '401', // no code msg,
  BAD_REQUEST: '400',
  NOT_FOUND: '404', // no code msg, Content-Type: text/html
  INTERNAL_SERVER: '500', // no code msg, Content-Type: text/html

  /* local */
  NETWORK_LOST: '-123', // no network
  NETWORK_ERROR: '-321', //Server die or time out
};
export const StatusCode = {
  EXISTS_DATA: 'E02',
  INCORRECT_OR_INVALID_DATA: 'E01',
};

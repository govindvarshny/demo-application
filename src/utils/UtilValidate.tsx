import lodash from 'lodash';
export function invalidPassword(password: string): string {
  if (!lodash.isString(password) || password.length === 0) {
    return 'password_empty';
  }
  if (password.length < 6) {
    return 'password_invalid';
  }
  return 'valid'; //valid
}
export function invalidEmail(email: string): string {
  if (!lodash.isString(email) || email.trim().length === 0) {
    return 'empty_email';
  }
  if (email.trim().length < 3 || email.trim().length > 50) {
    return 'email_invalid_length';
  }
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return 'valid'; //valid
  }
  return 'email_invalid'; //invalid
}
export function getValidLink(link: string | undefined): string | null {
  if (lodash.isString(link) && link.trim().length > 0) {
    var pattern =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (pattern.test(link)) {
      return link.replace(/ /g, '%20'); //valid
    }
  }
  return null;
}

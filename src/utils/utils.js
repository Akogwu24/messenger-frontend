// rhf phoneNumberValidation
const isValidPhoneNumber = /((^090)([0-9]))|((^091)([1-9]))|((^070)([1-9]))|((^080)([1-9]))|((^081)([0-9]))(\d{7})/;

export const phoneNumberValidation = {
  required: 'Phone Number is Required',
  maxLength: { value: 11, message: 'Phone Number must be 11 digits' },
  minLength: { value: 11, message: 'Phone Number must be 11 digits' },
  pattern: { value: isValidPhoneNumber, message: 'Invalid Phone Number' },
};

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const getSender = (loggedInUser, users) => {
  return users[0]._id === loggedInUser._id ? users[1].name : users[0].name;
};

export const getSenderFullInfo = (loggedInUser, users) => {
  if (!users?.length) return;
  return users[0]?._id === loggedInUser?._id ? users[1] : users[0];
};

//capitalize only the first letter of the string.
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//capitalize all words of a string.
export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const normal = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_+<>?:,./";

const createPassword = (
  length = 10,
  capitalCharacter,
  normalCharacter,
  numberCharacter,
  symbolCharacter
) => {
  let string = "";

  capitalCharacter ? (string += capital) : "";
  normalCharacter ? (string += normal) : "";
  numberCharacter ? (string += number) : "";
  symbolCharacter ? (string += symbol) : "";

  const charactersLength = string.length;
  let result = "";

  for (i = 0; i < length; i++) {
    result += string.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = createPassword;

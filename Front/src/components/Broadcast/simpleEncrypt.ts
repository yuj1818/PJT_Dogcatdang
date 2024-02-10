const shift = 7;

export const encrypt = (username: string) => {
  let encryptedUsername = "";
  for (let i = 0; i < username.length; i++) {
    let charCode = username.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      encryptedUsername += String.fromCharCode(
        ((charCode - 65 + shift) % 26) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      encryptedUsername += String.fromCharCode(
        ((charCode - 97 + shift) % 26) + 97
      );
    } else if (charCode >= 48 && charCode <= 57) {
      encryptedUsername += String.fromCharCode(
        ((charCode - 48 + shift) % 10) + 48
      );
    } else {
      encryptedUsername += username[i];
    }
  }
  return encryptedUsername;
};

export const decrypt = (encryptedUsername: string) => {
  let decryptedUsername = "";
  for (let i = 0; i < encryptedUsername.length; i++) {
    let charCode = encryptedUsername.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      decryptedUsername += String.fromCharCode(
        ((charCode - 65 - shift + 26) % 26) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      decryptedUsername += String.fromCharCode(
        ((charCode - 97 - shift + 26) % 26) + 97
      );
    } else if (charCode >= 48 && charCode <= 57) {
      decryptedUsername += String.fromCharCode(
        ((charCode - 48 - shift + 10) % 10) + 48
      );
    } else {
      decryptedUsername += encryptedUsername[i];
    }
  }
  return decryptedUsername;
};

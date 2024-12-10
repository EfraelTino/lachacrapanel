
// export const APIMAGE = "http://localhost/admin_hero/assets/";
// export const APIMAGE = "https://apieurofarma.efrael.com/api_admin/assets/";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateLength = (text, minLength) => {
  return text.length > minLength;
};


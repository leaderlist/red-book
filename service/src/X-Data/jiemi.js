var CryptoJS = require('crypto-js');

var data = {
  path: '/api/sns/web/v1/login/activate',
};

const encrypted = CryptoJS.AES.encrypt(
  JSON.stringify(data),
  'secret key 123',
).toString();

const str =
  'XYW_eyJzaWduU3ZuIjoiNTEiLCJzaWduVHlwZSI6IngxIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjM0ODc4M2Y2MzhiYmRiN2MxNDhiMDMxYTdkZjRhMGI0ZmRhNzZjMjQ0YTE0YmNiMmYzN2NlOTVmYWMxOTdhYTI2YzY1MGE1ZmQwNTg3MmVjNTBkODdkOWEzYzYxMWYwNGM5ZTNiZmRhMWZhYTFlYjkwZDc0YWEzMWI1NGM3MmNkMGQ3NGFhMzFiNTRjNzJjZGFjNDg5YjlkYThjZTVlNDhmNGFmYjlhY2ZjM2VhMjZmZTBiMjY2YTZiNGNjM2NiNTEyZmU5ZTMzMGU5MWJiYWE5YjJmZDE2MmM4ZTRkNjVjYjllNWU2YzJiNmQ4M2ZlMjk1Mjg0OTNiYzBlOWU3NmYwYjFjYjU1ODlmOWQyYzQ4N2I2M2UxNzMwNTk3NjUwNmUxOWU4MzAzN2YwMDUxM2FhODRmODA2YTg0NTU5ZTk1NDk0OTQxOTQ4Yjc1NTQ0NDRmY2NlZDEyZWQxYWI2YWMyNzNkOGI5YTNlZDYzODVhOThmYmU4ZjE4ZWExY2QyZCJ9';
const bytes = CryptoJS.AES.decrypt(str, 'secret key 234');


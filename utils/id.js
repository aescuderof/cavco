const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const size = 10;

const nanoid = () => {
  let id = '';
  for (let i = 0; i < size; i += 1) {
    const index = Math.floor(Math.random() * alphabet.length);
    id += alphabet[index];
  }
  return id;
};

module.exports = { nanoid };

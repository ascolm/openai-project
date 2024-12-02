export const appendMessageToUi = (msg, style) => {
  const message = document.createElement('div');
  message.className = style;
  message.innerText = msg;

  document.querySelector('#app').appendChild(message);
};

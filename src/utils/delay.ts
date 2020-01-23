// helper to simulate latency or pause when we need information on the screen for a while
export const delay = (ms = 500) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

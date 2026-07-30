export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return { code: 200, data: { name: 'Vite Mock', role: 'Admin' } };
    }
  }
];
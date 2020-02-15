function resCheck(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
}
export default resCheck;

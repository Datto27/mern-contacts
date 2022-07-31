
export const getParsedJWT = () => {
  // გამოყენებულია ContactItem.jsx-ში username წამოსაღებად
  const token = localStorage.getItem("accessToken")
  if(!token) return;

  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')

  return JSON.parse(window.atob(base64))
}
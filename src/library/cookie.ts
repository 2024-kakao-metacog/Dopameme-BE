function getCookieValue(cookieString, key) {
  const cookies = cookieString.split(';').reduce((res, item) => {
    const [cookieKey, cookieValue] = item.trim().split('=');
    res[cookieKey] = cookieValue;
    return res;
  }, {});

  return cookies[key] || null; // 해당 키가 없다면 null 반환
}

export default getCookieValue;

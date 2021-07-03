export const isFalse = (val) => {
  return val === 0 ? false : !val;
};
export const deleteObjEmptyProperty = (obj) => {
  let tempObj = { ...obj };
  for (let key in tempObj) {
    if (isFalse(tempObj[key])) {
      delete tempObj[key];
    }
  }
  return tempObj;
};

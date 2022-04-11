const REGEXP = {
  phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, // 手机号 13、14、15、16、17、18、19开头即可
  nameCh: /^(?:[\u4e00-\u9fa5·]{2,16})$/, // 英文名称
  nameEn: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, // 中文名称
  idCard:
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/, // 身份证号，支持15/18位
  bankCard: /^[1-9]\d{9,29}$/, // 银行卡
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // 邮箱
  url: /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/, // 网址
  mail: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/, // 邮政
  passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/, // 护照
};

type G = (value: string) => boolean;

type Merge<F extends { [K in string]: G }, S extends { [K in string]: RegExp }> = {
  [P in keyof F | keyof S]: P extends keyof S ? G : P extends keyof F ? F[P] : never;
};

const attachPropertiesToObject = <C extends { [K in string]: G }, P extends { [K in string]: RegExp }>(
  component: C,
  properties: P
): Merge<C, P> => {
  const ret = component as any;
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      ret[key] = (value: string) => properties?.[key]?.test(value);
    }
  }
  return ret;
};

// 抛出正则表达式
const isMatch = attachPropertiesToObject({}, REGEXP);

export { isMatch };

// demo

// const xx = {
//   pass: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/, // 密码
// };
// const isMatch2 = attachPropertiesToObject(isMatch, xx);

// const b = isMatch2.pass('18681277872');

// console.log('sxxx->', b, c);

export const Variable = {
  OS_Android: "android",
  OS_iPhone: "iPhone",
  OS_Web: "web",
  BW_FacebookAN: "facebookAN",
  BW_FacebookAV: "facebookAV",
  BW_Safari: "safari",
  BW_Chrome: "chrome",
  BW_Naver: "naver",
  BW_Kakao: "kakao",
  BW_Instagram: "instagram",
  BW_Slack: "slack",
};

export const Method = {
  API: "api",
  SDK: "sdk",
};

interface IUserAgent {
  os: string;
  browser: string;
  keywords: string[];
  method: string;
}

export const UserAgent: IUserAgent[] = [
  //Android

  {
    os: Variable.OS_Android,
    browser: Variable.BW_Naver,
    method: Method.SDK,
    keywords: ["Android", "NAVER"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_Kakao,
    method: Method.SDK,
    keywords: ["Android", "KAKAOTALK"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_Instagram,
    method: Method.API,
    keywords: ["Android", "Instagram"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_FacebookAN,
    method: Method.API,
    keywords: ["FBAN"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_FacebookAV,
    method: Method.API,
    keywords: ["FBAV"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_Chrome,
    method: Method.API,
    keywords: ["Android", "Chrome", "Mobile", "WellyApp"],
  },
  {
    os: Variable.OS_Android,
    browser: Variable.BW_Chrome,
    method: Method.SDK,
    keywords: ["Android", "Chrome", "Mobile"],
  },
  // iPhone
  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_Naver,
    method: Method.SDK,
    keywords: ["iPhone", "NAVER"],
  },
  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_Kakao,
    method: Method.SDK,
    keywords: ["iPhone", "KAKAOTALK"],
  },
  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_Instagram,
    method: Method.API,
    keywords: ["iPhone", "Instagram"],
  },

  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_Safari,
    method: Method.SDK,
    keywords: ["iPhone", "Version", "Mobile", "Safari"],
  },

  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_Chrome,
    method: Method.SDK,
    keywords: ["iPhone", "Mobile", "CriOS", "Safari"],
  },
  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_FacebookAN,
    method: Method.API,
    keywords: ["FBAN"],
  },
  {
    os: Variable.OS_iPhone,
    browser: Variable.BW_FacebookAV,
    method: Method.API,
    keywords: ["FBAV"],
  },
  {
    os: Variable.OS_Web,
    browser: Variable.BW_Chrome,
    method: Method.SDK,
    keywords: ["Chrome"],
  },
  {
    os: Variable.OS_Web,
    browser: Variable.BW_Safari,
    method: Method.SDK,
    keywords: ["Safari"],
  },
];

export const getKakaoCallMethodObject = (targetUserAgentStr: string) => {
  let resultObject: IUserAgent = {
    os: "unknown",
    browser: "unknown",
    keywords: [],
    method: Method.API,
  };

  UserAgent.find((userAgent) => {
    let isObject = !userAgent.keywords.find((keyword) => {
      return targetUserAgentStr.indexOf(keyword) === -1;
    });
    if (isObject) {
      resultObject = userAgent;
      return true;
    } else {
      return false;
    }
  });

  return resultObject;
};

export const getBrowserName = (targetUserAgentStr: string) => {
  let resultObject: IUserAgent = {
    os: "unknown",
    browser: "unknown",
    keywords: [],
    method: Method.API,
  };

  UserAgent.find((userAgent) => {
    let isObject = !userAgent.keywords.find((keyword) => {
      return targetUserAgentStr.indexOf(keyword) === -1;
    });
    if (isObject) {
      resultObject = userAgent;
      return true;
    } else {
      return false;
    }
  });

  return `${resultObject.os}_${resultObject.browser}`;
};

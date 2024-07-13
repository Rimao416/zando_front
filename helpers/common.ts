import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
export const wp = (percentage: number) => {
  const value = (percentage * deviceWidth) / 100;
  return Math.round(value);
};
export const hp = (percentage: number) => {
  const value = (percentage * deviceHeight) / 100;
  return Math.round(value);
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    return 4;
  } else if (deviceWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};
export const getImageSize = (height, width) => {
  if (deviceWidth >= 1024) {
    return 250;
  } else if (width<height) {
    return 300;
  } else {
    return 200;
  }
};

import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface LayoutItem {
  VISIBLE_COUNT: number;
  WIDTH_RATIO: number;
  GAP_RATIO: number;
  HEIGHT: number;
  BORDER_RADIUS_RATIO: number;
}

interface Layout {
  SCREEN_WIDTH: number;
  CONTAINER_PADDING_RATIO: number;
  ITEM: LayoutItem;
}

export const LAYOUT: Layout = {
  SCREEN_WIDTH,
  CONTAINER_PADDING_RATIO: 0.02,
  ITEM: {
    VISIBLE_COUNT: 4,
    WIDTH_RATIO: 0.18,
    GAP_RATIO: 0.018,
    HEIGHT: 50,
    BORDER_RADIUS_RATIO: 0.1,
  },
};

export const calculateLayoutValues = (layout: Layout = LAYOUT) => {
  const { ITEM, CONTAINER_PADDING_RATIO } = layout;
  const totalGapSpace = (ITEM.VISIBLE_COUNT - 1) * ITEM.GAP_RATIO;
  const availableWidthRatio = 1 - 2 * CONTAINER_PADDING_RATIO - totalGapSpace;
  const itemWidthRatio = availableWidthRatio / ITEM.VISIBLE_COUNT;

  return {
    itemWidth: SCREEN_WIDTH * itemWidthRatio,
    gapWidth: SCREEN_WIDTH * ITEM.GAP_RATIO,
    containerPadding: SCREEN_WIDTH * CONTAINER_PADDING_RATIO,
    borderRadius: SCREEN_WIDTH * itemWidthRatio * ITEM.BORDER_RADIUS_RATIO,
  };
};

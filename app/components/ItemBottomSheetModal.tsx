import { View, Text } from "react-native";
import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "./CustomBottomSheetModal";

interface ItemBottomSheetModalProps {
  bottomSheetRefItem: React.RefObject<BottomSheetModal>;
}
const ItemBottomSheetModal:React.FC<ItemBottomSheetModalProps> = ({bottomSheetRefItem}) => {
  return (
    <CustomBottomSheetModal ref={bottomSheetRefItem}>
      <View>

      <Text>ItemBottomSjeetModal</Text>
      </View>
    </CustomBottomSheetModal>
  );
};

export default ItemBottomSheetModal;

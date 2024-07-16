import { StyleSheet, View, Dimensions, Image, ScrollView } from "react-native";
import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import { Item } from "@/interfaces/Item";
import { ThemedText as Text } from "@/components/ThemedText";
import Carousel from "react-native-reanimated-carousel";
import { wp } from "@/helpers/common";

interface ItemBottomSheetModalProps {
  bottomSheetRefItem: React.RefObject<BottomSheetModal>;
  item: Item | null;
}
const ItemBottomSheetModal: React.FC<ItemBottomSheetModalProps> = ({
  bottomSheetRefItem,
  item,
}) => {
  const width = Dimensions.get("window").width;
  console.log(item);
  return (
    <CustomBottomSheetModal ref={bottomSheetRefItem}>
      <View style={styles.header}>
        <Carousel
          width={width}
          height={wp(100)}
          autoPlay={false}
          data={item?.media || []} // Assurez-vous que data est un tableau
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item: mediaItem, index }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: mediaItem.url }}
                style={[styles.headerImage, { width: "100%", height: "100%" }]}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.bodyCategories}>
          {item?.categories.map((category, index) => (
            <View key={index}>
              <Text>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </CustomBottomSheetModal>
  );
};
const styles = StyleSheet.create({
  // headerImage:{
  //   borderBottomLeftRadius: 30,
  //   borderBottomRightRadius: 30,
  // }
  header: {},
  body: {
    position: "relative",
    backgroundColor: "red",
  },

  bodyCategories: {},
});

export default ItemBottomSheetModal;

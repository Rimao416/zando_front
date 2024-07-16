import { StyleSheet, View, Dimensions, Image, ScrollView } from "react-native";
import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import { Item } from "@/interfaces/Item";
import { ThemedText as Text } from "@/components/ThemedText";
import Carousel from "react-native-reanimated-carousel";
import { hp, wp } from "@/helpers/common";
import { Colors } from "@/constants/Colors";
import { truncateTitle } from "@/config/utils";

interface ItemBottomSheetModalProps {
  bottomSheetRefItem: React.RefObject<BottomSheetModal>;
  item: Item | null;
}
const ItemBottomSheetModal: React.FC<ItemBottomSheetModalProps> = ({
  bottomSheetRefItem,
  item,
}) => {
  const width = Dimensions.get("window").width;
  return (
    <CustomBottomSheetModal ref={bottomSheetRefItem}>
      <View style={styles.header}>
        <Carousel
          width={width}
          data={item?.media || []}
          renderItem={({ item: mediaItem, index }) => (
            <Image
              source={{ uri: mediaItem.url }}
              style={[styles.headerImage, { width: "100%", height: "100%" }]}
              resizeMode="cover"
            />
          )}
        />
      </View>
      <View style={styles.body}>
        <ScrollView
          style={styles.bodyCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {item?.categories.map((category, index) => (
            <View key={index} style={styles.bodycategoryItem}>
              <Text style={styles.bodyCategoryItemText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.product}>
          {item?.title && <Text type="subtitle">{item.title}</Text>}
          {item?.price && (
            <Text type="default" style={styles.productPrice}>
              {item.price} Fc
            </Text>
          )}
          <View style={styles.productDescription}>
              <Text type="subtitle" style={styles.productDescriptionTitle}>
                Description
              </Text>
            {item?.description && (
              <Text style={styles.productDescriptionText}>
                ({truncateTitle(item.description, 100)})
              </Text>
            )}
            <Text>{item?.condition === "new" ? "Neuf" : "Déjà Utilisé"}</Text>
          </View>
        </View>
      </View>
    </CustomBottomSheetModal>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    position: "relative",
    height: hp(40),
  },
  bodyCategories: {},
  body: {
    position: "relative",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  bodycategoryItem: {
    marginRight: 10,
    backgroundColor: Colors.violet,
    padding: 5,
    borderRadius: 5,
  },
  bodyCategoryItemText: {
    color: Colors.violet_dark,
    fontWeight: "700",
  },
  product: {
    marginTop: 15,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  productPrice: {
    color: "rgb(99,95,94)",
  },
  productDescription: {
    marginTop: 10,
  },
  productDescriptionTitle:{

  },
  productDescriptionText: {
    color: "rgb(99,95,94)",
  },
});

export default ItemBottomSheetModal;

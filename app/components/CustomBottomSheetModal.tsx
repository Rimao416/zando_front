import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
// import Colors from "@/constants/Colors";

interface Props {
  children: React.ReactNode;
  defaultIndex?: number;
  customSnapPoints?: string[];
}

type Ref = BottomSheetModal;

const CustomBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  // const colorScheme = useColorScheme();
  const defaultIndex = props.defaultIndex ?? 2;
  const customSnapPoints = props.customSnapPoints ?? [
    "25%",
    "50%",
    "75%",
    "90%",
  ];

  const snapPoints = useMemo(() => customSnapPoints, [customSnapPoints]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={defaultIndex}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableContentPanningGesture
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        // backgroundColor: colorScheme === "dark" ? "red" : "blue",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
      }}
      handleComponent={null}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View style={{ position: "relative" }}>{props.children}</View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
    alignItems: "center",
  },
  containerHeadLine: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "white",
  },
  input: {
    marginTop: 8,
    marginHorizontal: 16,
  },
});

export default CustomBottomSheetModal;

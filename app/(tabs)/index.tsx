import {
  Image,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { MasonryFlashList } from "@shopify/flash-list";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { getColumnCount, hp, wp } from "@/helpers/common";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useRef, useState, useMemo } from "react";
import { getItems } from "@/redux/slice/itemSlice";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

// const dimension=
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  hasMarginBottom?: boolean;
}
// Section Components
const Section: React.FC<SectionProps> = ({
  title,
  hasMarginBottom = true,
  className,
  children,
}) => {
  return (
    <View style={[hasMarginBottom && styles.sectionMarginBottom]}>
      <View style={styles.sectionWrap}>
        <Text type="subtitle">{title}</Text>
        <Text type="link">Voir Plus</Text>
      </View>
      <View style={styles.sectionContainer}>{children}</View>
    </View>
  );
};

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const columns = useMemo(() => getColumnCount(), []);
  const { items, status, error, totalItems } = useAppSelector(
    (state) => state.items
  );
  // const { items, page, status, error } = useAppSelector((state) => state.items);
  const [isEndReached, setIsEndReached] = useState(false);
  const [page, setPage] = useState(1);
  console.log(page);
  useEffect(() => {
    dispatch(getItems(page));
  }, [dispatch, page]);
  const handleLoadMore = () => {
    dispatch(getItems(page + 1));
  };
  const loadMoreItems = () => {
    if (status === "idle" || status === "succeeded") {
      if (totalItems <= items.length) return;
      setPage(page + 1);

      dispatch(getItems(page));
    }
  };
  const scrollRef = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const contentHeight = contentSize.height;
    const scrollHeight = layoutMeasurement.height;
    const offsetY = contentOffset.y;
    const bottomPosition = contentHeight - scrollHeight;

    // if (contentHeight - scrollHeight - offsetY < 100) {
    //   loadMoreItems();
    // }

    if (offsetY >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
      loadMoreItems();
      // console.log("End reached reset");
    }
  };

  return (
    <ThemedView style={styles.section}>
      <SafeAreaView>
        <ScrollView onScroll={handleScroll}>
          <Section title="Tendance">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <TouchableOpacity key={i} style={styles.card}>
                  <Image
                    source={{
                      uri: "https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    }}
                    style={styles.cardImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Section>
          <Section title="Votre Zando">
            <View
              style={[
                styles.flashListContainer,
                { width: Dimensions.get("screen").width },
              ]}
            >
              {items && (
                <MasonryFlashList
                  data={items}
                  numColumns={columns}
                  onScroll={handleScroll}
                  // estimatedItemSize={Dimensions.get("window").width / columns}
                  estimatedItemSize={200}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.cardItems}>
                      <View style={styles.cardProfiles}>
                        <View style={styles.cardProfilesWrapper}>
                          <Image
                            source={{ uri: item?.seller.avatar }}
                            style={styles.cardImageProfile}
                          />

                          <Text style={styles.cardProfileText}>
                            {item?.seller.username}
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={{ uri: item.media[0].url }}
                        style={styles.cardImageItems}
                      />
                      {/* <Text style={styles.cardText}>
                      {truncateTitle(item.title)}
                    </Text> */}
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </Section>
          {/* <MyComponent /> */}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 15,
  },
  sectionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionMarginBottom: {
    marginBottom: 30,
  },
  card: {
    position: "relative",
    backgroundColor: Colors.violet,
    width: wp(40),
    height: 250,
    marginRight: 10,
    borderRadius: 10,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  cardImageItems: {
    width: "100%",
    height: hp(25),
    // height: "80%",
    borderRadius: 10,
    marginTop: 5,
  },
  cardProfiles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardProfilesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardProfileText: {
    marginLeft: 10,
  },
  cardItems: {
    marginRight: 10,
    // height: hp(30),
    // backgroundColor:"red",
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(10),
    // marginBottom: 30,
  },

  cardImageProfile: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  cardText: {
    fontWeight: "bold",
    marginTop: 10,
  },

  flashListContainer: {
    // flex: 1,
    minHeight: 3,
  },
});

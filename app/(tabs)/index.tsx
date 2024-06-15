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
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
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
  return (
    <ThemedView style={styles.section}>
      <SafeAreaView>
        <ScrollView>
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
          <View style={styles.sectionMur}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <TouchableOpacity key={i} style={styles.cardMur}>
                <Image
                  source={{
                    uri: "https://images.pexels.com/photos/1502216/pexels-photo-1502216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  }}
                  // style={styles.cardImageMur}
                />
              </TouchableOpacity>
            ))}
          </View>
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
  sectionMur: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // padding:,
  },
  sectionMarginBottom: {
    marginBottom: 30,
  },
  card: {
    position: "relative",
    backgroundColor: Colors.violet,
    width: 200,
    height: 250,
    marginRight: 10,
    borderRadius: 10,
  },
  cardText: {
    color: Colors.blue,
    fontSize: 20,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  cardMur: {
    position: "relative",
    backgroundColor: 'violet', // Remplacez 'Colors.violet' par une valeur concrète
    width: (screenWidth - 40) / 2 - 10, // Ajuster la largeur en fonction de l'écran
    height: screenHeight * 0.25, // Ajuster la hauteur en fonction de l'écran
    marginBottom: 20, // Espacement vertical entre les éléments
  },
});

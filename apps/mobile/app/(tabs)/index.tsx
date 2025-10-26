import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-500 font-bold bg-indigo-500">
          메인 페이지
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

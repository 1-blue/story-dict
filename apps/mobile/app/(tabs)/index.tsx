import { Button } from "#/src/components/ui/button";
import { Text } from "#/src/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Button variant="default">
          <Text variant="default">내가 만든 버튼</Text>
        </Button>

        <Text className="text-red-900">무지</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

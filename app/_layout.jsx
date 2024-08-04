import { Stack } from "expo-router";
import { AppProvider } from "./AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Product List" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout Page" }} />
      </Stack>
    </AppProvider>
  );
}

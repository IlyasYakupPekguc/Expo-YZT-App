import { Link } from "expo-router";
import React from "react";
import { Text, View, useColorScheme } from "react-native";

function TabThreeScreen() {
  const colorScheme = useColorScheme();
  return (
    <View>
      <Text style={{ fontSize: 32, fontWeight: "bold", padding: 12, color: colorScheme == "light" ? "black" : "white" }}>Kullanıcı başarıyla eklendi!</Text>
      <Link href="/" replace style={{
        fontSize: 16,
        padding: 12,
        marginLeft: 12,
        width: 190,
        color: "white",
        backgroundColor: "#2574db",
      }}>Tekrar QR okutun.</Link>
    </View>
  );
}

export default TabThreeScreen;

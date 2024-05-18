import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useContext, useEffect, useState } from "react";
import { QrCodeContext } from "./_layout";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { AnimatedLoading } from "@/components/AnimatedLoading";

export default function TabTwoScreen() {
  const { qrCode, setQrCode } = useContext(QrCodeContext);
  const [qr, setQR] = useState<{
    type: string;
    event: string;
    user: string;
  }>({
    type: "",
    event: "",
    user: "",
  });

  useEffect(() => {
    if(qrCode === null) return;
    const temp = JSON.parse(qrCode);
    setQR({
      type: temp.type ? temp.type : "",
      event: temp.event ? temp.event : "",
      user: temp.user ? temp.user : "",
    });
  }, [qrCode])

  useEffect(() => {
    console.log(qr);
  })

  const colorScheme = useColorScheme();
  console.log(colorScheme);

  const [day, setDay] = useState("0");
  const [session, setSession] = useState("1");

  const [loading, setLoading] = useState(false);
  return (
    <View style={{...styles.container}}>
      <Text style={{...styles.title, color: colorScheme == "light" ? "black" : "white"}}>QR kod başarıyla okundu!</Text>
      <Text style={{ color: colorScheme == "light" ? "black" : "white" }}>{qrCode}</Text>
      <View style={{marginTop: 12}}>
        <Text style={{ color: colorScheme == "light" ? "black" : "white" }}>Hangi gün?</Text>
        <Picker
          style={{ color: colorScheme == "light" ? "white" : "black", width: 200, backgroundColor: colorScheme == "light" ? "#474747" : "white" }}
          selectedValue={day}
          onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
        >
          <Picker.Item label="1. Gün" value="0" />
          <Picker.Item label="2. Gün" value="1" />
        </Picker>
      </View>
      <View>
        <Text style={{ color: colorScheme == "light" ? "black" : "white" }}>Kaçıncı oturum?</Text>
        <Picker
          style={{ color: colorScheme == "light" ? "white" : "black", width: 200, backgroundColor: colorScheme == "light" ? "#474747" : "white" }}
          selectedValue={day}
          onValueChange={(itemValue, itemIndex) => setSession(itemValue)}
        >
          <Picker.Item label="1. Oturum" value="1" />
          <Picker.Item label="2. Oturum" value="2" />
          <Picker.Item label="3. Oturum" value="3" />
          <Picker.Item label="4. Oturum" value="4" />
          <Picker.Item label="5. Oturum" value="5" />
        </Picker>
      </View>
      <Button 
        title="Katılımcıyı kaydet"
        onPress={async () => {
          setLoading(true);
          const res = await axios.post("https://yzt-mobil-backend.vercel.app/qr-control/", {
            type: qr.type,
            event: qr.event,
            user: qr.user,
            session: day + session,
          })
          console.log(res.data)
          setLoading(false);
          if(res.data.ticketValidation == true){
            router.replace("/three")
          }else{
            router.replace("/four")
          }
        }}
      />
      {
        loading && (
          <AnimatedLoading />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 50,
    gap: 20,
    // backgroundColor: "rgba(31,31,31,0.8)"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

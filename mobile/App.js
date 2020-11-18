import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import UserList from "./components/usersList";
import Pushes from "./components/pushes";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Constants from "expo-constants";
import * as Device from "expo-device";
import useSWR from "swr";
import Axios from "axios";

let api_url = "http://algumaurldeProdução";
if (process.env.NODE_ENV !== "production") {
  api_url = process.env.REACT_APP_API || "http://192.168.1.150:8000/api/v1/";
}

const api = Axios.create({
  baseURL: api_url,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  title: {
    marginTop: "8%",
    fontSize: 40,
    fontWeight: "bold",
    color: "#ba68c8",
  },
  list: {
    marginTop: 20,
  },
});

export default function App() {
  const [dialog, setDialog] = useState({
    open: false,
    id: null,
  });

  const { data: users } = useSWR("users", async () => {
    const us = await api.get("/users/");
    return us.data;
  });

  const { data: pushes } = useSWR(
    "pushes",
    async () => {
      const ps = await api.request({
        method: "GET",
        url: "/pushes/",
        params: {
          name: Device.deviceName,
          email: "email@email.com.br",
          deviceId: Constants.deviceId,
        },
      });
      return ps.data;
    },
    {
      refreshInterval: 1000,
    }
  );

  async function sendPush(id) {
    setDialog({ open: false, id: null });
    const ret = await api.post("/pushes/", {
      deviceId: Constants.deviceId,
      targetId: id,
    });
    mutate("pushes", undefined);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PushMe!</Text>
      <ConfirmDialog
        title="Confirme o Push"
        message={`Deseja enviar um push para ${
          dialog.id
            ? users.find((u) => u.deviceId === dialog.id).name
            : "Sem nome"
        }?`}
        visible={dialog.open}
        onTouchOutside={() => setDialog({ open: false, id: null })}
        positiveButton={{
          title: "Sim",
          onPress: () => sendPush(dialog.id),
        }}
        negativeButton={{
          title: "Não",
          onPress: () => setDialog({ open: false, id: null }),
        }}
      />
      <UserList
        style={styles.list}
        users={users}
        onUserClick={(id) => setDialog({ open: true, id })}
        api={api}
      />
      <Pushes style={styles.list} users={users} pushes={pushes} api={api} />
    </View>
  );
}

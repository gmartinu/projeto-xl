import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { mutate } from "swr";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "45%",
  },
  pushPaper: {
    backgroundColor: "#ba68c8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    width: "100%",
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
  },
  pushRowTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    width: "auto",
  },
  pushRowDesc: {
    width: "auto",
    color: "white",
    fontSize: 20,
  },
  pushRowContent: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  pushRowButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  pushRowButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#ba68c8",
  },
});

function PushRow(props) {
  const { push, user, type, api } = props;
  return (
    <View style={styles.pushPaper}>
      <View style={styles.pushRowContent}>
        <Text style={styles.pushRowTitle}>{user.name}, </Text>
        <Text style={styles.pushRowDesc}>
          {type === 0 ? "Confirmou seu push." : "Te enviou um Push!"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.pushRowButton}
        onPress={async () => {
          const ret = await api.post(`/pushes/${push.id}`);
          mutate("pushes", undefined);
        }}
      >
        <Text style={styles.pushRowButtonText}>
          {type === 0 ? "OK" : "CONFIRMAR"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Pushes(props) {
  return (
    <View style={[styles.container, props.style]}>
      {props.users && props.users?.length > 0 ? (
        <FlatList
          data={props.pushes}
          renderItem={({ item }) => (
            <PushRow
              api={props.api}
              push={item}
              type={item.confirma ? 0 : 1}
              user={props.users?.find((u) => {
                if (item.pendente) {
                  return u.DeviceID === item.DeviceID;
                } else {
                  return u.DeviceID === item.TargetID;
                }
              })}
            />
          )}
        />
      ) : null}
    </View>
  );
}

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "38%",
  },
  userRowPaper: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    width: "100%",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  userRowName: {
    fontSize: 20,
    color: "#ba68c8",
  },
});

function UserRow(props) {
  const { user } = props;
  return (
    <TouchableOpacity
      style={styles.userRowPaper}
      onPress={() => props.onUserClick(user.deviceId)}
    >
      <Text style={styles.userRowName}>{user.name}</Text>
    </TouchableOpacity>
  );
}

export default function UserList(props) {
  return (
    <View style={[styles.container, props.style]}>
      <FlatList
        data={props.users}
        renderItem={({ item }) => (
          <UserRow user={item} onUserClick={props.onUserClick} />
        )}
      />
    </View>
  );
}

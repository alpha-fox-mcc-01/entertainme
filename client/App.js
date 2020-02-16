import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movies from "./screens/Movies";
import TvSeries from "./screens/TvSeries";

import { Ionicons } from "@expo/vector-icons";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Movies") {
                iconName = "ios-albums";
              } else if (route.name === "TvSeries") {
                iconName = "ios-tv";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
            activeBackgroundColor: "grey"
          }}
        >
          <Tab.Screen name="Movies" component={Movies} />
          <Tab.Screen name="TvSeries" component={TvSeries} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

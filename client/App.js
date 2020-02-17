import React from "react";
import { StyleSheet} from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider} from "@apollo/react-hooks";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import InputForm from "./InputForm";
import InputSeries from "./InputSeries";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#e91e63",
            activeBackgroundColor: "black",
            inactiveBackgroundColor: "black"
          }}
        >
          <Tab.Screen
            name="All"
            component={Home}
            options={{
              tabBarLabel: "All",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Add Movie"
            component={InputForm}
            options={{
              tabBarLabel: "Add Movie",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Add TV Series"
            component={InputSeries}
            options={{
              tabBarLabel: "Add TV Series",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus" color={color} size={size} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  }
});

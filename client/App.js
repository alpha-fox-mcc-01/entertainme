import React, { useEffect, useState } from 'react';
import { Text, Keyboard } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieScreen from './screens/Movie';
import TvSeriesScreen from './screens/TvSeries';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

export default function App() {
  let keyboardDidShowListener = null;
  let keyboardDidHideListener = null;
  const [isTabBarShowing, setIsTabBarShowing] = useState(true);

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsTabBarShowing(false)
    );
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setTimeout(() => {
        setIsTabBarShowing(true);
      }, 10);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: props => {
              let iconColor;
              let iconName;

              if (route.name === 'Movies') {
                iconColor = props.focused ? 'red' : 'grey';
                iconName = 'movie';
                // setColorTypo('red');
                // console.log('masuk', colorTypo);
              } else if (route.name === 'TvSeries') {
                iconColor = props.focused ? '#236B8E' : 'grey';
                iconName = 'television';
                // setColorTypo('#236B8E');
              }
              // console.log(props);
              return (
                <>
                  <Icon name={iconName} color={iconColor} size={props.size} />
                  <Text style={{ fontSize: 10, color: iconColor }}>
                    {route.name}
                  </Text>
                </>
              );
            },
          })}
          tabBarOptions={{
            inactiveTintColor: 'grey',
            showLabel: false,
          }}
        >
          <Tab.Screen
            name='Movies'
            component={MovieScreen}
            options={{ tabBarVisible: isTabBarShowing }}
          />
          <Tab.Screen
            name='TvSeries'
            component={TvSeriesScreen}
            options={{ tabBarVisible: isTabBarShowing }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

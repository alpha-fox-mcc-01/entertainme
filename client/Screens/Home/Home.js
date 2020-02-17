import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from './Index/Index';
import ListMovies from "./ListMovies";
import ListSeries from "./ListSeries"


const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <>
        <Drawer.Navigator initialRouteName="Index">
          <Drawer.Screen name="Index" component={Index} />
          <Drawer.Screen name="List Movies" component={ListMovies} />
          <Drawer.Screen name="List Series" component={ListSeries} />
        </Drawer.Navigator>
    </>
  );
}



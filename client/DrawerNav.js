import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListMovies from './ListMovies'
import ListSeries from './ListSeries'
export default function DrawerNav(){
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="List Movies" component={ListMovies} />
          <Drawer.Screen name="List Series" component={ListSeries} />
        </Drawer.Navigator>
      );
}
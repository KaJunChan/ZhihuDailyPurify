'use strict'

import React, {Component} from 'react';
import {DrawerNavigator, StackNavigator} from "react-navigation";
import Theme from "./theme";
import Purify from "./newPurify/Purify";
import Detail from "./Detail";

const Drawer = DrawerNavigator({
    Purify: {
        screen: Purify,
    },
    Theme: {
        screen: Theme,
    }
});

const MainNavigator = StackNavigator({
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            title: '首页',
        }
    },
    Theme: {
        screen: Theme,
    },
    Detail: {
        screen: Detail,
    }
}, {
    navigationOptions: {
        width: 200,
    }
});

export default MainNavigator;







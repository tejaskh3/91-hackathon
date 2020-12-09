import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import AddSection from '../components/AddPage';
import Expenses from '../components/Expenses';
import Header from '../components/Header';
import ChartPage from '../components/PieChart';
import {confirmStatus, pendingStatus, categoriesData} from '../data/dummyData';

export default function Home() {

    const categoryListHeightAnimationValue = useRef(new Animated.Value(172.5)).current;
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [categories, setCategories] = React.useState(categoriesData);
    const [viewMode, setViewMode] = React.useState("expenses");

    const NavbarButtonHandler = (mode) => {
        console.log(`NavBar ${mode} Button is pressed!!`);
        setViewMode(mode);
    }

    const categoryButtonHandler = (item) => {
        console.log(`${item.name} category button is pressed....`);
        setSelectedCategory(item);
    }

    const viewModeHandler = (mode) => {
        console.log("ViewMode change Button is pressed.");
        setViewMode(mode);
    }

    return (
        <View>

            {<Header viewMode={viewMode} NavbarButtonHandler={NavbarButtonHandler} />}

            {
                viewMode == "expenses" &&
                <Expenses   clhav={categoryListHeightAnimationValue} 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={categoryButtonHandler} 
                            setViewMode={viewModeHandler} /> 
                
            }
            {
                viewMode == "chart" &&
                <ChartPage />
            }
            {
                viewMode == "add" &&
                <AddSection />
            }
            
        </View>
    );
}
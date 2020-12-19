import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert, Picker, ScrollView } from 'react-native';
import * as myConstClass from '../../screens/HttpLink';

export default function ManualAdd({ categoriesData, people, AddProductSaveButtonHandler }) {
    const [selectedValue, setSelectedValue] = useState("Food");
    const [productName, setProductName] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();

    const updateUserData = async() =>{
        fetch(`${myConstClass.HTTP_LINK}/updatePerson`,{
            method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:people._id,
                    name: people.name,
                    income: people.income,
                    savings: people.savings,
                    targetToSave: people.targetToSave,
                    thisMonthStatus: people.thisMonthStatus,
                    totalExpenses: parseInt(people.totalExpenses)+parseInt(total)
                })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${people.name} has been updated`)
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }

    const updateCategoryExpense = async() =>{
        for(var i in categoriesData){
            if(categoriesData[i].name === category){
                fetch(`${myConstClass.HTTP_LINK}/updateCategory`,{
                    method:"post",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            id:categoriesData[i]._id,
                            name: categoriesData[i].name,
                            icon: categoriesData[i].icon,
                            color: categoriesData[i].color,
                            totalExpenseInThis: parseInt(categoriesData[i].totalExpenseInThis) + parseInt(total)
                        })
                })
                .then(res=>res.json())
                .then(data=>{
                    Alert.alert(`Details of ${people.name} has been updated`)
                })
                .catch(err=>{
                    Alert.alert("Some Error")
                    console.log(err)
        })
            }
        }
    }

    return (
        <View>
            <Text style={{fontFamily: 'GothamLight', color:"black", textAlign: "center", paddingTop: 30}}>OR</Text>
            <View style={styles.container} >
                <Text style={{
                    textAlign: "center", 
                    color:"black", 
                    fontFamily:"GothamBold", 
                    fontSize: 17, 
                    paddingBottom: 10,
                }}>Add Product</Text>

                <View style={{borderBottomWidth: 1, borderBottomColor: "black", marginHorizontal: 60, marginBottom: 20}} />
                <Text style={styles.Text}>Product Name</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="Enter name here.." 
                    value={productName}
                    onChangeText={text => setProductName(text)}
                />

                <Text style={styles.Text}>Category</Text>
                <View style={{
                    backgroundColor: "white",
                    marginTop: 8,
                    marginBottom: 12,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#D1D1D1",
                }}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        
                        {categoriesData.map((item) => {
                            return (
                                <Picker.Item key={item._id} label={item.name} value={item.name} />
                            );  
                        })}
                    </Picker>
                </View>

                <Text style={styles.Text}>Amount</Text>
                <TextInput 
                    style={styles.inputField}
                    placeholder="694.20" 
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />

                <Text style={styles.Text}>Description</Text>
                <TextInput 
                    style={styles.inputField}
                    value={description}
                    onChangeText={text => setDescription(text)}
                />
                <TouchableOpacity 
                    style={{paddingTop: 10,marginTop: 10, marginBottom: 20}}
                    onPress={() => {
                        //addExpense();
                        const obj = {
                            title: productName,
                            description: description,
                            category: selectedValue,
                            total: Number(amount)
                        }
                        AddProductSaveButtonHandler(obj);
                    }}
                >
                    <View style={styles.button}>
                        <Text style={{color: "white", textAlign: "center", fontFamily: 'GothamMedium'}}>Add Product</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 10,
    }, 
    inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
        marginTop: 8,
        marginBottom: 12,
        fontFamily: 'GothamLight', 
        fontSize: 14,
    },

    Text : {
        fontSize: 14,
        color: "black",
        marginLeft: 2,
        paddingTop: 8,
        fontFamily: 'GothamMedium',
    },

    button : {
        backgroundColor: "#222222",
        padding: 12,
        borderRadius: 6,
    }
})
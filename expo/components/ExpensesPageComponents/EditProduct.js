import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Alert, Picker } from 'react-native'
import HTTP_LINK from '../../screens/HttpLink';

export default function EditProduct({ item, categoriesData, NavbarButtonHandler }) {
    const [selectedValue, setSelectedValue] = useState(item.category);

    const [_id, set_id] = useState(item._id);
    const [productName, setProductName] = useState(item.title);
    const [amount, setAmount] = useState(item.total.toString());
    const [description, setDescription] = useState(item.description);

    const updateData = () => {
        console.log("Yooooo Bitch!!!");
        fetch(`${HTTP_LINK}/updateExpense`,{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id,
                title:productName,
                description:description,
                category:selectedValue,
                total:Number(amount)
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${productName} has been updated`)
            setViewMode("expense")
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
        NavbarButtonHandler("expenses");
    }

    return (
        <View style={styles.container} >
            <Text style={styles.Text}>Product Name</Text>
            <TextInput 
                style={styles.inputField}
                value={productName}
                onChangeText={(text) => setProductName(text)}
            />

            <Text style={styles.Text}>Category</Text>
            
            <View style={{
                backgroundColor: "white",
                marginTop: 8,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#D1D1D1",
            }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 350 }}
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
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => updateData()}
            >
                <View style={styles.button}>
                    <Text style={{color: "white", textAlign: "center"}}>Edit Product</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{paddingTop: 10,marginTop: 10}}
                onPress={() => NavbarButtonHandler("expenses")}
            >
                <View style={{
                    backgroundColor: "white",
                    padding: 12,
                    borderRadius: 6,
                }}>
                    <Text style={{color: "black", textAlign: "center"}}>Cancel</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingTop: 30,
    }, 
    inputField : {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D1D1",
        borderRadius: 5,
        padding: 10,
    },

    Text : {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        paddingTop: 8,
    },

    button : {
        backgroundColor: "#222222",
        padding: 12,
        borderRadius: 6,
    }
})
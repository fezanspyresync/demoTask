import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../utility/constant';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function Calculate() {
  const [fNumber, setFNumber] = useState('');
  const [sNumber, setSNumber] = useState('');
  const [result, setResult] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {label: 'Add', value: 'add'},
    {label: 'Multiply', value: 'multiply'},
    {label: 'Divide', value: 'div'},
    {label: 'Subtract', value: 'sub'},
  ]);

  const onOpenDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measureHeight(setDropdownHeight);
    }
    setOpen(true);
  };

  const funHandler = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const data = {
        param1: fNumber,
        param2: sNumber,
      };
      if (fNumber && sNumber && value) {
        setLoading(true);
        console.log(typeof value);
        const response = await axios.get(
          `https://faizanappbackend-625bfe2f0c97.herokuapp.com/${value}`,
          {
            headers: headers,
            params: data,
          },
        );

        console.log('Response data:', response.data);
        setLoading(false);
        setResult(response.data);
      } else {
        Toast.show({
          type: 'info',
          text1: 'info',
          text2: 'Please provide correct info',
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'oops',
        text2: {error},
      });
    }
  };

  console.log(result);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            width: widthPercentageToDP('90'),
            marginTop: heightPercentageToDP(20),
          }}>
          <TextInput
            value={fNumber}
            onChangeText={setFNumber}
            style={styles.inputStyle}
            placeholder="Number"
            keyboardType="numeric"
            placeholderTextColor={'#000'}
          />
          <TextInput
            value={sNumber}
            onChangeText={setSNumber}
            style={styles.inputStyle}
            keyboardType="numeric"
            placeholder="Number"
            placeholderTextColor={'#000'}
          />
          <DropDownPicker
            ref={dropdownRef}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            autoScroll={true}
            placeholder={'Please choose operation'}
            style={{
              borderColor: colors.orange,
              marginVertical: heightPercentageToDP(1),
              color: '#000',
            }}
            dropDownContainerStyle={{
              borderColor: colors.orange,
              backgroundColor: 'white',
              marginTop: dropdownHeight, // Adjust UI position based on dropdown height
              color: '#000',
            }}
            dropDownDirection="BOTTOM"
            onOpen={onOpenDropdown}
          />
        </View>
        <Text style={{marginVertical: 10, color: '#000'}}>
          {result && (
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
              After calculation:{result.match(/\d+/)[0]}
            </Text>
          )}
        </Text>
        <TouchableOpacity
          onPress={() => funHandler()}
          style={{
            width: widthPercentageToDP(70),
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.orange,
            borderRadius: 10,
          }}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.orange} />
          ) : (
            <Text style={{color: '#000'}}>Calculate</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: heightPercentageToDP(1),
    color: '#000',
  },
});

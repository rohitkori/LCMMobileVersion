import React, { Component } from 'react';
import { Picker,TextInput, TouchableOpacity,ScrollView,Button, StyleSheet, Text, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithmTypeId: '',
      inputs: '',
      timeComplexity: '',
      spaceComplexity: '',
      result: '',
      inputsError: '',
      algorithmError:''

  };

  this.handleAlgorithmTypeIdChange = this.handleAlgorithmTypeIdChange.bind(this);
  this.handleInputsChange = this.handleInputsChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }
  handleInputsChange(e) {
    this.setState({ inputs: e });
}

handleAlgorithmTypeIdChange(e) {
    this.setState({ algorithmTypeId: e.target.value });
}

  handleSubmit = (e) => {
    e.preventDefault();
    const algorithmTypeId = this.state.algorithmTypeId.trim();
    const inputs = this.state.inputs.trim();

    //const isValid = this.validate();

    // if (!isValid)
    //     return;


    const data = new FormData();

    data.append('inputs', inputs);
    data.append('algorithmTypeId', algorithmTypeId);

    const xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:44398/lcm/calculate', true);
    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);
        this.setState({ result: data.result, timeComplexity: data.timeComplexity, spaceComplexity: data.spaceComplexity });
    };
    xhr.send(data);
  }

  render() {
    return (
      <View style={styles.container} submitUrl="">
      <View>
        <Text style={styles.header}>LCM Calculator</Text>
      </View>
      <ScrollView>
      <Picker
  selectedValue={this.state.algorithmTypeId}
  style={{height: 50, width: 100}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({algorithmTypeId: itemValue})
  }>
  <Picker.Item label="Best time complexity" value="1" />
  <Picker.Item label="Best space complexity" value="2" />
  <Picker.Item label="Optimal time and space complexity" value="3" />
</Picker>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      placeholder="Enter comma separated numbers."
      value={this.state.inputs}
      onChangeText={this.handleInputsChange}
    />
  </View>
  <View>
        <Text>Time: {this.state.timeComplexity}</Text>
      </View>
      <View>
        <Text>Space: {this.state.spaceComplexity}</Text>
      </View>
      <View>
        <Text>Result: {this.state.result}</Text>
      </View>
  <View style={styles.inputContainer}>
  <TouchableOpacity
  
    style={styles.saveButton}
    onPress={this.handleSubmit}
  >
    <Text style={styles.saveButtonText}>Calculate LCM</Text>
  </TouchableOpacity>
</View>
</ScrollView>
    </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});
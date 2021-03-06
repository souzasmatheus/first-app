import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  ActivityIndicator
} from 'react-native';

export default class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sectionData: []
    };
  }

  componentWillMount() {
    fetch('https://api.randomuser.me/?nat=US&results=6')
      .then(response => response.json())
      .then(responseJson => {
        let sectionData = [];
        responseJson.results.forEach(person => {
          sectionData.push({
            title: person.name.first,
            data: [person.email]
          });
        });
        this.setState({
          isLoading: false,
          sectionData
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.sectionData}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

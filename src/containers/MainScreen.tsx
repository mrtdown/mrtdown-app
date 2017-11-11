import * as React from "react";
import { Component } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Header from "../components/Header";
import LineRow from "../components/LineRow";
import TweetRow from "../components/TweetRow";
import * as actionCreators from "../redux/action.creators";

class MainScreen extends Component {
  public static navigationOptions = ({ navigation }: any) => ({
    header: (
      <Header
        settingsButton={true}
        navigation={navigation}
      />),

  })
  constructor(props: any) {
    super(props);
    this.props.actions.fetchLineStatus();
  }
  public render() {
    return (
      <View>
        {this.renderError()}
        {this.renderLines()}
        <Button
          title="REPORT A DELAY"
          color="#B63414"
          onPress={() => this.props.navigation.navigate("reporting")}
        />
        {this.renderTweets()}
      </View>
    );
  }

  public renderError() {
    if (this.props.error) {
      return (<Text>Error!!!</Text>);
    }
  }

  public renderLines() {
    return (
      <View>
        {this.props.lines.map((data, index) => this.renderLine(data, index))}
      </View>
    );
  }
  public renderLine(line, i) {
    return (
      <LineRow
        key={i}
        title={line.short_name}
        level={line.level}
        description={line.description} />
    );
  }

  public renderTweets() {
    return (
      <View>
        {
          this.renderTweet({
            handle: "Dabbry Dabllen",
            time: "Time",
            message: "message",
          }, 1)
        }
      </View>
    );
  }
  public renderTweet(tweet, i) {
    return (
      <TweetRow
        key={i}
        handle={tweet.handle}
        description={"Sigh why mrt always down..."}
        timestamp="1h" />
    );
  }
}

const styles = StyleSheet.create({
});
const mapStateToProps = (state: any) => {
  return state;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

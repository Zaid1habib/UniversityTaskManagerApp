import * as WebBrowser from 'expo-web-browser';
import { Link } from 'expo-router';
import { StyleSheet, Platform } from 'react-native';
import { Text } from './Themed';

export default function ExternalLink(props: any) {
  return (
    <Link
      {...props}
      style={[styles.link, props.style]}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.href);
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#2f95dc',
    padding: 15,
  },
});

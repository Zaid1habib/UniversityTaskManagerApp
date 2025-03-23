import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

import ExternalLink from './ExternalLink';
import { MonoText } from './StyledText';
import { Text as ThemedText, View as ThemedView } from './Themed';

import Colors from '@/constants/Colors';

type EditScreenInfoProps = {
  path: string;
};

export default function EditScreenInfo({ path }: EditScreenInfoProps) {
  return (
    <ThemedView>
      <ThemedView style={styles.getStartedContainer}>
        <ThemedText style={styles.getStartedText}>
          Open up the file at:
        </ThemedText>
        <ThemedView style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <Text>{path}</Text>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <ThemedText style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </ThemedText>
        </ExternalLink>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});

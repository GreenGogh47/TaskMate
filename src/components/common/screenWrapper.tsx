import React, { ReactNode } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  ViewStyle,
  ScrollViewProps,
  View
} from 'react-native';
import { SPACING } from '@/src/constants';

interface ScreenWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  scrollViewProps?: ScrollViewProps;
  padding?: number;
  disableScroll?: boolean;
  disableKeyboardAvoiding?: boolean;
  hasVirtualizedList?: boolean; // New prop to handle FlatList/ScrollView conflicts
}

export function ScreenWrapper({ 
  children, 
  style, 
  contentContainerStyle,
  scrollViewProps,
  padding = SPACING.xl,
  disableScroll = false,
  disableKeyboardAvoiding = false,
  hasVirtualizedList = false
}: ScreenWrapperProps) {
  const containerStyle = [styles.container, style];
  const contentStyle = [
    styles.content, 
    { padding }, 
    contentContainerStyle
  ];

  // If we have a VirtualizedList or scroll is disabled, don't use ScrollView
  const shouldDisableScroll = disableScroll || hasVirtualizedList;

  if (disableKeyboardAvoiding) {
    return (
      <View style={containerStyle}>
        <View style={contentStyle}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {shouldDisableScroll ? (
        <View style={[contentStyle, { flex: 1 }]}>
          {children}
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

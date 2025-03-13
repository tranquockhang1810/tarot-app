import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import React from 'react';
import useColor from '@/src/hooks/useColor';

const Screen = ({
  children,
  style,
  header,
}: {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  header?: () => React.JSX.Element;
}) => {
  const { brandPrimaryDark, brandPrimaryTap } = useColor();

  return (
    <View
      style={StyleSheet.flatten([
        {
          flex: 1,
          backgroundColor: brandPrimaryDark,
          paddingTop: header ? 0 : 30,
        },
        style,
      ])}
    >
      {header && <View style={{ ...styles.header, backgroundColor: brandPrimaryTap }}>{header()}</View>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});

export default Screen;

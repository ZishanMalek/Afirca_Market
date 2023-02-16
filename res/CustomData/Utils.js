export const UtilsStyles = StyleSheet.create({
  flex1: {flex: 1},
  flexDirectionRow: {
    flexDirection: 'row',
  },
  centerDiv: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerDivWithFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalFontStyle: {
    padding: 5,
    // fontFamily: Fonts.MediamFont,
    fontSize: 18,
    color: '#000',
  },
  headingFontStyle: {
    padding: 5,
    // fontFamily: Fonts.BoldFont,
    fontSize: 22,
    color: '#000',
  },
  CIRCLE: SIZE => ({
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE,
  }),
  padingView15: {
    padding: 15,
  },
  customPadding: SIZE => ({
    padding: SIZE,
  }),
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  TextalignCenter: {
    textAlign: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
});

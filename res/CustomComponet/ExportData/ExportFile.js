import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const productHorzotaldtaGet = [
  {
    id: 1,
    image: Images['laptop'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    sky: Images['skyheart'],
    threeDot: Images['threedots'],
    delete: Images['deleted'],

    heart: Images['heart'],
  },
  {
    id: 2,
    image: Images['apple'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    threeDot: Images['threedots'],

    heart: Images['heart'],
    delete: Images['deleted'],
  },
  {
    id: 3,
    image: Images['apple1'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    threeDot: Images['threedots'],

    heart: Images['heart'],
    delete: Images['deleted'],
  },
  {
    id: 4,
    image: Images['pc'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    heart: Images['heart'],
    threeDot: Images['threedots'],
    delete: Images['deleted'],
  },
  {
    id: 5,
    image: Images['laptop'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    heart: Images['heart'],
    threeDot: Images['threedots'],
    delete: Images['deleted'],
  },
  {
    id: 6,
    image: Images['laptop'],
    title: 'Laptop macbook air',
    price: '$432',
    eye: Images['eye_open'],
    threeDot: Images['threedots'],
    delete: Images['deleted'],

    heart: Images['heart'],
  },
  {
    id: 7,
    image: Images['laptop'],
    title: 'Laptop macbook air',
    price: '$432',
    threeDot: Images['threedots'],

    eye: Images['eye_open'],
    heart: Images['heart'],
    delete: Images['deleted'],
  },
  {
    id: 8,
    image: Images['laptop'],
    title: 'Laptop macbook air',
    price: '$432',
    threeDot: Images['threedots'],

    eye: Images['eye_open'],
    delete: Images['deleted'],

    heart: Images['heart'],
  },
];
export const ProdudataNearYor = ({data}) => {
  return (
    <View style={{alignSelf: 'center'}}>
      <View
        style={{
          width: WIDTHGet * 0.44,
          // height: HEIGHTGet * 0.8,
          // backgroundColor: 'red',
          // top: 10,
          // alignItems: 'center',
          alignSelf: 'center',
          // borderWidth: 1,
          marginTop: 10,
          // borderWidth: 1,
          // marginHorizontal: WIDTHGet / 100,
          marginVertical: 10,
          // paddingHorizontal: 10,

          // flex: WIDTHGet * 0.7,

          //   marginStart: 10,
        }}>
        <Image
          source={data.image}
          style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
        />
        <Text
          style={{
            fontFamily: Fonts.regular,
            marginTop: 4,
            color: '#202328',
            fontSize: FontSize.size._15px,
          }}>
          {data.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            // borderWidth: 1,
            width: WIDTHGet * 0.44,
            alignItems: 'center',
            marginTop: 6,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._15px,
            }}>
            {data.price}
          </Text>
          <Image
            source={data.eye}
            style={{
              width: 24,

              marginStart: 60,
              height: 20,
            }}
          />
          <Image
            source={data.heart}
            style={{
              width: 24,

              height: 20,
            }}
          />
        </View>
      </View>
    </View>
  );
};
export const Produdata = ({data}) => {
  console.log(data.eye);
  const navigation = useNavigation();
  const [iscolor, setiscolor] = useState(false);
  console.log(data.id);
  return (
    <View
      style={{
        width: WIDTHGet * 0.44,
        // height: heightPercentageToDP('30%'),
        height: 195,
        // backgroundColor: 'red',
        // top: 10,
        // borderWidth: 1,
        marginTop: 10,
        // marginHorizontal: 4,
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('ProductDetailsScreen', data);
        }}>
        <Image
          source={data.image}
          style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
        />
      </Pressable>
      <Text
        style={{
          fontFamily: Fonts.regular,
          marginTop: 4,
          color: '#202328',
          fontSize: FontSize.size._15px,
        }}>
        {data.title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          marginTop: 6,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#202328',
            fontSize: FontSize.size._15px,
          }}>
          {data.price}
        </Text>
        <Image
          source={data.eye}
          style={{
            width: 24,

            marginStart: 60,
            height: 20,
          }}
        />
        <Pressable
          onPress={() => {
            setiscolor(!iscolor);
            console.log(data.id);
          }}>
          <Image
            //   source={iscolor ? data.sky : dat}

            source={iscolor ? Images['skyheart'] : Images['heart']}
            style={{
              width: 24,

              // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
              height: 20,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};
const ExportFile = () => {
  return (
    <View>
      <Text>ExportFile</Text>
    </View>
  );
};

export default ExportFile;

const styles = StyleSheet.create({});

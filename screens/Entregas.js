import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Icon, ListItem, Text } from 'react-native-elements'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export default function Entregas() {
  const navigation = useNavigation()

  return (
    <ScrollView>
      <Text h4 style={styles.center}>Entregar a operador</Text>
      <Card containerStyle={styles.headerBoton}>
        <Button
          icon={
            <Icon
              type="material-community"
              name="qrcode-scan"
              iconStyle={styles.iconCode}
              size={25}
            />
          }
          title="SCAN CODE"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("ScanCode")}
        />
      </Card>
      <ImageRamdom />
    </ScrollView>
  )
}

const ImageRamdom = () => {
  const [image, setImage] = useState(null)

  useFocusEffect(
    useCallback(() => {
      const imageRoute = async () => {

        ramdom()

      }
      imageRoute()
    }, [])
  )

  const ramdom = () => {
    var num = Math.ceil(Math.random() * 6)

    switch (num) {
      case 1:
        setImage(require('../assets/1.png'))
        break
      case 2:
        setImage(require('../assets/2.png'))
        break
      case 3:
        setImage(require('../assets/3.png'))
        break
      case 4:
        setImage(require('../assets/4.png'))
        break
      case 5:
        setImage(require('../assets/5.png'))
        break
      case 6:
        setImage(require('../assets/6.png'))
        break

      default:
        break
    }
  }

  if (image == null) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="#5d005c"
        />
      </View>
    )
  } else {
    return (
      <Card>
        <Card.Divider />
        <Card.Image
          source={image}
          style={{ width: 350, height: 400 }}
        />
        <Card.Divider />
      </Card>
    )
  }

}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center'
  },
  header: {
    backgroundColor: "#E9DDE9",
    borderRadius: 10
  },
  headerBoton: {
    borderRadius: 10
  },
  textlogi: {
    color: "#5d005c",
    textAlign: 'left'
  },
  iconCode: {
    color: "#FFF"
  },
  button: {
    backgroundColor: "#5d005c",
    borderRadius: 15
  },
  icon: {
    color: "#DA8B00",
    textAlign: 'right'
  },
  address: {
    color: "#0055F5"
  },
  body: {
    flex: 1
  }
})

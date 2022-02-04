import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Card, Icon, ListItem, Text } from 'react-native-elements'

export default function Entregas() {
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
          onPress={() => navigation.navigate("ScanEnv", { tokenMens: tokenAuth })}
        />
      </Card>
      <Card>
        <Card.Divider />
        <Card.Image
          source={require('../assets/2.png')}
          style={{ width: 350, height: 400 }}
        />
        <Card.Divider />
      </Card>
    </ScrollView>
  )
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

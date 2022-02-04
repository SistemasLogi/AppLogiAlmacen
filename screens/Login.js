import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, TouchableHighlight, Image, View } from 'react-native'
import { Button, Divider, Icon, Input, Text } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { size } from 'lodash'
import * as SecureStore from 'expo-secure-store'

import { GET_TOKEN, GET_URL } from '../utils/Querys'
import Loading from '../components/Loading'
import * as RootNavigation from '../navigations/RootNavigation'
import { deleteValueToken } from '../utils/Actions'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues)
  const [errorUsuario, setErrorUsuario] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [loadingComp, setLoadingComp] = useState(false)

  useEffect(() => {
    const checkResponse = async () => {
      await deleteValueToken('toklogialmac')
    }
    checkResponse()
  }, [])

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const registerMensajero = () => {
    if (!validateData()) {
      return
    }
    setLoadingComp(true)

    //console.log("Datos OK..!!") 

    dataResponse()

  }

  const query = GET_TOKEN(formData.usuario, formData.password)

  const url = GET_URL

  const dataResponse = async () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: null
      })
    })
      .then(r => r.json())
      .then(async data => {
        await accionAsincrona()
        //console.log(data.data.emp_pass)            
        if (data.data.emp_pass) {
          let tokPass = await data.data.emp_pass[0].token
          save('toklogialmac', tokPass)
          setLoadingComp(false)
          //alert('Usuario Logeado')
          RootNavigation.navigate("Navigation")
        } else {
          setLoadingComp(false)
          setErrorUsuario("Usuario o contraseña no validos")
        }

      }).catch(error => console.error(error))
  }

  const accionAsincrona = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 300)
    })
  }

  const validateData = () => {
    setErrorPassword("")
    setErrorUsuario("")
    let isValid = true

    if (size(formData.usuario) < 5) {
      setErrorUsuario("El nombre de usuario debe tener al menos 5 caracteres.")
      isValid = false
    }

    if (size(formData.password) < 5) {
      setErrorPassword("Debes ingresar una clave de al menos 5 caracteres.")
      isValid = false
    }

    return isValid
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value)
  }


  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../assets/logo_initial.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>ALMACEN</Text>
        <Divider style={styles.divider} />
        <Input
          placeholder='Usuario'
          onChange={(e) => onChange(e, "usuario")}
          errorMessage={errorUsuario}
          defaultValue={formData.usuario}
          rightIcon={
            <Icon
              type="material-community"
              name="account"
              iconStyle={styles.icon}
            />
          }
        />
        <Input
          placeholder='Contraseña'
          password={true}
          secureTextEntry={!showPassword}
          onChange={(e) => onChange(e, "password")}
          errorMessage={errorPassword}
          defaultValue={formData.password}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off" : "eye-check"}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Button
          title="INGRESAR"
          buttonStyle={styles.button}
          onPress={() => registerMensajero()}
        />
      </View>
      <Loading isVisible={loadingComp} text={"Iniciando Sesión..."} />
    </KeyboardAwareScrollView>
  )


}

const defaultFormValues = () => {
  return { usuario: "", password: "" }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#5d005c",
    borderRadius: 15
  },
  container: {
    marginHorizontal: 40
  },
  divider: {
    backgroundColor: "#5d005c",
    margin: 40,
    height: 2
  },
  title: {
    marginHorizontal: 10,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "#5d005c"
  },
  icon: {
    color: "#d2c2d1"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17
  }
})
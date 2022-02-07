import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'

import Loading from '../components/Loading'
import { getTextToken, getValueToken } from '../utils/Actions'
import { GET_DATA_PROFILE, GET_URL } from '../utils/Querys'
import LogingStack from './LogingStack'
import NavigationStack from './NavigationStack'
import { navigationRef } from './RootNavigation'

export default function Initial() {
  const [tokenKey, setTokenKey] = useState(null)

  useEffect(() => {
    const checkResponse = async () => {
      let response = await getValueToken('toklogialmac')
      //console.log(response)
      if (response == true) {
        await dataResponse()
      } else {
        setTokenKey(false)
      }
    }
    checkResponse()
  }, [])

  const query = GET_DATA_PROFILE

  const url = GET_URL

  const dataResponse = async () => {
    let tokenMens = await getTextToken('toklogialmac')
    //console.log(tokenMens)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${tokenMens}`
      },
      body: JSON.stringify({
        query,
        variables: null
      })
    })
      .then(r => r.json())
      .then(async data => {
        await accionAsincrona()
        //console.log(data)
        if (data.error_6) {
          //console.log(data)
          await deleteValueToken('toklogialmac')
          setTokenKey(false)
        }
        if (data.data) {
          //console.log(data.data.datos_emp_user[0])
          setTokenKey(true)
        }
      }).catch(error => {
        console.error(error)
        deleteValueToken('toklogialmac')
        setTokenKey(false)
      })
  }

  const accionAsincrona = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200)
    })
  }

  if (tokenKey == null) {
    return <Loading isVisible={true} text="Iniciando..." />
  }

  if (tokenKey === false) {
    return (
      <NavigationContainer ref={navigationRef}>
        <LogingStack />
      </NavigationContainer>
    )
  } else if (tokenKey === true) {
    return (
      <NavigationContainer ref={navigationRef}>
        <NavigationStack />
      </NavigationContainer>

    )
  }
}

const styles = StyleSheet.create({})

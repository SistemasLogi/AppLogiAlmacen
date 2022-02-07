import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Card, Button, Text, Divider } from 'react-native-elements'

import { deleteValueToken } from '../../utils/Actions'
import * as RootNavigation from '../../navigations/RootNavigation'
import { GET_DATA_PROFILE, GET_URL } from '../../utils/Querys'
import Loading from '../../components/Loading'

export default function Perfil({ tokenAuth }) {
    const [mensajeroData, setMensajeroData] = useState(defaultDataMensajero)
    const [loadingComp, setLoadingComp] = useState(false)

    useEffect(() => {
        setLoadingComp(true)
        const dataMensjero = async () => {
            await dataResponse()
        }
        dataMensjero()
    }, [])

    const query = GET_DATA_PROFILE

    const url = GET_URL

    const dataResponse = async () => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${tokenAuth}`
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
                    RootNavigation.navigate("Login")
                    return
                }
                if (data.data.datos_emp_user) {
                    let nameAlmacenista = await data.data.datos_emp_user[0]
                    setMensajeroData({ name: nameAlmacenista.emp_nombre })
                    setLoadingComp(false)
                } else {

                }

            }).catch(error => {
                console.error(error)
                deleteValueFor()
            })
    }

    const accionAsincrona = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 200)
        })
    }

    const deleteValueFor = async () => {

        let deleteToken = await deleteValueToken('toklogialmac')

        if (deleteToken === true) {
            RootNavigation.navigate("Login")
        } else {
            alert('No se pudo cerrar sesión')
        }
    }

    const createTwoButtonAlert = () => {
        Alert.alert(
            "Cerrar Sesión",
            "Desea cerrar sesión?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteValueFor() }
            ]
        )
    }

    return (
        <Card>
            <Card.Title>{mensajeroData.name}</Card.Title>
            <Card.Divider />
            <Text style={styles.center}>Estas utilizando la app de Logi Almacen.</Text>
            <Card.Divider />
            <Card.Image source={require('../../assets/logo_initial.png')}>
            </Card.Image>
            <Divider style={styles.divider} />
            <Text style={styles.center}>Pulsa el boton si quieres cerrar sesión</Text>
            <Card.Divider />
            <Button
                title="CERRAR SESION"
                titleStyle={styles.textlogi}
                type="Outline button"
                onPress={() => createTwoButtonAlert()}
            />
            <Loading isVisible={loadingComp} text={"Actualizando..."} />
        </Card>
    )
}

const defaultDataMensajero = () => {
    return { name: "" }
}

const styles = StyleSheet.create({
    buttonClear: {
        backgroundColor: "#FBECB2",
        borderBottomWidth: 1,
        borderColor: "#5d005c"
    },
    button: {
        backgroundColor: "#5d005c"
    },
    center: {
        textAlign: 'center'
    },
    textlogi: {
        color: "#5d005c"
    },
    divider: {
        backgroundColor: "#5d005c",
        margin: 40,
        height: 2
    }
})

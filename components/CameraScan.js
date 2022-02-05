import React, { useState, useEffect, createRef } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Vibration, Image, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Card, Text } from 'react-native-elements'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useNavigation } from '@react-navigation/native'
import BarcodeMask from 'react-native-barcode-mask'

import * as RootNavigation from '../navigations/RootNavigation'

export default function CameraScan() {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [scanned, setScanned] = useState(false)
    const [dateNow, setDateNow] = useState("")
    const [dateScan, setDateScan] = useState("")
    const [listEnvios, setListEnvios] = useState(listaEnviosScan)

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            if (status === 'granted') {
                setHasPermission(true)
            } else {
                Alert.alert('Acceso denegado')
            }
            //console.log(status)
            //setHasPermission(status === 'granted')
        })()
        fechaHoraActual()
    }, [])


    const fechaHoraActual = () => {
        let date = new Date().getDate() //Current Date
        let month = new Date().getMonth() + 1 //Current Month
        let year = new Date().getFullYear() //Current Year
        let hours = new Date().getHours() //Current Hours
        let min = new Date().getMinutes() //Current Minutes
        let sec = new Date().getSeconds() //Current Seconds
        if (month < 10) {
            month = '0' + month
        }
        setDateNow(year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec)
    }

    const handleBarCodeScanned = async ({ type, data }) => {

        fechaHoraActual()
        setPreviewVisible(true)
        setScanned(true)
        Vibration.vibrate()
        console.log('Type: ' + type + ' data: ' + data)

        /*  try {
             let JsonData = JSON.parse(data)
             getState(JsonData.id)
             await accionAsincrona()
         } catch (error) {
             await accionAsincrona()
             Alert.alert(
                 "Cuidado!",
                 "Código no válido!!",
                 [
                     { text: "OK", onPress: () => cameraVisible() }
                 ]
             )
         } */

        //console.log(JsonData.os_id)
        //console.log(listServices)
        Vibration.cancel()
    }

    const camera = createRef()

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    const onLayoutMeasuredHandler = (e) => {
        let dimension = JSON.stringify(e)
        console.log(dimension)
    }

    const getState = (env_id) => {

        let dataServ = false

        const exist = listEnvios.indexOf(env_id)
        if (exist === -1) {
            dataServ = true
            dataResponseEnvRep(env_id)
        } else {
            Alert.alert(
                "OK!",
                "Ya escaneaste este número!!",
                [
                    { text: "OK", onPress: () => cameraVisible() }
                ]
            )
        }

    }

    const accionAsincrona = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 100)
        })
    }

    const accionAsincronaTime = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 50)
        })
    }

    const cameraVisible = () => {
        setPreviewVisible(false)
        setScanned(false)
    }

    //const url = GET_URL
    /* 
        const dataResponseEnvRep = async (info) => {
            await stopBackgroundUpdate()
            const query = INSERT_ESTADO_ENV_REP(info, 5, dateNow, "")
    
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
                    await accionAsincronaTime()
                    //console.log(data)
                    if (data.error_6) {
                        //console.log(data)
                        await deleteValueToken('logitok')
                        RootNavigation.navigate("Login")
                        return
                    }
                    if (data.data.add_est_rep_env_men) {
                        let envioNum = await data.data.add_est_rep_env_men.exe_en_id
                        if (envioNum == info) {
                            //console.log(envioNum)
                            setListEnvios(listEnvios.concat(info))
                            cameraVisible()
                        } else {
                            //console.log(data)
                            Alert.alert(
                                "Error!",
                                "Error en la conexion",
                                [
                                    { text: "OK", onPress: () => cameraVisible() }
                                ]
                            )
                        }
    
                    } else {
                        Alert.alert(
                            "Cuidado!",
                            "Numero no disponible para reparto",
                            [
                                { text: "OK", onPress: () => cameraVisible() }
                            ]
                        )
                    }
                    await startBackgroundUpdate()
                }).catch(error => console.error(error))
        } */

    return (
        <View style={styles.container}>
            <View style={styles.containerDos}>
                {previewVisible ? (
                    <View style={styles.camera}>
                        <Image
                            source={require("../assets/qr.png")}
                            resizeMode="contain"
                            style={styles.imageQr}
                        />
                    </View>
                ) : (
                    <Camera
                        style={styles.camera}
                        barCodeScannerSettings={{
                            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.code128.qr],
                        }}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        type={type}
                        ref={camera}
                    >
                        <Text h3 style={styles.center}>Scan Codes</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                            >
                                <Image
                                    source={require("../assets/touch_icon.png")}
                                    resizeMode="contain"
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        </View>
                        <BarcodeMask
                            edgeColor={'#5d005c'}
                            width={380} height={400}
                            edgeBorderWidth={5}
                        //onLayoutMeasured={onLayoutMeasuredHandler}
                        />
                        <Card containerStyle={styles.headerBoton}>
                            <Button
                                title="FINALIZAR"
                                buttonStyle={styles.buttonFin}
                                onPress={() => navigation.navigate("Entregas")}
                            />
                        </Card>
                    </Camera>
                )}
            </View>
            <ScrollView>
                {previewVisible ? (
                    <ActivityIndicator
                        size="large"
                        color="#5d005c"
                    />
                ) : (
                    <ListServiceComp list={listEnvios} />
                )}
            </ScrollView>
        </View>
    )
}
const ListServiceComp = ({ list }) => {
    if (list != "") {
        return (
            list.map((index, i) => (
                <Card containerStyle={styles.headerEnv} key={i}>
                    <Card.Title>ENVIO N° {index}</Card.Title>
                </Card>
            ))
        )
    } else {
        return <Text>Esperando Envios...</Text>
    }

}

const listaEnviosScan = []

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerDos: {
        height: "75%",
        width: "100%",
        marginBottom: 10
    },
    center: {
        textAlign: 'center',
        color: "#ffff"
    },
    camera: {
        flex: 1
    },
    captura: {
        flex: 1,
        color: "#ffff"
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: "center"
    },
    button: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonFin: {
        backgroundColor: "#5d005c",
        borderRadius: 15,
    },
    headerBoton: {
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    headerEnv: {
        backgroundColor: "#E9DDE9",
        borderRadius: 10
    },
    image: {
        height: 50,
        width: "100%",
        marginBottom: 1
    },
    imageQr: {
        height: "80%",
        width: "80%",
        marginBottom: 2,
        alignSelf: 'center',
        alignItems: 'center'
    }
})

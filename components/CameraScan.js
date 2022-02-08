import React, { useState, useEffect, createRef } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity, Vibration, Image, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Card, Icon, Text } from 'react-native-elements'
import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useNavigation } from '@react-navigation/native'
import BarcodeMask from 'react-native-barcode-mask'

import * as RootNavigation from '../navigations/RootNavigation'
import { GET_AENV_ID, GET_URL, INSERT_EST_AENV } from '../utils/Querys'
import { deleteValueToken, getTextToken } from '../utils/Actions'

export default function CameraScan() {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewVisibleList, setPreviewVisibleList] = useState(false)
    const [scanned, setScanned] = useState(false)
    const [tokenKey, setTokenKey] = useState(null)
    const [dateNow, setDateNow] = useState("")
    const [iconBoton, setIconBoton] = useState("barcode-off")
    const [textBoton, setTextBoton] = useState("BLOQUEAR SCAN..")
    const [listEnvios, setListEnvios] = useState(listaEnviosScan)
    const [total, setTotal] = useState(0)

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync()
            if (status === 'granted') {
                setHasPermission(true)
                let response = await getTextToken('toklogialmac')
                setTokenKey(response)
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
        setPreviewVisibleList(true)
        setScanned(true)
        Vibration.vibrate()
        //console.log('Type: ' + type + ' data: ' + data)

        if (type == 256) {
            try {
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
            }
        } else {
            try {
                getState(data)
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
            }
        }
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

    const inactiveScann = () => {
        if (previewVisible == false) {
            setPreviewVisible(true)
            setIconBoton("barcode-scan")
            setTextBoton("DESBLOQUEAR SCAN..")
        } else {
            setPreviewVisible(false)
            setIconBoton("barcode-off")
            setTextBoton("BLOQUEAR SCAN..")
        }
    }

    const getState = (env_id) => {

        let dataServ = false

        const exist = listEnvios.indexOf(env_id)
        if (exist === -1) {
            dataServ = true
            dataResponseGuiaOp(env_id)
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
        setPreviewVisibleList(false)
        setScanned(false)
    }

    const url = GET_URL

    const dataResponseGuiaOp = async (num_guia) => {
        const query = GET_AENV_ID(num_guia)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${tokenKey}`
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
                    await deleteValueToken('toklogialmac')
                    RootNavigation.navigate("Login")
                    return
                }
                if (data.data.a_envio_x_guia_op) {
                    //console.log(data.data.a_envio_x_guia_op.length)

                    if (data.data.a_envio_x_guia_op.length != 0) {
                        let envioNum = await data.data.a_envio_x_guia_op[0].aen_id
                        let operador = await data.data.a_envio_x_guia_op[0].op_datos[0].ope_nombre
                        //console.log(envioNum)
                        //console.log(operador)
                        await dataResponseEst(envioNum, operador, num_guia)
                    } else {
                        Alert.alert(
                            "Cuidado!",
                            "Numero no registrado en la Base de Datos",
                            [
                                { text: "OK", onPress: () => cameraVisible() }
                            ]
                        )
                    }

                } else {
                    Alert.alert(
                        "Error!",
                        "Error al leer el numero",
                        [
                            { text: "OK", onPress: () => cameraVisible() }
                        ]
                    )
                }
            }).catch(error => console.error(error))
    }

    const dataResponseEst = async (id_env, operador, num_guia) => {
        const query = INSERT_EST_AENV(id_env, 3, dateNow, operador)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${tokenKey}`
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
                    await deleteValueToken('toklogialmac')
                    RootNavigation.navigate("Login")
                    return
                }
                if (data.data.add_est_aenv_alm) {

                    if (data.data.add_est_aenv_alm.length != 0) {
                        setListEnvios(listEnvios.concat(num_guia))
                        let increment = total + 1
                        setTotal(increment)
                        cameraVisible()
                    } else {
                        Alert.alert(
                            "ERROR!",
                            "Envio no procesado",
                            [
                                { text: "OK", onPress: () => cameraVisible() }
                            ]
                        )
                    }

                } else {
                    Alert.alert(
                        "ERROR!",
                        "Envio no procesado",
                        [
                            { text: "OK", onPress: () => cameraVisible() }
                        ]
                    )
                }
            }).catch(error => console.error(error))
    }

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
                            width={330} height={320}
                            edgeBorderWidth={5}
                        //onLayoutMeasured={onLayoutMeasuredHandler}
                        />
                    </Camera>
                )}
            </View>
            <ScrollView>
                <Card containerStyle={styles.headerBoton}>
                    <Button
                        title="FINALIZAR"
                        buttonStyle={styles.buttonFin}
                        onPress={() => navigation.navigate("Entregas")}
                    />
                    <Button
                        icon={
                            <Icon
                                type="material-community"
                                name={iconBoton}
                                iconStyle={styles.textlogi}
                                size={25}
                            />
                        }
                        iconRight
                        title={textBoton}
                        titleStyle={styles.textlogi}
                        type="Outline button"
                        onPress={() => inactiveScann()}
                    />
                </Card>
                <Card>
                    <Card.Title>TOTAL ENV {total}</Card.Title>
                </Card>
                {previewVisibleList ? (
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
        height: "56%",
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
        borderRadius: 10
    },
    headerEnv: {
        backgroundColor: "#fbecd4",
        borderRadius: 15
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
    },
    textlogi: {
        color: "#5d005c"
    }
})

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Loading from '../components/Loading'
import { getTextToken } from '../utils/Actions'
import Perfil from './account/Perfil'

export default function Cuenta() {
    const [tokenKey, setTokenKey] = useState(null)


    useEffect(() => {
        const checkResponse = async()=>{
            let response = await getTextToken('toklogialmac')
            setTokenKey(response)
        }
        checkResponse()
    }, [])    

    
    if(tokenKey == null){
        return <Loading isVisible={true} text="Iniciando..."/>
    }

    return (
        <View>
            <Perfil tokenAuth={tokenKey}/>
        </View>
    )
}

const styles = StyleSheet.create({})

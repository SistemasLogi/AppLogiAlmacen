import * as SecureStore from 'expo-secure-store'

export const getValueToken = async (key) => {
    let tokenLogi = false
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        tokenLogi = true
    }
    return tokenLogi
}

export const getTextToken = async (key) => {
    let tokenText = ''
    let result = await SecureStore.getItemAsync(key)
    if (result) {
        tokenText = result
    } else {
        tokenText = ''
    }
    return tokenText
}

export const deleteValueToken = async (key) => {
    let tokenLogi = false
    let result = await SecureStore.deleteItemAsync(key)
    if (!result) {
        tokenLogi = true
    }
    return tokenLogi
}
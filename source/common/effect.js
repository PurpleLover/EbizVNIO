/**
 * tạo hiệu ứng
 */
import React, { Component } from 'react';
import { Text, View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

function processingEffect(visible) {
    return (
        <Modal onRequestClose={() => { }}
            animationType='fade'
            transparent={true}
            visible={visible}>
            <View style={styles.peContainer}>
                <View style={styles.peBorderBlock}>
                    <ActivityIndicator size={'large'} color={'#005aab'} />
                    <Text style={styles.peText}>
                        ...ĐANG XỬ LÝ
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    peContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    peBorderBlock: {
        backgroundColor: '#fff',
        width: 200,
        height: 100,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }, peText: {
        marginTop: 10,
        fontSize: 14,
        color: '#005aab'
    }
});


export {
    processingEffect
}
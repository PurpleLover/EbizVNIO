import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const filterStyle = StyleSheet.create({
    filterBody: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    filterInput: {
        width: '90%',
        fontSize: 15
    },

    filterResult: {
        backgroundColor: '#eee',
        borderWidth: 0
    },
    filterResultTitleText: {
        color: '#5f5f5f'
    },
    filterResultTotalText: {
        color: '#5f5f5f',
        fontWeight: 'bold'
    }
});

export {
    filterStyle
}
import { StyleSheet } from 'react-native';


const workflowMenuStyle = StyleSheet.create({
    menuOptions: {
        backgroundColor: '#fff'
    }, 
    menuOption: {
        paddingVertical: 10,
        paddingHorizontal: 10, 
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }, 
    menuOptionText: {
        color: 'black'
    }
});


export {
    workflowMenuStyle
}
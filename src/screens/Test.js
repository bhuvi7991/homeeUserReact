import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function MyButton() {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={{ backgroundColor: colors.card }}>
            <Text style={{ color: colors.text }}>Button!</Text>
        </TouchableOpacity>
    );
}
class MyButton extends React.Component {
    render() {
        // Get it from props
        const { theme } = this.props;
    }
}

// Wrap and export
export default function (props) {
    const theme = useTheme();

    return <MyButton {...props} theme={theme} />;
}
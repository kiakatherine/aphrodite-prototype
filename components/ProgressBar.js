import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

function ProgressBar(props) {
    const currentStep = props.currentStep;

    return (
        <>
            <View style={Styles.ProgressBar}>
                <View style={[Styles.ProgressBarStep, (currentStep < 1) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 2) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 3) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 4) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 5) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 6) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 7) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 8) ? Styles.ProgressBarStepIncomplete : null]}></View>
                <View style={[Styles.ProgressBarStep, (currentStep < 9) ? Styles.ProgressBarStepIncomplete : null]}></View>
            </View>
        </>
    );
}

export default ProgressBar;
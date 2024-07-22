import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import React, { useRef } from "react";

interface OtpInputProps {
  value:  Array<string>;
  length: number;
  disabled: boolean;
  onChange: (text: string) => void;
}
const Otp: React.FC<OtpInputProps> = ({
  value,
  length,
  disabled,
  onChange,
}) => {
  const inputRefs = useRef<TextInput[]>([]);
  const onChangeValue = (text: string, index: number) => {
    const newValue = value.map((item, valueIndex) => {
        if (valueIndex === index) {
            return text
        }

        return item
    })

    onChange(newValue.join(''))
}

const handleChange = (text: string, index: number) => {
    onChangeValue(text, index)

    if (text.length !== 0) {
        return inputRefs?.current[index + 1]?.focus()
    }

    return inputRefs?.current[index - 1]?.focus()
}

const handleBackspace = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    const { nativeEvent } = event

    if (nativeEvent.key === 'Backspace') {
        handleChange('', index)
    }
}

  return (
    <View style={styles.container}>
      {[...new Array()].map((item, index) => (
        <TextInput
        ref={ref => {
            if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref]
            }
        }}
          key={index}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          style={styles.otpInput}
          keyboardType="decimal-pad"
          testID={`OTPInput-${index}`}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={event => handleBackspace(event, index)}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    fontSize: 24,
    // color: template.typography.regular,
    textAlign: "center",
    width: 45,
    height: 55,
    backgroundColor: "white",
  },
});
export default Otp;
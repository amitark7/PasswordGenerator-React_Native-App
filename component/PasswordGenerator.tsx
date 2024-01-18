import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {object, number} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');

  const [numberChar, setNumberChar] = useState(false);
  const [UpperCase, setUpperCase] = useState(false);
  const [LowerCase, setLowerCase] = useState(true);
  const [symbol, setSymbol] = useState(false);

  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  let PasswordSchema = object().shape({
    PasswordLength: number()
      .min(4, 'Should be Minimum 4 characters')
      .max(16, 'Should be Maximum 16 Characters')
      .required('Length is Required'),
  });

  const generatorPassword = (PasswordLength: number) => {
    let characterList = '';

    let Upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let Lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '@#$%^&*_+~';

    if (UpperCase) {
      characterList += Upper;
    }
    if (LowerCase) {
      characterList += Lower;
    }
    if (numberChar) {
      characterList += numbers;
    }
    if (symbol) {
      characterList += symbols;
    }
    setPassword(createPassword(characterList,PasswordLength))
    setIsPasswordGenerated(true)
  };

  const createPassword = (character: string, PasswordLength: number) => {
    let characterIndex = 0;
    let result = '';
    for (let i = 0; i < PasswordLength; i++) {
      characterIndex = Math.round(Math.random() * character.length);
      result += character.charAt(characterIndex);
    }
    return result;
  };

  const resetAllState = () => {
    setPassword('')
    setNumberChar(false);
    setUpperCase(false);
    setLowerCase(true);
    setSymbol(false);
    setIsPasswordGenerated(false);
  };
  return (
    <View>
      <Formik
        initialValues={{PasswordLength: ''}}
        validationSchema={PasswordSchema}
        onSubmit={(values) => {
          generatorPassword(+values.PasswordLength)
        }}>
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length </Text>
                {touched.PasswordLength && errors.PasswordLength && (
                  <Text style={styles.errorText}>{errors.PasswordLength}</Text>
                )}
              </View>
              <TextInput
                style={styles.inputStyle}
                value={values.PasswordLength}
                onChangeText={handleChange('PasswordLength')}
                placeholder="Ex. 8"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}>Include LowerCase</Text>
              <BouncyCheckbox
                disableBuiltInState
                onPress={() => setLowerCase(!LowerCase)}
                fillColor="#29AB87"
                isChecked={LowerCase}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}>Include UpperCase letters</Text>
              <BouncyCheckbox
                disableBuiltInState
                onPress={() => setUpperCase(!UpperCase)}
                fillColor="#FED85D"
                isChecked={UpperCase}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}>Include Numbers</Text>
              <BouncyCheckbox
                disableBuiltInState
                onPress={() => setNumberChar(!numberChar)}
                fillColor="#C9A0DC"
                isChecked={numberChar}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.heading}>Include Symbol</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={symbol}
                onPress={() => setSymbol(!symbol)}
                fillColor="#FC80A5"
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity
                disabled={!isValid}
                style={styles.primaryBtn}
                onPress={() => handleSubmit()}>
                <Text style={styles.primaryBtnText}>Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!isValid}
                style={styles.secondaryBtn}
                onPress={() => {
                  handleReset();
                  resetAllState();
                }}>
                <Text style={styles.secondaryBtnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      {isPasswordGenerated ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long Press to Copy</Text>
          <Text selectable={true} style={styles.generatedPassword}>
            {password}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper:{
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:40,
    marginTop:30
  },
  primaryBtn: {
    backgroundColor: '#25CCF7',
    width: 120,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 8,
  },
  primaryBtnText: {
    color: '#192A56',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: '#B83227',
    width: 120,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 8,
  },
  secondaryBtnText: {
    color: '#EAF0F1',
    textAlign: 'center',
  },
  errorText: {
    color: '#B83227',
    fontSize: 12,
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop:40
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});

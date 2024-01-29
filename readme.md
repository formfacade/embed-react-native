<img width="941" alt="Formfacade customzie logo" src="https://github.com/formfacade/embed-react-native/assets/54505967/0f61a2da-664d-43c4-9481-20b2b6c7d1bf">

# Customize the UI and embed Google Forms in React native using Formfacade.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE.md)

## Description

Embed Google Forms into your React Native app with a professional UI while removing the Google Form branding using Formfacade.

<img width="672" alt="@formfacade:embed-react-native demo" src="https://github.com/formfacade/embed-react-native/assets/54505967/3166a45e-1493-41e2-b5e4-8de99c2512fb">

## Features

- Tailored UI for seamless integration with Light and Dark backgrounds
- Easily implement callback functions upon form submission
- Experience hassle-free fullscreen mode for immersive engagement
- Cross-platform support

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Support](#support) 

## Installation

1. **Download the FormFacade Plugin:**
   Obtain the FormFacade plugin from the [Google Workspace Marketplace](https://workspace.google.com/marketplace/app/formfacade/743872305260).

2. **Access Google Forms:**
   Open your Google Form

3. **Add the FormFacade Add-on:**
   - Click on the 'Add-ons' button in Google Forms.
   - Choose 'Formfacade' from the list of available add-ons.
   - Select 'Embed in a web page'.

4. **Embedding the Form:**
   - Upon clicking 'Embed', a dialog will appear asking, “Where do you want to embed this form?”
   - Choose "Embed in React App" for integration.
   - Retrieve the 'formfacadeURL' from this selection.

5. **Integrate with React App:**
   Use the following npm command to install the required package for embedding the form within your React application:

  ```bash
  npm i @formfacade.dev/embed-react-native
  ```
For more detailed information, please visit [FAQ: How do I embed a Google Form in the Mobile (React Native)](https://docs.google.com/document/d/1f2dgfuz2YJxNYx2QZvbKtJfIF73V2aM9TYyPZQaj4WA/edit)


## Usage

```javascript
import FormfacadeWebview from "@formfacade.dev/embed-react-native";

<FormfacadeEmbed
    formFacadeURL={FORMFACADE_FORM_URL}
    onSubmitForm={onSubmitForm}
    onGoBack={onGoBack}
    fullScreen={true}
    headerBackgroundColor={"#5E33FB"}
    headerTextColor={"#FFFFFF"}
    headerTitle={"Formfacade Integration"}
/>

````

| Prop                  | Type      | Default Value     | Required/Optional   |
| --------------------- | --------- | ----------------- | ------------------- |
| formFacadeURL    | String    | Required          | Required            |
| onSubmitForm   | Function  | `() => Alert.alert('Form Submitted');` | Optional            |
| onGoBack       | Function  | `() => Alert.alert('Go Back')` | Optional            |
| fullScreen      | Boolean   | `true`            | Optional            |
| headerTitle       | String    | ""         | Optional            |
| headerBackgroundColor | String    | `#5E33FB`         | Optional            |
| headerTextColor       | String    | `#ffffff`         | Optional            |
| prefillForm         | Function  | Not specified     | Optional            |
| includeCart           | Boolean   | `false`           | Optional            |



- **formFacadeURL**: URL of the Formfacade embedded Google Form. This is a required field.
- **onSubmitForm**: Callback function triggered on form submission. Default behavior: Shows an alert for form submission.
- **onGoBack**: Callback function for navigating back. Default behavior: Shows an alert to go back.
- **fullScreen**: Set to true to display a header with a back button.
- **headerBackgroundColor**: Background color for the header. Default: #5E33FB.
- **headerTextColor**: Color of the header icons. Default: #ffffff.
- **prefillForm**: Function to prefill form data. It's optional. [Example](#prefill)
- **includeCart**: If your form has an add-to-cart feature, set to true.


## Example
[![Try with Expo](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://snack.expo.dev/@formfacade/embed-google-form-in-react-native-app-using-formfacade-addon)

### Basic

```javascript

import {
    StyleSheet,
    Alert,
    SafeAreaView
} from "react-native";
import FormfacadeEmbed from "@formfacade.dev/embed-react-native";

const FORMFACADE_URL = "https://formfacade.com/include/109671923741510513923/form/1FAIpQLSetAzIt89c0hBCWhI1AzUWRXDQ0VV1JAUph6i_3dvNpT-ZpqA/classic.js?div=ff-compose";

const PRIMARY = "#5E33FB";
const WHITE = "#FFFFFF";

const FormfacadeSupportForm = () => {

    const onSubmitForm = () => {
        // REPLACE WITH YOUR CODE:
        Alert.alert(
            'Form Submitted',
            'Your form has been submitted successfully.',
            [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };

    const onGoBack = () => {
        // REPLACE WITH YOUR CODE:
        Alert.alert(
            'Triggered Back Button',
            'You have pressed back button.',
            [
                {
                    text: 'Ok',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }


    return (
         <>
            <SafeAreaView style={styles.topBarSafeareaView} />
            <SafeAreaView style={styles.container}>
                <FormfacadeEmbed
                    formFacadeURL={FORMFACADE_URL}
                    onSubmitForm={onSubmitForm}
                    onGoBack={onGoBack}
                    fullScreen={true}
                    headerBackgroundColor={PRIMARY}
                    headerTextColor={WHITE}
                    headerTitle="Formfacade Integration"
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    topBarSafeareaView: {
        flex: 0, 
        backgroundColor: PRIMARY
    },
    container: {
        flex: 1
    }
});


export default FormfacadeSupportForm;

```

### Prefill


```javascript

import {
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import FormfacadeEmbed from "@formfacade.dev/embed-react-native";

const FORMFACADE_URL = "https://formfacade.com/include/109671923741510513923/form/1FAIpQLSetAzIt89c0hBCWhI1AzUWRXDQ0VV1JAUph6i_3dvNpT-ZpqA/classic.js?div=ff-compose";

const FormfacadeSupportForm = () => {

  const onSubmitForm = () => {
    // REPLACE WITH YOUR CODE:
    Alert.alert(
      'Form Submitted',
      'Your form has been submitted successfully.',
      [
        {
          text: 'Ok',
          onPress: () => { },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const onGoBack = () => {
    // REPLACE WITH YOUR CODE:
    Alert.alert(
      'Triggered Back Button',
      'You have pressed back button.',
      [
        {
          text: 'Ok',
          onPress: () => { },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const prefillForm = () => {
    // To get the entry ID for the input fields, please visit https://formfacade.com/website/does-formfacade-support-pre-filled-survey-links-like-native-google-forms-on-1FAIpQLSfGvg22V7Lzyw_5AEbKBSpklS_TMw6tKxcQiDqlC9KvfBVTgQ.html
    return {
      'entry.1297600622': '@formfacade.dev/embed-react-native',
      'entry.813617742': `${new Date()}`
    };
  };


  return (
    <>
      <SafeAreaView style={styles.topBarSafeareaView} />
      <SafeAreaView style={styles.container}>
        <FormfacadeEmbed
          formFacadeURL={FORMFACADE_URL}
          onSubmitForm={onSubmitForm}
          onGoBack={onGoBack}
          prefillForm={prefillForm}
          fullScreen={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  topBarSafeareaView: {
    flex: 0,
    backgroundColor: '#5E33FB'
  },
  container: {
    flex: 1
  }
});

export default FormfacadeSupportForm;

```


## Support

For support, email support@formfacade.com

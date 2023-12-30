<img width="941" alt="Formfacade customzie logo" src="https://github.com/formfacade/embed-react-native/assets/54505967/0f61a2da-664d-43c4-9481-20b2b6c7d1bf">

# Customize the UI and embed Google Forms in React native using Formfacade.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

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

Instructions on how to install the package:

```bash
npm i @formfacade.dev/embed-react-native
```

## Usage

```javascript
import FormfacadeWebview from "@formfacade.dev/embed-react-native";

<FormfacadeEmbed
    formFacadeEmbedURL={FORMFACADE_FORM_URL}
    onSubmitFormHandler={onSubmitFormHandler}
    onGoBackHandler={onGoBackHandler}
    isFormFullScreen={true}
    headerBackgroundColor={"#5E33FB"}
    headerTextColor={"#FFFFFF"}
    headerTitle={"Formfacade Integration"}
/>

````

| Prop                  | Type      | Default Value     | Required/Optional   |
| --------------------- | --------- | ----------------- | ------------------- |
| formFacadeEmbedURL    | String    | Required          | Required            |
| onSubmitFormHandler   | Function  | `() => Alert.alert('Form Submitted');` | Optional            |
| onGoBackHandler       | Function  | `() => Alert.alert('Go Back')` | Optional            |
| isFormFullScreen      | Boolean   | `true`            | Optional            |
| headerTitle       | String    | ""         | Optional            |
| headerBackgroundColor | String    | `#5E33FB`         | Optional            |
| headerTextColor       | String    | `#ffffff`         | Optional            |
| prefillFormFn         | Function  | Not specified     | Optional            |
| includeCart           | Boolean   | `false`           | Optional            |



- **formFacadeEmbedURL**: URL of the Formfacade embedded Google Form. This is a required field.
- **onSubmitFormHandler**: Callback function triggered on form submission. Default behavior: Shows an alert for form submission.
- **onGoBackHandler**: Callback function for navigating back. Default behavior: Shows an alert to go back.
- **isFormFullScreen**: Set to true to display a header with a back button.
- **headerBackgroundColor**: Background color for the header. Default: #5E33FB.
- **headerTextColor**: Color of the header icons. Default: #ffffff.
- **prefillFormFn**: Function to prefill form data. It's optional. [Example](#prefill)
- **includeCart**: If your form has an add-to-cart feature, set to true.


## Example

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

    const onSubmitFormHandler = () => {
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

    const onGoBackHandler = () => {
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
                    formFacadeEmbedURL={FORMFACADE_URL}
                    onSubmitFormHandler={onSubmitFormHandler}
                    onGoBackHandler={onGoBackHandler}
                    isFormFullScreen={true}
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

  const onSubmitFormHandler = () => {
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

  const onGoBackHandler = () => {
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

  const prefillFormFn = () => {
    // To get the entry ID for the input fields, please visit https://formfacade.com/website/embed-google-form-in-website.html.
    return `{
      'entry.1297600622': '@formfacade.dev/embed-react-native',
      'entry.813617742': '${new Date()}'
    }`;
  };


  return (
    <>
      <SafeAreaView style={styles.topBarSafeareaView} />
      <SafeAreaView style={styles.container}>
        <FormfacadeEmbed
          formFacadeEmbedURL={FORMFACADE_URL}
          onSubmitFormHandler={onSubmitFormHandler}
          onGoBackHandler={onGoBackHandler}
          isFormFullScreen={false}
          prefillFormFn={prefillFormFn}
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

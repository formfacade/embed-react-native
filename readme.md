![Logo](https://cdn.neartail.com/1FAIpQLScRq0UUyhMrAuRBN39i68JdMoTvq85YCATs394gxuT_K3TU1A/2079056105/image_title/Screenshot%202023-12-28%20at%2012.42.30%20PM.png)

# Customize the UI and embed Google Forms in React native using Formfacade.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## Description

Embed Google Forms into your React Native app with a professional UI while removing the Google Form branding using Formfacade.

![Description](https://cdn.formfacade.com/1FAIpQLSf2YKzD1EdnlSaqvIHkJZedwqJyqhcr3TH56YoJ3t1sDlSTFA/root/banner/%40formfacade%3Aembed-react-native.png)

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
    headerIconColor={"#FFFFFF"}
/>

````

| Prop                  | Type      | Default Value     | Required/Optional   |
| --------------------- | --------- | ----------------- | ------------------- |
| formFacadeEmbedURL    | String    | Required          | Required            |
| onSubmitFormHandler   | Function  | `() => Alert.alert('Form Submitted');` | Optional            |
| onGoBackHandler       | Function  | `() => Alert.alert('Go Back')` | Optional            |
| isFormFullScreen      | Boolean   | `true`            | Optional            |
| headerBackgroundColor | String    | `#5E33FB`         | Optional            |
| headerIconColor       | String    | `#ffffff`         | Optional            |
| prefillFormFn         | Function  | Not specified     | Optional            |
| includeCart           | Boolean   | `false`           | Optional            |



- **formFacadeEmbedURL**: URL of the Formfacade embedded Google Form. This is a required field.
- **onSubmitFormHandler**: Callback function triggered on form submission. Default behavior: Shows an alert for form submission.
- **onGoBackHandler**: Callback function for navigating back. Default behavior: Shows an alert to go back.
- **isFormFullScreen**: Set to true to display a header with a back button.
- **headerBackgroundColor**: Background color for the header. Default: #5E33FB.
- **headerIconColor**: Color of the header icons. Default: #ffffff.
- **prefillFormFn**: Function to prefill form data. It's optional. 
- **includeCart**: If your form has an add-to-cart feature, set to true.


## Example

### Basic Usage

```javascript
import react from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView
} from "react";
import FormfacadeWebview from "@formfacade.dev/embed-react-native";

const FORMFACADE_URL = "https://formfacade.com/public/109671923741510513923/home/form/1FAIpQLSetAzIt89c0hBCWhI1AzUWRXDQ0VV1JAUph6i_3dvNpT-ZpqA/";
const PRIMARY = "#5E33FB";
const WHITE = "#FFFFFF";

const FormfacadeSupportForm = () => {

    const onSubmitDefaultHandler = () => {
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

    const onBackButtonDefaultHandler = () => {
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
                    headerIconColor={WHITE}
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

```

### Prefill


```javascript
import react from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView
} from "react";
import FormfacadeWebview from "@formfacade.dev/embed-react-native";

const FORMFACADE_URL = "https://formfacade.com/public/109671923741510513923/home/form/1FAIpQLSetAzIt89c0hBCWhI1AzUWRXDQ0VV1JAUph6i_3dvNpT-ZpqA/";

const FormfacadeSupportForm = () => {

    const onSubmitDefaultHandler = () => {
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

    const onBackButtonDefaultHandler = () => {
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
    };

    const prefillFormFn = () => {
        // To get the entry ID for the input fields, please visit https://formfacade.com/website/embed-google-form-in-website.html.
        return `
            entry.1297600622: @formfacade.dev/embed-react-native,
            entry.813617742: ${new Date()}
        `;
    };


    return (
         <>
            <SafeAreaView style={styles.topBarSafeareaView} />
            <SafeAreaView style={styles.container}>
                <FormfacadeEmbed
                    formFacadeEmbedURL={FORMFACADE_URL}
                    onSubmitFormHandler={onSubmitFormHandler}
                    onGoBackHandler={onGoBackHandler}
                    
                    prefillFormFn={prefillFormFn}
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

```


## Support

For support, email support@formfacade.com

![Logo](https://cdn.neartail.com/1FAIpQLScRq0UUyhMrAuRBN39i68JdMoTvq85YCATs394gxuT_K3TU1A/2079056105/image_title/Screenshot%202023-12-28%20at%2012.42.30%20PM.png)

# Embed Google Forms with Professional UI in React Native using Formfacade.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## Description

Embed Google Forms into your React Native app with a professional UI while removing the Google Form branding using Formfacade.

![Description](https://cdn.formfacade.com/1FAIpQLSf2YKzD1EdnlSaqvIHkJZedwqJyqhcr3TH56YoJ3t1sDlSTFA/2127469628/prdorgimage/77_Screenshot%202023-12-29%20at%209.13.13%20AM.png)

## Features

- Tailored UI for seamless integration with Light and Dark backgrounds
- Easily implement callback functions upon form submission
- Experience hassle-free fullscreen mode for immersive engagement
- Cross-platform support

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Instructions on how to install the package:

```bash
npm i @formfacade/embed-react-native
```

## Usage

```javascript
import FormfacadeWebview from "@formfacade/embed-react-native";

<FormfacadeWebview
    formFacadeEmbedURL={FORMFACADE_FORM_URL}
    onSubmitFormHandler={onSubmitFormHandler}
    onGoBackHandler={onGoBackHandler}
    isFormFullScreen={true}
    headerBackgroundColor={"#5E33FB"}
    headerIconColor={"#FFFFFF"}
/>

````

## Example

```javascript
import react from "react";
import {
    StyleSheet,
    Alert,
    SafeAreaView
} from "react";
import FormfacadeWebview from "@formfacade/embed-react-native";

// MAKE SURE URL DOES NOT HAVE ANY QUERY PARAMS.
const FORMFACADE_FORM_URL = "https://formfacade.com/public/109671923741510513923/home/form/1FAIpQLScVC2DLMntthPubxqJELBQapcrfyL3KffvwJrwcYMMz2e6EVA";
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
                <FormfacadeWebview
                    formFacadeEmbedURL={FORMFACADE_FORM_URL}
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

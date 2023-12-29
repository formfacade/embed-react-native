
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

// MAKE SURE URL ENDS WITH DOES NOT HAVE ANY QUERY PARAMS.
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

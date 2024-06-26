import React, { useRef } from 'react';
import WebView from 'react-native-webview';
import { Alert, StyleSheet } from 'react-native';

interface FormfacadeEmbedProps {
    formFacadeURL: string;
    fullScreen?: boolean;
    headerTitle?: string;
    headerBackgroundColor?: string;
    headerTextColor?: string;
    includeCart?: boolean;
    customCSS?: string;

    onSubmitForm: (event: any) => void;
    onGoBack?: (arg: any) => void;
    prefillForm?: () => any;
};

const CART_HTML = `
<section id="cart-section" class="relative hidden z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex md:max-w-full w-full md:w-auto md:pl-10">
                <div class="pointer-events-auto w-full md:w-screen md:max-w-md">
                    <div class="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto px-4 py-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-4 flex-row" id="slide-over-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25">
                                        <path fill="black" d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM205-801h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Z"/>
                                    </svg>
                                    Your Cart
                                </h2>
                                <div class="ml-3 flex h-7 items-center">
                                    <button type="button" onclick="closeCartSidebar()" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="absolute -inset-0.5"></span>
                                        <span class="sr-only">Close panel</span>
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-8">
                                <div class="flow-root">
                                    <ul class="ff-cart-items">
                                        <li class="ff-cart-noitem text-center">
                                            <div></div>
                                            <div class="ff-cart-title">- Your cart is empty -</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

`;

const getHeaderIcon = (headerTextColor?: string) => {
    return `
        <button 
            id="cart-menu"
            class="ml-4 inline-flex md:hidden md:ml-8 items-center justify-center whitespace-nowrap rounded-md border border-transparent r md:px-4 py-2 md:text-base font-medium text-white px-3 text-xs cursor-pointer relative"
            type="button"
            onclick="showCart()"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25">
                <path fill="${headerTextColor}" d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM205-801h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Z"/>
            </svg>
            <span 
                class="hidden bg-red-700 text-white font-extrabold text-center rounded-full h-4 w-4 items-center justify-center absolute top-1 right-1 ff-cart-count m-auto ff-cart-icon"
            >
            </span>
        </button>

    `;
}

const getHeaderHTML = (headerTitle: string, includeCart: boolean, headerBackgroundColor?: string, headerTextColor?: string) => {
    if (!headerBackgroundColor) {
        headerBackgroundColor = '#5E33FB';
    }
    if (!headerTextColor) {
        headerTextColor = '#ffffff';
    }
    return `
        <header class="ff-mobile-header">
            <div class="ff-mobile-header-left">
                <button 
                    onclick="goBackHandler()" 
                    type="button"
                    class="ff-mobile-header-inner-container"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="${headerTextColor}" viewBox="0 -960 960 960" width="24">
                        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                </button>
                <div class="ff-mobile-header-title">
                    ${headerTitle}
                </div>
            </div>
            <div class="ff-mobile-header-right">
                ${includeCart ? getHeaderIcon(headerTextColor) : ''}
            </div>
        </header>
    `;
};

const baseUrl = "https://neartail.com";

const onSubmitDefaultHandler = () => {
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

const onGoBackDefaultHandler = (arg: any) => {
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

const FormfacadeEmbed = ({
    formFacadeURL,
    fullScreen = true,
    headerTitle = '',
    includeCart = false,
    headerBackgroundColor = '#5E33FB',
    headerTextColor = '#ffffff',
    customCSS = '',

    onSubmitForm = onSubmitDefaultHandler,
    onGoBack = onGoBackDefaultHandler,
    prefillForm = () => { return {}; },
}: FormfacadeEmbedProps) => {
    const formFacadeWebviewRef = useRef<any>(null);

    if (!formFacadeURL) {
        console.warn('FormfacadeEmbed: formFacadeURL is required.');
    }

    if (formFacadeURL?.includes('/public/')) {
        formFacadeURL = formFacadeURL.replace('/public/', '/include/');

        if (formFacadeURL?.includes('/home/form/')) {
            formFacadeURL = formFacadeURL.replace('/home/form/', '/form/');
        } else if (formFacadeURL?.includes('/all/form/')) {
            formFacadeURL = formFacadeURL.replace('/all/form/', '/form/');
        }

        // Save existing query parameters
        const queryParamsStartIndex = formFacadeURL.indexOf('?');

        let queryParams = '';

        if (queryParamsStartIndex !== -1) {
            queryParams = formFacadeURL.slice(queryParamsStartIndex);

            formFacadeURL = formFacadeURL.slice(0, queryParamsStartIndex);
        }


        const endsWithSlash = formFacadeURL.endsWith('/');

        if (!endsWithSlash) {
            formFacadeURL += '/';
        }


        formFacadeURL += 'tailwind.js';
        if (queryParamsStartIndex < 0) {
            formFacadeURL += '?';
        }

        // Append the original query parameters, if any
        if (queryParams.length > 0) {
            formFacadeURL += queryParams;
        }

        formFacadeURL += '&div=ff-compose';
    }

    const handleGoBack = (arg: any) => {
        if (onGoBack) {
            onGoBack(arg);
        }
    };

    const handleMessage = (event: any) => {
        const { data } = event.nativeEvent;
        if (data?.includes('CLOSE')) {
            handleGoBack({
                type: 'CLOSE'
            });
        }
        else if (data?.includes('ABANDONED')) {
            handleGoBack({
                type: 'ABANDONED',
                draftId: data?.split?.('#')?.[1] || ''
            });
        }
        else if (data?.includes('FORM_SUBMITTED_SUCCESS')) {
            onSubmitForm({
                submitId: data?.split?.('#')?.[1] || '',
                type: 'FORM_SUBMITTED_SUCCESS'
            });
        }
    };

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
            <title>Formfacade - React Native</title>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script>
                function prefillForm() {
                    try {
                        return ${JSON.stringify(prefillForm())};
                    } catch(error) {
                        console.error(error);
                        return {};
                    }
                }
            </script>
            <link rel="stylesheet" href="https://near.tl/css/tailwind.css">
            <style>
                ${customCSS}
                .ff-cart-items li {
                    padding: 0px !important;
                }
                .ff-mobile-header-title {
                    font-weight: 500;
                    font-size: 18px;
                }
                .ff-mobile-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: ${headerBackgroundColor};
                    position: fixed;
                    width: 100%;
                    height: 60px;
                    padding-left: 15px;
                    padding-right: 6px;
                    z-index: 6;
                    color: ${headerTextColor};
                }
                .ff-mobile-header-left {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                #ff-compose {
                  background-color: var(--ff-bgcolor);
                }
                body {
                    position: relative !important;
                }
                .ff-compose-parent {
                    padding: 14px;
                    padding-top: ${fullScreen ? '50px' : '0px'};
                    background-color: var(--ff-bgcolor);
                }
                .ff-mobile-header-inner-container {
                    font-weight: 600;
                    padding-left: 6.5px;
                }
                .ff-cart-icon {
                    font-size: 14px;
                    line-height: .88rem;
                    height: 20px;
                    width: 20px;
                    padding-top: 2.5px;
                    font-weight: 400;
                }
            </style>
        </head>
        <body>
            <script>
                function showCart() {
                    const cartSection = document.getElementById("cart-section");
                    if (cartSection) {
                        cartSection.classList.add("block");
                        cartSection.classList.remove("hidden");
                    }
                }
                function closeCartSidebar() {
                    const cartSection = document.getElementById("cart-section");
                    if (cartSection) {
                        cartSection.classList.add("hidden");
                        cartSection.classList.remove("block");
                    }
                }
                function goBackHandler() {
                    let key = "CLOSE";
                    if(window?.formFacade?.draft?.draftSeq) {
                        key = "ABANDONED#" + window?.formFacade?.draft?.draftSeq;
                    }
                    window.ReactNativeWebView.postMessage(key);
                }
            </script>
            
            ${fullScreen ? getHeaderHTML(headerTitle, includeCart, headerBackgroundColor, headerTextColor) : ''}
            
            ${includeCart ? CART_HTML : ''}

            <div class="ff-compose-parent">
                <div id="ff-compose">
                    <div class="text-center w-full items-center justify-center flex">Loading Please wait</div>
                </div>
            </div>
        </body>
        <script async defer src="${formFacadeURL}&prefill=prefillForm"></script>
        <script>
            window.facadeListener = {
                onChange: function (arg) {
                    if (arg === 'submit') {
                        // Clear the cart.
                        $('.ff-cart-items')?.html('<li class="ff-cart-noitem  text-center"><div></div><div class="ff-cart-title">- Your cart is empty -</div></li>');
                        // Clear the count.
                        $('.ff-cart-count')?.html('');
                        // Set display none.
                        $('.ff-cart-count')?.css('display', 'none');
                        let key = "FORM_SUBMITTED_SUCCESS";
                        if (window.formFacade?.result && window.formFacade?.result?.submitSeq) {
                            key = key + "#" + window.formFacade?.result?.submitSeq;
                        }
                        window.ReactNativeWebView.postMessage(key);
                    } else if (arg === 'cart-product' || arg === 'cart-checkout') {
                        closeCartSidebar();
                    }
                },
            }
        </script>
        </html>
    `;

    return (
        // @ts-ignore
        <WebView
            source={{
                html,
                baseUrl,
            }}
            setBuiltInZoomControls={false}
            setDisplayZoomControls={false}
            javaScriptEnabledAndroid={true}
            javaScriptEnabled={true}
            ref={formFacadeWebviewRef}
            androidHardwareAccelerationDisabled={true}
            setWebContentsDebuggingEnabled={true}
            style={styles.formFacadeWebview}
            bounces={false}
            allowFileAccess={true}
            pullToRefreshEnabled={false}
            webviewDebuggingEnabled={true}
            domStorageEnabled={true}
            directionalLockEnabled={true}
            showsVerticalScrollIndicator={false}
            useWebView2={true}
            startInLoadingState={true}
            webView2Enable={true}
            useSharedProcessPool={true}
            mixedContentMode={'compatibility'}
            allowsBackForwardNavigationGestures={true}
            downloadingMessage='Please wait while we are downloading the file.'
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={true}
            allowsLinkPreview={true}
            androidLayerType='hardware'
            automaticallyAdjustsScrollIndicatorInsets={true}
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
            contentMode='mobile'
            cacheMode='LOAD_NO_CACHE'
            originWhitelist={['*']}
            userAgent={
                'Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/LMY48X) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.117 Mobile Safari/608.2.11'
            }
            onMessage={handleMessage}
        />
    )
}

const styles = StyleSheet.create({
    formFacadeWebview: {
        flex: 1,
    },
});


export default FormfacadeEmbed;
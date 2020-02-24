import Reactotron, {
    trackGlobalErrors,
    openInEditor,
    overlay,
    asyncStorage,
    networking,
} from 'reactotron-react-native';

import {Platform, NativeModules} from 'react-native';
import {reactotronRedux} from 'reactotron-redux';
let reactotron;

if (__DEV__) {
    let scriptHostname;
    const scriptURL = NativeModules.SourceCode.scriptURL;
    scriptHostname =
        Platform.OS === 'android' ? 'localhost' : scriptURL.split('://')[1].split(':')[0];
    // scriptHostname = scriptURL.split('://')[1].split(':')[0];
    reactotron = Reactotron.configure({
        name: 'cricketpro',
        host: scriptHostname,
        port: 9090,
    })
        .use(trackGlobalErrors())
        .use(openInEditor())
        .use(overlay())
        .use(asyncStorage())
        .use(networking())
        .use(reactotronRedux())
        .connect();
} else {
    reactotron = Reactotron.configure({
        name: 'cricketpro',
        port: 9090,
    })
        .use(trackGlobalErrors())
        .use(openInEditor())
        .use(overlay())
        .use(asyncStorage())
        .use(networking())
        .use(reactotronRedux())
        .connect();
}
export default reactotron;

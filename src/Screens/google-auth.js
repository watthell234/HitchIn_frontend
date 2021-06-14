import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleCreate() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '375582128350-5t6kr6tuuaai9cabijrsm521gqoe1dv2.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
      }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

//
// export default class GoogleLogin() {
//
//
// componentDidUpdate(prevResponse) {
//   if (prevResponse != this.props.response & this.props.response?.type === 'success') {
//     const { authentication } = response;}
// }
//
//
// render() {
//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//         }}
//     />
//   );
//
// }
//
//
//
// }

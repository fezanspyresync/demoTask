import auth, {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export const signUpHandler = (email, password, navigation) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'User account created & signed in! 👋',
      });
      setTimeout(() => {
        navigation.navigate('Signin');
      }, 1000);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Toast.show({
          type: 'info',
          text1: 'info',
          text2: 'That email address is already in use!👋',
        });
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const signInHandler = (email, password, navigation) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log('======><========', user);
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: 'Welcome 👋',
      });

      navigation.navigate('Home');
    })
    .catch(error => {
      if (error.code === 'auth/invalid-login') {
        console.log('That email address is already in use!');
        Toast.show({
          type: 'error',
          text1: 'error',
          text2: `${error.code} 👋`,
        });
      }

      //   if (error.code === 'auth/invalid-email') {
      //     console.log('That email address is invalid!');
      //   }

      console.error(error.code);
    });
};

export const updatePasswordHandler = (email, navigation) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      navigation.navigate('Signin');
      Toast.show({
        type: 'success',
        text1: 'success',
        text2: `please check your email 👋`,
      });
    })
    .catch(error => {
      console.log(error);
    });
  //   auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(userCredential => {
  //       const user = userCredential.user;
  //       console.log('======><========', user);
  //       Toast.show({
  //         type: 'success',
  //         text1: 'success',
  //         text2: 'Welcome 👋',
  //       });

  //       navigation.navigate('Home');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/invalid-login') {
  //         console.log('That email address is already in use!');
  //         Toast.show({
  //           type: 'error',
  //           text1: 'error',
  //           text2: `${error.code} 👋`,
  //         });
  //       }

  //       //   if (error.code === 'auth/invalid-email') {
  //       //     console.log('That email address is invalid!');
  //       //   }

  //       console.error(error.code);
  //     });
};

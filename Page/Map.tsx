import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import img_logo from "../assets/edba.png";
const { height, width } = Dimensions.get("window");


const Map= (props: {
  route: {
    params: {
      selectedBus: string;
    };
  };
}) => {
  const { selectedBus } = props.route.params;

  // Initialize locationData state with null
  const [locationData, setLocationData] = useState<null | Record<any, any>>({
    latitude:19.4177,
    longitude:72.8189
  });

  const fetchLiveLocation = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://loc-j3bu.onrender.com/api/user/x`
      );
      let location = response.data[response.data.length - 1];
      console.log("location----",location.data)
      console.log(`${location.data.latitude}---------${location.data.longitude}`)
      const { latitude, longitude } = location.data;


      setLocationData({ latitude, longitude });

      console.log(`${locationData.latitude}------${locationData.longitude}`)
    } catch (error) {
      console.error(error);
    }
  }, [locationData]);

  useEffect(() => {
    // Fetch live location when the component mounts
    fetchLiveLocation();
  }, [fetchLiveLocation]);

  const initialRegion = {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  // }
  // }
  // useEffect(() => {
  //   if(true){
  //     messaging().getToken().then(token => {
  //       console.log(token)
  //     })
  //   }else{
  //     console.log('failed to gen token')
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
 
  //     messaging().onNotificationOpenedApp(async remoteMessage => {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //     });

  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('Message handled in the background!', remoteMessage);
  //     });

  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     });
  
  //     return unsubscribe;
      
  // }, [])
  return (
    <View style={{ flex: 1, backgroundColor: "#E4F1FF" }}>
      <View
        style={{
          height,
          width,
          borderRadius: 10,
          padding: 10,
          marginTop: 18,
          flex: 1,
        }}
      >
        <View style={styles.head_logo}>
          <Image source={img_logo} style={styles.img_logo} resizeMode="contain" />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "black",
            borderWidth: 3,
            borderRadius: 5,
          }}
        >
          <View>
            <View style={styles.container}>
              <MapView
                provider="google"
                followsUserLocation={true}
                initialRegion={initialRegion}
                style={styles.map}
                zoomEnabled={true}
              >

                {/* Marker for user's location */}
                {locationData && (
                  <Marker
                    coordinate={{
                      latitude: locationData.latitude,
                      longitude: locationData.longitude,
                    }}
                    title="xyz"
                    description={selectedBus}
                  >
                    <Image
                      source={require("../assets/bus-svgrepo-com.png")}
                      style={{ height: 20, width: 20, borderRadius: 2 }}
                      resizeMode="cover"
                    />
                  </Marker>
                )}
              </MapView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  head_logo: {
    height: "7%",
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  img_logo: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: 660,
    width: 334,
    borderRadius: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;

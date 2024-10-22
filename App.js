import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Text, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

function Home() {
  const [autoClick, setAutoClick] = useState(false); // Auto-click control state
  const [clickCount, setClickCount] = useState(0); // Total number of clicks
  const animatedValues = useRef(
    Array.from({ length: 10 }, () => new Animated.ValueXY()) // Store draggable positions for each button
  ).current; 
  const intervalRef = useRef(null); // Store interval ID for auto-clicking

  // Start Auto-Click functionality
  const handleStartAutoClick = () => {
    setAutoClick(true);
    intervalRef.current = setInterval(() => {
      // Trigger 10 clicks at once
      for (let i = 0; i < 10; i++) {
        simulateClick(); // Call the simulateClick function
      }
    }, 1000); // Auto-click every second
  };

  // Stop Auto-Click functionality
  const handleStopAutoClick = () => {
    setAutoClick(false);
    clearInterval(intervalRef.current); // Stop the interval
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Simulate a click event
  const simulateClick = () => {
    setClickCount((prevCount) => prevCount + 1); // Increment click count
  };

  // Function to handle dragging each button
  const handleDrag = (index) =>
    Animated.event(
      [{ nativeEvent: { translationX: animatedValues[index].x, translationY: animatedValues[index].y } }],
      { useNativeDriver: false }
    );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Start/Stop Buttons at the Top */}
      <View style={styles.controlButtons}>
        <Button title="Start" onPress={handleStartAutoClick} disabled={autoClick} />
        <Button title="Stop" onPress={handleStopAutoClick} disabled={!autoClick} />
      </View>

      {/* Click Count Display */}
      <Text style={styles.clickCount}>Total Clicks: {clickCount}</Text>

      {/* Draggable Circular Buttons */}
      <TouchableWithoutFeedback onPress={simulateClick}>
        <View style={styles.draggableArea}>
          {animatedValues.map((animatedValue, index) => (
            <PanGestureHandler key={index} onGestureEvent={handleDrag(index)}>
              <Animated.View style={[styles.circle, { transform: animatedValue.getTranslateTransform() }]}>
                <Text style={styles.buttonText}>{`Button ${index + 1}`}</Text>
              </Animated.View>
            </PanGestureHandler>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  clickCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  draggableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff', // Text color
  },
});

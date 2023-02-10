import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2d3436',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    marginBottom: 40,
    color: '#fff',
    fontSize: 20,
  },
  input: {
    color: '#fff',
    borderWidth: 1,
    fontSize: 20,
    textAlign: 'center',
    borderColor: '#b2bec3',
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  }
});

export default styles;
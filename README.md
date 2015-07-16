# ibeacons

## advertise.js

### Setup

```sh
npm install bleacon
```

### Running

#### OS X

```sh
node advertise.js
```

#### Linux

```sh
sudo node advertise.js
```

## Region Timer app

```sh
cd regiontimer
```

### Setup

```sh
cd regiontimer
phonegap platform add ios android
phonegap plugin add com.unarin.cordova.beacon
```

### Running

```sh
phonegap run --device
```

### Other notes

To create from scratch

```sh
phonegap create regiontimer "com.makebluetooth.regiontimer" "Region Timer"
```


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
phonegap plugin add phonegap plugin add https://github.com/petermetz/cordova-plugin-ibeacon.git#3.3.0
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

Edit ```config.xml```, change the value of ```android-minSdkVersion``` from ```7``` to ```10```:

```xml
    <preference name="android-minSdkVersion" value="7" />
```

to

```xml
    <preference name="android-minSdkVersion" value="10" />
```

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        this.insideRegion = false;
        this.lastUpdateDate = null;
        this.totalTimeInRegion = 0;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    onDeviceReady: function() {
        // add click handle for reset button
        document.getElementById('reset').addEventListener('click', app.onResetClick, false);

        // setup timer to update the total time in region
        setInterval(app.updateTotalTimeInRegion, 1000);

        // setup the location manager
        app.setupLocationManager();

        // inital update to total time in region
        app.updateTotalTimeInRegion();
    },
    setupLocationManager: function() {
        var uuid = 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0';
        var identifier = 'region';
        var major = 1;
        var minor = 2;

        // create a beacon region to monitor
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        // create a delegate for the location manager
        var delegate = new cordova.plugins.locationManager.Delegate();
        delegate.didDetermineStateForRegion = app.didDetermineStateForRegion;

        // set the delegate on the location manager
        cordova.plugins.locationManager.setDelegate(delegate);

        // request authorization (needed for iOS 8 and above)
        cordova.plugins.locationManager.requestAlwaysAuthorization();

        // start monitoring beacon region
        cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(alert)
            .done();
    },
    didDetermineStateForRegion: function(pluginResult) {
        var regionState = pluginResult.state;

        if (regionState === 'CLRegionStateInside') {
            // we are inside the region
            app.insideRegion = true;
        } else {
            // we are outside the region
            app.insideRegion = false;
        }

        // update the total time in region
        app.updateTotalTimeInRegion();
    },
    onResetClick: function() {
        // clear the total time
        app.totalTimeInRegion = 0;

        // update the total time in region
        app.updateTotalTimeInRegion();
    },
    updateTotalTimeInRegion: function() {
        // get the date for now
        var now = new Date();

        if (app.insideRegion) {
            // we are inside the region, calculate the seconds since the last update
            var secondsSinceLastUpdate = (now.getTime() - app.lastUpdateDate.getTime()) / 1000.0;

            // update the total time
            app.totalTimeInRegion += secondsSinceLastUpdate;
        }

        // update the last update date to now
        app.lastUpdateDate = now;

        // display the total time
        app.displayTotalTimeInRegion();
    },
    displayTotalTimeInRegion: function() {
        // breakdown the total time to hours, minutes, seconds
        var hours = Math.floor(app.totalTimeInRegion / 3600);
        var minutes = Math.floor((app.totalTimeInRegion % 3600) / 60);
        var seconds = Math.floor(app.totalTimeInRegion % 60);

        // convert to a string to display
        var totalTimeInRegionText = 'Hours: ' + hours + ' ' +
                                    'Minutes: ' + minutes + ' ' +
                                    'Seconds: ' + seconds;

        document.getElementById('totalTimeInRegion').textContent = totalTimeInRegionText;
    }
};

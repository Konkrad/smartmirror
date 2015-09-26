package com.paulsonnentag.balanceboard;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.provider.Settings;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import java.lang.Override;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BalanceBoardPlugin extends CordovaPlugin {

    private boolean discovering = false;
    private Lock eventLock = new ReentrantLock();
    private JSONArray events = new JSONArray();
    private BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    private BalanceBoard balanceBoard;

    @Override
    public void initialize (CordovaInterface cordova, CordovaWebView webView) {
        cordova.getActivity().registerReceiver(bcReceiver, new IntentFilter(BluetoothAdapter.ACTION_DISCOVERY_FINISHED));
        cordova.getActivity().registerReceiver(bcReceiver, new IntentFilter(BluetoothDevice.ACTION_FOUND));
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("connect")) {
            connect();

        } else if (action.equals("disconnect")) {
            disconnect();

        } else if (action.equals("getEvents")) {
                dispatchEvents(callbackContext);

        } else {
            return false;
        }

        return true;
    }

    private void disconnect () {
        if(bluetoothAdapter.isDiscovering()) {
            bluetoothAdapter.cancelDiscovery();
            discovering = false;
        }

        if (balanceBoard != null) {
            balanceBoard.disconnect();
            balanceBoard = null;
        }
    }

    private void connect () {
        if(!bluetoothAdapter.isEnabled()) {
            bluetoothAdapter.enable();
        }

        if(!bluetoothAdapter.isDiscovering()) {
            bluetoothAdapter.startDiscovery();
        }

        discovering = true;
    }

    private void recordEvent (String type, JSONObject data) {
        eventLock.lock();

        try {
            JSONObject event = new JSONObject();
            event.put("type", type);
            event.put("data", data);
            events.put(event);

        } catch (JSONException e) {}

        eventLock.unlock();
    }

    private void recordEvent (String type) {
        recordEvent(type, new JSONObject());
    }

    private void dispatchEvents (CallbackContext callbackContext) {
        eventLock.lock();

        callbackContext.success(events);
        events = new JSONArray();

        eventLock.unlock();
    }

    private final BroadcastReceiver bcReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent)
        {
            String action = intent.getAction();

            if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

                if (balanceBoard == null) {
                    recordEvent("discovered");
                    balanceBoard = new BalanceBoard(bluetoothAdapter, device, wmListener);
                    bluetoothAdapter.cancelDiscovery();
                    discovering = false;
                }

            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
                if (discovering == true) {
                    connect();
                }
            }
        }
    };

    private final BalanceBoard.Listener wmListener = new BalanceBoard.Listener() {
        @Override
        public void onWiimoteConnecting(BalanceBoard wm)
        {
            recordEvent("connecting");
        }

        @Override
        public void onWiimoteConnected(BalanceBoard wm)
        {
            recordEvent("connected");
        }

        @Override
        public void onWiimoteDisconnected(BalanceBoard wm)
        {
            recordEvent("disconnected");
            balanceBoard = null;
        }

        @Override
        public void onWiimoteLEDChange(BalanceBoard wm) { }

        @Override
        public void onWiimoteData(BalanceBoard wm, BalanceBoard.Data data)
        {
            try {
                JSONObject eventData = new JSONObject();
                eventData.put("topLeft", data.getTopLeft());
                eventData.put("topRight", data.getTopRight());
                eventData.put("bottomRight", data.getBottomRight());
                eventData.put("bottomLeft", data.getBottomLeft());

                recordEvent("data", eventData);

            } catch (JSONException e) {};
        }
    };
}

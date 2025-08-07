package com.twiliovoicereactnative

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.twilio.voice.Call
import com.twilio.voice.CallInvite
import com.twilio.voice.ConnectOptions
import com.twilio.voice.Voice
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.util.*

class ExpoModule : Module() {

    override fun definition() = ModuleDefinition {
        Name("ExpoTwilioVoice")

        AsyncFunction("initializeVoice") {
            // Initialize the voice module
            // This will be handled by the lifecycle listeners
            return@AsyncFunction Unit
        }

        AsyncFunction("voice_connect") { accessToken: String ->
            val context = appContext.reactContext
            if (context == null) {
                return@AsyncFunction Unit
            }

            try {
                val connectOptions = ConnectOptions.Builder(accessToken).build()
                Voice.connect(context, connectOptions, object : Call.Listener {
                    override fun onConnectFailure(call: Call, error: com.twilio.voice.CallException) {}
                    override fun onConnected(call: Call) {}
                    override fun onReconnecting(call: Call, error: com.twilio.voice.CallException) {}
                    override fun onReconnected(call: Call) {}
                    override fun onDisconnected(call: Call, error: com.twilio.voice.CallException?) {}
                    override fun onRinging(call: Call) {}
                })
            } catch (e: Exception) {
                // Handle error
            }
        }

        AsyncFunction("voice_register") { accessToken: String ->
            val context = appContext.reactContext
            if (context == null) {
                return@AsyncFunction false
            }

            try {
                Voice.register(accessToken, Voice.RegistrationChannel.FCM, "", object : com.twilio.voice.RegistrationListener {
                    override fun onRegistered(accessToken: String, fcmToken: String) {}
                    override fun onError(registrationException: com.twilio.voice.RegistrationException, accessToken: String, fcmToken: String) {}
                })
                true
            } catch (e: Exception) {
                false
            }
        }

        AsyncFunction("voice_unregister") { accessToken: String ->
            val context = appContext.reactContext
            if (context == null) {
                return@AsyncFunction false
            }

            try {
                Voice.unregister(accessToken, Voice.RegistrationChannel.FCM, "", object : com.twilio.voice.UnregistrationListener {
                    override fun onUnregistered(accessToken: String, fcmToken: String) {}
                    override fun onError(registrationException: com.twilio.voice.RegistrationException, accessToken: String, fcmToken: String) {}
                })
                true
            } catch (e: Exception) {
                false
            }
        }

        AsyncFunction("voice_accept_call_invite") { callInvite: CallInvite ->
            val context = appContext.reactContext
            if (context == null) {
                return@AsyncFunction null
            }

            try {
                callInvite.accept(context, object : Call.Listener {
                    override fun onConnectFailure(call: Call, error: com.twilio.voice.CallException) {}
                    override fun onConnected(call: Call) {}
                    override fun onReconnecting(call: Call, error: com.twilio.voice.CallException) {}
                    override fun onReconnected(call: Call) {}
                    override fun onDisconnected(call: Call, error: com.twilio.voice.CallException?) {}
                    override fun onRinging(call: Call) {}
                })
            } catch (e: Exception) {
                null
            }
        }

        AsyncFunction("voice_reject_call_invite") { callInvite: CallInvite ->
            val context = appContext.reactContext
            if (context == null) {
                return@AsyncFunction false
            }

            try {
                callInvite.reject(context)
                true
            } catch (e: Exception) {
                false
            }
        }

        AsyncFunction("voice_disconnect_call") { call: Call ->
            try {
                call.disconnect()
                true
            } catch (e: Exception) {
                false
            }
        }
    }
}

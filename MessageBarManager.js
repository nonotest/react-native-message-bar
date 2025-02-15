/**
 * Name: Message Bar Manager
 * Description: A manager to show/hide and handle a queue of alerts
 * https://github.com/Talor-A/react-native-message-bar
 */
'use strict'

module.exports = {
  _currentMessageBarAlert: null,
  _messageAlerts: [],

  setCurrentMessageBarAlert (alert) {
    console.warn(
      'This method is deprecated, please use registerMessageBar instead.'
    )
    this.registerMessageBar(alert)
  },

  removeCurrentMessageBarAlert () {
    console.warn(
      'This method is deprecated, please use registerMessageBar instead.'
    )
    this.unregisterMessageBar()
  },

  registerMessageBar (messageBar) {
    this._currentMessageBarAlert = messageBar
  },

  unregisterMessageBar () {
    this._currentMessageBarAlert = null
  },

  showCurrentAlert (newState = null) {
    console.warn('This method is deprecated, please use showAlert instead.')
    this.showAlert(newState)
  },

  showAlert (newState = null) {
    if (this._currentMessageBarAlert === null) {
      return
    }

    // Hide the current alert
    this.hideAlert()

    // Get the current alert's duration to hide
    var durationToHide = this._currentMessageBarAlert.alertShown ? this._currentMessageBarAlert.state.durationToHide : 0

    setTimeout(() => {
      // race condition here;
      // no time to do something better; we need to change this library;
      if (this._currentMessageBarAlert === null) {
        return;
      }
      // Show the new alert if there is a new state, otherwise
      if (newState != null) {
        // Clear current state
        this._currentMessageBarAlert.setNewState({})

        this._currentMessageBarAlert.setNewState(newState)

        this._currentMessageBarAlert.notifyAlertHiddenCallback = null

        setTimeout(() => {
          if (this._currentMessageBarAlert === null) {
            return;
          }
          this._currentMessageBarAlert.showMessageBarAlert()
        }, 100)
      }
    }, durationToHide)
  },

  hideAlert () {
    if (this._currentMessageBarAlert !== null) {
      this._currentMessageBarAlert.hideMessageBarAlert()
    }
  }
}

// Adaptive authentication script: step-up MFA when signing controlled prescriptions.
// Triggered on the receta API (scope receta:write + es_controlada=true).

var onLoginRequest = function(context) {
  executeStep(1, {
    onSuccess: function (context) {
      var user = context.currentKnownSubject;
      var role = user.roles;
      if (role.indexOf('profesional') >= 0) {
        // Apply step-up MFA (TOTP or FIDO2) for professionals.
        executeStep(2, {
          authOptions: ['totp', 'fido2'],
          onFail: function (context) {
            Log.error('Step-up MFA failed for professional: ' + user.username);
            sendError('mfa-required', 'Multi-factor authentication required for prescription signing');
          }
        });
      }
    }
  });
};

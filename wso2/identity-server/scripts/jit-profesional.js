// JIT provisioning script for federated professionals.
// When a federated user logs in via SAML/OIDC, validates the cédula
// claim before creating the local identity. If cédula is missing or
// invalid, denies the login and logs the attempt.

var onLoginRequest = function(context) {
  executeStep(1, {
    onSuccess: function (context) {
      var federatedUser = context.steps[1].subject;
      var cedula = federatedUser.claims['http://telemedicina.mx/claims/cedula'];
      if (!cedula || cedula.length < 7) {
        Log.error('Federated login without valid cédula: ' + federatedUser.username);
        sendError('cedula-required', 'Profesionales federados deben presentar cédula profesional');
        return;
      }
      // Mark as pending verification; the profesional service will validate against DGP.
      var claims = federatedUser.claims;
      claims['http://telemedicina.mx/claims/estado_verificacion'] = 'pendiente';
      context.subject = federatedUser;
    }
  });
};

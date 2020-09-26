export default {

    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    promptConsent: process.env.AUTH_PROMPT_CONSENT,

    shouldPromptForConsent() {
        return this.get('auth.promptConsent') === 'true';
    }
}

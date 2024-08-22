import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'https://your-keycloak-server/auth',
    realm: 'your-realm',
    clientId: 'quiz-app',
});

export default keycloak;

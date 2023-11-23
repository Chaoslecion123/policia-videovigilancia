import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
    UserPoolId: 'us-east-1_rcD7tYF6t',
    ClientId:'4a1bgokftm7qt8ahn1kc6q2pmj'
}

export default new CognitoUserPool(poolData);


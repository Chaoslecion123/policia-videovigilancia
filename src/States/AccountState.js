import React from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import AccountContext from '../Context/AccountContext';
import userPool from './userPool';


const AccountState = (props) => {

    const logout = async () => {

        return await new Promise((resolve, reject) => {
            const user = userPool.getCurrentUser()
            if (user) {
                user.signOut();
                resolve(user)
            }else {
                reject();
            }
        })


    }



    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = userPool.getCurrentUser();

            if (user) {
                user.getSession(async (err, session) => {
                    if (err) {
                        reject(err)
                    } else {
                        // resolve(session)
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if (err) {
                                    console.log('err', err)
                                    reject(err)
                                } else {
                                    const results = {};
                                    for (let attribute of attributes) {
                                        console.log('attribute', attribute)
                                        const { Name, Value } = attribute
                                        results[Name] = Value
                                    }
                                    resolve(results)
                                    console.log('results', results)
                                    localStorage.setItem('name', results.name)
                                    localStorage.setItem('rango', results["custom:rango"])
                                }
                            })
                        })

                        resolve({ user, ...session, ...attributes })
                    }
                })
            } else {
                reject()
            }
        })
    }


    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool: userPool
            })

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            })

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log('Login Success', data);
                    resolve(data)
                },
                onFailure: (err) => {
                    console.log('Failure', err.message);
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log('New password required', data);
                    resolve(data)
                }
            })


        })
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;
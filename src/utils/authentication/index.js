import { users } from "../variables.js";


export async function validateUser (operator, data) {

    let user;

    try {
        switch (operator) {
            case "discord": {
                if (data.id) {
                    user = users.find(obj => obj.discordId === data.id)
                    return user;
                }
                break;
            }
            case "password": {
                break;
            }
            default: {
                break;
            }
        }
    } catch (err) {
        console.log(err)
    }
}

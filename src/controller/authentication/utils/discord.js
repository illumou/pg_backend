import url from "url";
import axios from "axios";

export async function getUserData(data) {
    const formData = new url.URLSearchParams({
        client_id: `${process.env.discord_client_id}`,
        client_secret: `${process.env.discord_client_secret}`,
        grant_type: 'authorization_code',
        code: data.toString(),
        redirect_uri: 'http://localhost:3001/api/authentication/loginDiscord'
    });

    let response;

    try {
        response = await axios.post(
            'https://discord.com/api/v8/oauth2/token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        )
    } catch (err) {
        console.error(err.response.data.error)
        console.error(err.response.data.error_description)
    }

    const { access_token } = response.data;
    const { data: userResponse } = await axios.get(
        'https://discord.com/api/v8/users/@me',
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    return userResponse;
}

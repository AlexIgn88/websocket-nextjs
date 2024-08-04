require('dotenv').config();

export async function GET(req) {

    const
        parameter = process.env.DB_PARAMETER,
        password = process.env.DB_PASSWORD;

    // console.log('request.url=', req.url);

    const { searchParams } = new URL(req.url);
    const key = searchParams.get(parameter);

    if (!key) {
        return new Response('Key is required', { status: 400 });
    }

    if (key !== password) {
        return new Response('Key is invalid', { status: 403 });
    }

    const encodeKey = encodeURIComponent(parameter) + '=' + encodeURIComponent(key);

    return new Response(null, {
        status: 302,
        headers: {
            Location: '/',
            'Set-Cookie': `${encodeKey}; Path=/;`,
        },
    });
}

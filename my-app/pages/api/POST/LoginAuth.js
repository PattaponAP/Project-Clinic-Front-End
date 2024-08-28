
export const LoginAuth = async (username, password) => {
    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!res.ok) {
        console.log(API_URL)
        throw new Error(`Login failed with status ${res.status}`);
    }

    return res.json();
};
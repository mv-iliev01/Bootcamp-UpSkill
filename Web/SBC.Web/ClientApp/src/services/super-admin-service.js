export const DashboardIndex = async () => {

    // todo get token
    let token = '';

    let response = await fetch("https://localhost:5001/Administration/Dashboard",
        { headers: { Authorization: `Bearer ${token}` }, })
    const data = await response.json();

    return data;
}


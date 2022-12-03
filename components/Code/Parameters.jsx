import { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

export default function Parameters() {

    const [client_id, setClientId] = useState(process.env.NEXT_PUBLIC_CLIENT_ID)
    const [redirect_url, setRedirect_url] = useState(process.env.NEXT_PUBLIC_REDIRECT_URL);
    const [response_type, setResponse_type] = useState(process.env.NEXT_PUBLIC_RESPONSE_TYPE);
    const [base_URL_API, setBase_URL_API] = useState(process.env.NEXT_PUBLIC_BASE_API);
    const [state_API, setState_API] = useState(process.env.NEXT_PUBLIC_STATE);


    const [api_url, setApiURL] = useState("");

    const setValues = (value, type) => {

        if (type == "client_id") {
            setClientId(value)
        }
        if (type == "redirect_url") {
            setRedirect_url(value)
        }
        if (type == "response_type") {
            setResponse_type(value)
        }
        if (type == "base_URL_API") {
            setBase_URL_API(value)
        }
        if (type == "state_API") {
            setState_API(value)
        }

    }

    useEffect(() => {
        setApiURL(`${base_URL_API}?response_type=${response_type}&redirect_uri=${redirect_url}&client_id=${client_id}&state=${state_API}`);
    }, [
        client_id,
        base_URL_API,
        response_type,
        redirect_url,
        state_API
    ])

    const submit = function (e) {
        e.preventDefault();
        window.location = api_url;
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submit} >

                <div className={styles.field}>

                    <label>CLIENT ID
                        <input placeholder="client_id" type="text" onChange={(e) => setValues(e.target.value, "client_id")} value={client_id} ></input>
                    </label>

                    <label>REDIRECT URL
                        <input placeholder="redirect_url" type="text" onChange={(e) => setValues(e.target.value, "redirect_url")} value={redirect_url}></input>
                    </label>
                    <label>RESPONSE TYPE
                        <input placeholder="response_type" type="text" onChange={(e) => setValues(e.target.value, "response_type")} value={response_type}></input>
                    </label>
                    <label>URL API
                        <input placeholder="URL API" type="text" onChange={(e) => setValues(e.target.value, "base_URL_API")} value={base_URL_API}></input>
                    </label>
                    <label>STATE
                        <input placeholder="STATE" type="text" onChange={(e) => setValues(e.target.value, "state_API")} value={state_API}></input>
                        <small>Recommended. An opaque value used by the client to maintain state between the request and callback.</small>
                    </label>

                    <button type="submit">GET CODE</button>
                </div>

            </form>
            {api_url}
        </div>
    )
}
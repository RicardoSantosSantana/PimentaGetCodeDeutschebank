import { useState, useEffect } from 'react';

export default function Parameters() {

    const [client_id, setClientId] = useState(process.env.NEXT_PUBLIC_CLIENT_ID)
    const [redirect_url, setRedirect_url] = useState(process.env.NEXT_PUBLIC_REDIRECT_URL);
    const [response_type, setResponse_type] = useState(process.env.NEXT_PUBLIC_RESPONSE_TYPE);
    const [base_URL_API, setBase_URL_API] = useState(process.env.NEXT_PUBLIC_BASE_API);
    const [state_API, setState_API] = useState(process.env.NEXT_PUBLIC_STATE);

    const [api_url, setApiURL] = useState("");

    const setValues = (value, type) => {
        if (type === "client_id") setClientId(value);
        if (type === "redirect_url") setRedirect_url(value);
        if (type === "response_type") setResponse_type(value);
        if (type === "base_URL_API") setBase_URL_API(value);
        if (type === "state_API") setState_API(value);
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
        <div className="container">

            <form onSubmit={submit}>
                <div class="row m-5">
                    <div className="col-md-3">
                        <label>CLIENT ID</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            className="form-control"
                            placeholder="client_id"
                            type="text"
                            onChange={(e) => setValues(e.target.value, "client_id")}
                            value={client_id}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>REDIRECT URL</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            className="form-control"
                            placeholder="redirect_url"
                            type="text"
                            onChange={(e) => setValues(e.target.value, "redirect_url")}
                            value={redirect_url}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>RESPONSE TYPE</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            className="form-control"
                            placeholder="response_type"
                            type="text"
                            onChange={(e) => setValues(e.target.value, "response_type")}
                            value={response_type}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>URL API</label>
                    </div>
                    <div className="col-md-9">
                        <input
                            className="form-control"
                            placeholder="URL API"
                            type="text"
                            onChange={(e) => setValues(e.target.value, "base_URL_API")}
                            value={base_URL_API}
                        />
                    </div>

                    <div className="col-md-3">
                        <label>STATE</label>
                    </div>
                    <div className="col-md-9">
                        <small className="form-text text-muted">
                            STATE: Recommended. An opaque value used by the client to maintain state between the request and callback.
                        </small>
                        <input
                            className="form-control"
                            placeholder="STATE"
                            type="text"
                            onChange={(e) => setValues(e.target.value, "state_API")}
                            value={state_API}
                        />

                    </div>

                    <div className="col-md-12"><br/>
                        <button type="submit" className="btn btn-primary">GET CODE</button>                        
                    </div>
                    

                </div>

            </form>

            <p className="mt-3">
                <strong>Generated API URL:</strong> {api_url}
            </p>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPageData } from "../apiService";
import Components from "./components/components";
import { PageData } from "../types";

const App = () => {
    const { id } = useParams<{ id: string }>();
    const [pageData, setPageData] = useState<PageData>({ lists: [], components: [] });
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchAndSetPageData = async (pageId: string) => {
            let resp = await fetchPageData(pageId);

            if (resp.error) {
                setError(resp.error);
            } else {
                setPageData(resp.data);
            }
        };

        fetchAndSetPageData(id);
    }, [id]);

    if (error) return <h4>{error}</h4>;

    return <>{pageData.lists.length > 0 && <Components pageData={pageData} />}</>;
};

export default App;
